// Utility functions and shader code for the fluid simulation

export const paletteStops = [
  "#87CEEB",    // Light sky blue (primary)
  "#32A4E2",    // Medium sky blue
  "#1E90ED",    // Vibrant sky blue
  "#4FC3F7",    // Bright sky blue
  "#81D4FA",    // Pale sky blue
  "#B8443B",    // Copper red (primary contrast)
  "#C44536",    // Bright copper red
  "#A0392F",    // Deep copper red
  "#D2482A",    // Vivid copper red
  "#8B3626",    // Dark copper red
  "#5DADE2",    // Sky blue variant
  "#E74C3C",    // Enhanced red
  "#3498DB",    // Pure blue
  "#CD5C3F",    // Warm copper
];

export function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 8) hex = hex.slice(0, 6); // ignore alpha
  const bigint = parseInt(hex, 16);
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ];
}

export const paletteRGB = paletteStops.map(hexToRgb);

// Fluid simulation constants
export const FLUID_CONSTANTS = {
  TEXTURE_DOWNSAMPLE: 1,
  DENSITY_DISSIPATION: 0.98,
  VELOCITY_DISSIPATION: 0.99999,
  SPLAT_RADIUS: 0.0008,
  CURL: 5,
  PRESSURE_ITERATIONS: 200,
};

// WebGL shader sources
export const shaders = {
  baseVertex: `
    precision highp float;
    precision mediump sampler2D;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `,
  // FIXED: Modified display shader to maintain white background
  display: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        vec4 fluid = texture2D(uTexture, vUv);
        
        // Calculate fluid intensity for proper blending
        float fluidIntensity = length(fluid.rgb);
        
        // Always maintain white background by blending fluid over white
        // Use fluid intensity as alpha for proper color mixing
        vec3 backgroundColor = vec3(1.0, 1.0, 1.0); // Pure white
        vec3 blendedColor = mix(backgroundColor, fluid.rgb, min(fluidIntensity * 0.8, 0.9));
        
        // Always output full alpha to maintain opaque background
        gl_FragColor = vec4(blendedColor, 1.0);
    }
  `,
  // FIXED: Modified splat shader to handle alpha consistently
  splat: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        
        // Ensure consistent alpha handling for density textures
        float alpha = 1.0;
        gl_FragColor = vec4(base + splat, alpha);
    }
  `,
  // FIXED: Modified advection shader for consistent alpha
  advection: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = dissipation * texture2D(uSource, coord);
        // Maintain consistent alpha
        gl_FragColor = vec4(result.rgb, 1.0);
    }
  `,
  // FIXED: Modified advection manual filtering for consistent alpha
  advectionManualFiltering: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;
    vec4 bilerp (in sampler2D sam, in vec2 p) {
        vec4 st;
        st.xy = floor(p - 0.5) + 0.5;
        st.zw = st.xy + 1.0;
        vec4 uv = st * texelSize.xyxy;
        vec4 a = texture2D(sam, uv.xy);
        vec4 b = texture2D(sam, uv.zy);
        vec4 c = texture2D(sam, uv.xw);
        vec4 d = texture2D(sam, uv.zw);
        vec2 f = p - st.xy;
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    void main () {
        vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;
        vec4 result = dissipation * bilerp(uSource, coord);
        // Always maintain alpha = 1.0 for consistent background
        gl_FragColor = vec4(result.rgb, 1.0);
    }
  `,
  divergence: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    vec2 sampleVelocity (in vec2 uv) {
        vec2 multiplier = vec2(1.0, 1.0);
        if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }
        if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }
        if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }
        if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }
        return multiplier * texture2D(uVelocity, uv).xy;
    }
    void main () {
        float L = sampleVelocity(vL).x;
        float R = sampleVelocity(vR).x;
        float T = sampleVelocity(vT).y;
        float B = sampleVelocity(vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `,
  curl: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
    }
  `,
  vorticity: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));
        force *= 1.0 / length(force + 0.00001) * curl * C;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
  `,
  pressure: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    vec2 boundary (in vec2 uv) {
        uv = min(max(uv, 0.0), 1.0);
        return uv;
    }
    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `,
  gradientSubtract: `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    vec2 boundary (in vec2 uv) {
        uv = min(max(uv, 0.0), 1.0);
        return uv;
    }
    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `,
};

// WebGL utility classes and functions
export class GLProgram {
  constructor(gl, vertexShader, fragmentShader) {
    this.uniforms = {};
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
      throw gl.getProgramInfoLog(this.program);

    const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const uniformName = gl.getActiveUniform(this.program, i).name;
      this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
    }
    this.gl = gl;
  }

  bind() {
    this.gl.useProgram(this.program);
  }
}

export function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw gl.getShaderInfoLog(shader);
  return shader;
}

export function createFBO(gl, texId, w, h, internalFormat, format, type, param) {
  gl.activeTexture(gl.TEXTURE0 + texId);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return [texture, fbo, texId];
}

export function createDoubleFBO(gl, texId, w, h, internalFormat, format, type, param) {
  let fbo1 = createFBO(gl, texId, w, h, internalFormat, format, type, param);
  let fbo2 = createFBO(gl, texId + 1, w, h, internalFormat, format, type, param);

  return {
    get first() {
      return fbo1;
    },
    get second() {
      return fbo2;
    },
    swap() {
      const temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    },
  };
}