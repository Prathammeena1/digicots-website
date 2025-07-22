import React, { useRef, useEffect, useCallback } from "react";
import {
  paletteRGB,
  FLUID_CONSTANTS,
  shaders,
  GLProgram,
  compileShader,
  createFBO,
  createDoubleFBO,
} from "../utils/fluidSimUtils.js";

const FluidCanvas = React.memo(() => {
  const canvasRef = useRef(null);
  const isInitialized = useRef(false);

  const initializeWebGL = useCallback((canvas) => {
    if (!canvas) {
      console.error("Canvas element is null");
      return null;
    }

    const params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
    };

    let gl = canvas.getContext("webgl2", params);
    const isWebGL2 = !!gl;

    if (!isWebGL2) {
      gl = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);
    }

    if (!gl) {
      console.error("WebGL not supported");
      return null;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloat = gl.getExtension("OES_texture_half_float");
    let support_linear_float = gl.getExtension("OES_texture_half_float_linear");

    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      support_linear_float = gl.getExtension("OES_texture_float_linear");
    }

    return { gl, isWebGL2, halfFloat, support_linear_float };
  }, []);

  const setupShaders = useCallback((gl, isWebGL2, support_linear_float) => {
    const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, shaders.baseVertex);
    
    const programs = {
      display: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, shaders.display)),
      splat: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, shaders.splat)),
      advection: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, 
        support_linear_float ? shaders.advection : shaders.advectionManualFiltering)),
      divergence: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, shaders.divergence)),
      curl: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, shaders.curl)),
      vorticity: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, shaders.vorticity)),
      pressure: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, shaders.pressure)),
      gradientSubtract: new GLProgram(gl, baseVertexShader, compileShader(gl, gl.FRAGMENT_SHADER, shaders.gradientSubtract)),
    };

    return programs;
  }, []);

  const setupBuffers = useCallback((gl) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (destination) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  }, []);

  const clear = useCallback((gl, target) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []);

  const initFramebuffers = useCallback((gl, isWebGL2, halfFloat, support_linear_float) => {
    const textureWidth = gl.drawingBufferWidth >> FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE;
    const textureHeight = gl.drawingBufferHeight >> FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE;

    const internalFormat = isWebGL2 ? gl.RGBA16F : gl.RGBA;
    const internalFormatRG = isWebGL2 ? gl.RG16F : gl.RGBA;
    const formatRG = isWebGL2 ? gl.RG : gl.RGBA;
    const texType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;

    const framebuffers = {
      density: createDoubleFBO(gl, 0, textureWidth, textureHeight, internalFormat, gl.RGBA, texType,
        support_linear_float ? gl.LINEAR : gl.NEAREST),
      velocity: createDoubleFBO(gl, 2, textureWidth, textureHeight, internalFormatRG, formatRG, texType,
        support_linear_float ? gl.LINEAR : gl.NEAREST),
      divergence: createFBO(gl, 4, textureWidth, textureHeight, internalFormatRG, formatRG, texType, gl.NEAREST),
      curl: createFBO(gl, 5, textureWidth, textureHeight, internalFormatRG, formatRG, texType, gl.NEAREST),
      pressure: createDoubleFBO(gl, 6, textureWidth, textureHeight, internalFormatRG, formatRG, texType, gl.NEAREST),
    };

    return { framebuffers, textureWidth, textureHeight };
  }, []);

  const createPointer = useCallback(() => ({
    id: -1,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    down: false,
    moved: false,
    color: [1, 0, 0],
  }), []);

  const createSplatFunction = useCallback((gl, programs, framebuffers, canvas, blit) => {
    let paletteIndex = 0;
    let colorCycleTime = Date.now();
    
    return (x, y, dx, dy, color) => {
      programs.splat.bind();
      const dynamicRadius = Math.max(0.0004, Math.min(0.0008, 0.0008 - Math.abs(dy) * 0.000004));
      
      // Velocity splat
      gl.uniform1i(programs.splat.uniforms.uTarget, framebuffers.velocity.first[2]);
      gl.uniform1f(programs.splat.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(programs.splat.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
      
      // Enhanced color cycling with sky blue to copper red transition
      const currentTime = Date.now();
      const timeDiff = (currentTime - colorCycleTime) / 3000; // 3 second cycles
      
      // Copper red color (rich metallic red)
      const copperRed = [0.722, 0.267, 0.169]; // #B8443B - deep copper red
      
      // Sky blue colors (bright and vivid)
      const skyBlue1 = [0.529, 0.808, 0.922]; // #87CEEB - light sky blue
      const skyBlue2 = [0.196, 0.643, 0.886]; // #32A4E2 - deeper sky blue
      const skyBlue3 = [0.118, 0.565, 0.929]; // #1E90ED - vibrant sky blue
      
      // Create smooth transition between sky blue and copper red
      const blendFactor = (Math.sin(timeDiff) + 1) / 2; // 0 to 1 oscillation
      const secondaryBlend = (Math.sin(timeDiff * 1.5) + 1) / 2;
      
      // Mix colors for velocity
      const rgbV = [
        skyBlue2[0] * (1 - blendFactor) + copperRed[0] * blendFactor,
        skyBlue2[1] * (1 - blendFactor) + copperRed[1] * blendFactor,
        skyBlue2[2] * (1 - blendFactor) + copperRed[2] * blendFactor,
      ];
      
      const intensityV = Math.max(0.5, Math.min(0.9, Math.abs(dy) / 100));
      gl.uniform3f(programs.splat.uniforms.color,
        dx * 2.2 * rgbV[0] * intensityV,
        -dy * 2.2 * rgbV[1] * intensityV,
        2.2 * rgbV[2] * intensityV
      );
      gl.uniform1f(programs.splat.uniforms.radius, dynamicRadius * 2.5);
      blit(framebuffers.velocity.second[1]);
      framebuffers.velocity.swap();

      // Enhanced density splat with dynamic sky blue to copper red waves
      const wavePhase1 = Math.sin(timeDiff * 0.8) * 0.5 + 0.5;
      const wavePhase2 = Math.sin(timeDiff * 1.2 + Math.PI/3) * 0.5 + 0.5;
      const wavePhase3 = Math.sin(timeDiff * 0.6 + Math.PI/2) * 0.5 + 0.5;
      
      // Create three color waves: Sky Blue -> Copper Red transition
      const color1 = [
        skyBlue1[0] * (1 - wavePhase1) + copperRed[0] * wavePhase1,
        skyBlue1[1] * (1 - wavePhase1) + copperRed[1] * wavePhase1,
        skyBlue1[2] * (1 - wavePhase1) + copperRed[2] * wavePhase1,
      ];
      
      const color2 = [
        skyBlue3[0] * (1 - wavePhase2) + copperRed[0] * wavePhase2,
        skyBlue3[1] * (1 - wavePhase2) + copperRed[1] * wavePhase2,
        skyBlue3[2] * (1 - wavePhase2) + copperRed[2] * wavePhase2,
      ];
      
      // Third color emphasizes copper red with subtle sky blue
      const color3 = [
        copperRed[0] * 0.85 + skyBlue2[0] * 0.15,
        copperRed[1] * 0.85 + skyBlue2[1] * 0.15,
        copperRed[2] * 0.85 + skyBlue2[2] * 0.15,
      ];
      
      // Blend all three colors dynamically with enhanced saturation
      const finalRgb = [
        (color1[0] * wavePhase1 + color2[0] * wavePhase2 + color3[0] * wavePhase3) / 3,
        (color1[1] * wavePhase1 + color2[1] * wavePhase2 + color3[1] * wavePhase3) / 3,
        (color1[2] * wavePhase1 + color2[2] * wavePhase2 + color3[2] * wavePhase3) / 3,
      ];
      
      const intensityD = Math.max(0.7, Math.min(1.2, Math.abs(dy) / 70));
      
      gl.uniform1i(programs.splat.uniforms.uTarget, framebuffers.density.first[2]);
      gl.uniform3f(programs.splat.uniforms.color,
        finalRgb[0] * 1.4 * intensityD,
        finalRgb[1] * 1.8 * intensityD,
        finalRgb[2] * 2.4 * intensityD
      );
      gl.uniform1f(programs.splat.uniforms.radius, dynamicRadius * 2.8);
      blit(framebuffers.density.second[1]);
      framebuffers.density.swap();
    };
  }, []);

  const createUpdateLoop = useCallback((gl, programs, framebuffers, canvas, blit, clear, pointers, splat) => {
    let animationFrameId;
    let lastTime = Date.now();

    const resizeCanvas = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        // Note: In a complete implementation, we'd reinitialize framebuffers here
      }
    };

    const update = () => {
      resizeCanvas();
      const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
      lastTime = Date.now();

      const { textureWidth, textureHeight } = framebuffers;
      gl.viewport(0, 0, textureWidth, textureHeight);

      // Velocity advection
      programs.advection.bind();
      gl.uniform2f(programs.advection.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(programs.advection.uniforms.uVelocity, framebuffers.velocity.first[2]);
      gl.uniform1i(programs.advection.uniforms.uSource, framebuffers.velocity.first[2]);
      gl.uniform1f(programs.advection.uniforms.dt, dt);
      gl.uniform1f(programs.advection.uniforms.dissipation, FLUID_CONSTANTS.VELOCITY_DISSIPATION);
      blit(framebuffers.velocity.second[1]);
      framebuffers.velocity.swap();

      // Density advection
      gl.uniform1i(programs.advection.uniforms.uVelocity, framebuffers.velocity.first[2]);
      gl.uniform1i(programs.advection.uniforms.uSource, framebuffers.density.first[2]);
      gl.uniform1f(programs.advection.uniforms.dissipation, FLUID_CONSTANTS.DENSITY_DISSIPATION);
      blit(framebuffers.density.second[1]);
      framebuffers.density.swap();

      // Process pointer interactions
      for (let i = 0; i < pointers.length; i++) {
        const pointer = pointers[i];
        if (pointer.moved) {
          splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
          pointer.moved = false;
        }
      }

      // Curl calculation
      programs.curl.bind();
      gl.uniform2f(programs.curl.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(programs.curl.uniforms.uVelocity, framebuffers.velocity.first[2]);
      blit(framebuffers.curl[1]);

      // Vorticity confinement
      programs.vorticity.bind();
      gl.uniform2f(programs.vorticity.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(programs.vorticity.uniforms.uVelocity, framebuffers.velocity.first[2]);
      gl.uniform1i(programs.vorticity.uniforms.uCurl, framebuffers.curl[2]);
      gl.uniform1f(programs.vorticity.uniforms.curl, FLUID_CONSTANTS.CURL);
      gl.uniform1f(programs.vorticity.uniforms.dt, dt);
      blit(framebuffers.velocity.second[1]);
      framebuffers.velocity.swap();

      // Divergence calculation
      programs.divergence.bind();
      gl.uniform2f(programs.divergence.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(programs.divergence.uniforms.uVelocity, framebuffers.velocity.first[2]);
      blit(framebuffers.divergence[1]);

      // Pressure solve
      clear(gl, framebuffers.pressure.first[1]);
      programs.pressure.bind();
      gl.uniform2f(programs.pressure.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(programs.pressure.uniforms.uDivergence, framebuffers.divergence[2]);

      for (let i = 0; i < FLUID_CONSTANTS.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(programs.pressure.uniforms.uPressure, framebuffers.pressure.first[2]);
        blit(framebuffers.pressure.second[1]);
        framebuffers.pressure.swap();
      }

      // Gradient subtraction
      programs.gradientSubtract.bind();
      gl.uniform2f(programs.gradientSubtract.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(programs.gradientSubtract.uniforms.uPressure, framebuffers.pressure.first[2]);
      gl.uniform1i(programs.gradientSubtract.uniforms.uVelocity, framebuffers.velocity.first[2]);
      blit(framebuffers.velocity.second[1]);
      framebuffers.velocity.swap();

      // Display
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      programs.display.bind();
      gl.uniform1i(programs.display.uniforms.uTexture, framebuffers.density.first[2]);
      blit(null);

      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitialized.current) return;

    // Add a small delay to ensure canvas is properly mounted
    const timeoutId = setTimeout(() => {
      if (!canvasRef.current) return;
      
      try {
        canvas.width = canvas.clientWidth || window.innerWidth;
        canvas.height = canvas.clientHeight || window.innerHeight;

        const webglContext = initializeWebGL(canvas);
        if (!webglContext) {
          console.error("Failed to initialize WebGL context");
          return;
        }

        const { gl, isWebGL2, halfFloat, support_linear_float } = webglContext;
        const programs = setupShaders(gl, isWebGL2, support_linear_float);
        const blit = setupBuffers(gl);
        const { framebuffers, textureWidth, textureHeight } = initFramebuffers(gl, isWebGL2, halfFloat, support_linear_float);
        
        // Add textureWidth and textureHeight to framebuffers for update loop
        framebuffers.textureWidth = textureWidth;
        framebuffers.textureHeight = textureHeight;

        const pointers = [createPointer()];
        const splat = createSplatFunction(gl, programs, framebuffers, canvas, blit);

        isInitialized.current = true;

        // Event handlers
        const handleMouseMove = (e) => {
          pointers[0].moved = pointers[0].down;
          pointers[0].dx = (e.offsetX - pointers[0].x) * 10.0;
          pointers[0].dy = (e.offsetY - pointers[0].y) * 10.0;
          pointers[0].x = e.offsetX;
          pointers[0].y = e.offsetY;
          pointers[0].down = true;
        };

        const handleTouchMove = (e) => {
          e.preventDefault();
          const touches = e.targetTouches;
          for (let i = 0; i < touches.length; i++) {
            const pointer = pointers[i];
            if (pointer) {
              pointer.moved = pointer.down;
              pointer.dx = (touches[i].pageX - pointer.x) * 10.0;
              pointer.dy = (touches[i].pageY - pointer.y) * 10.0;
              pointer.x = touches[i].pageX;
              pointer.y = touches[i].pageY;
            }
          }
        };

        const handleMouseDown = () => {
          pointers[0].down = true;
        };

        const handleTouchStart = (e) => {
          const touches = e.targetTouches;
          for (let i = 0; i < touches.length; i++) {
            if (i >= pointers.length) pointers.push(createPointer());
            pointers[i].id = touches[i].identifier;
            pointers[i].down = true;
            pointers[i].x = touches[i].pageX;
            pointers[i].y = touches[i].pageY;
          }
        };

        const handleMouseUp = () => {
          pointers[0].down = false;
        };

        const handleTouchEnd = (e) => {
          const touches = e.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            for (let j = 0; j < pointers.length; j++) {
              if (touches[i].identifier === pointers[j].id)
                pointers[j].down = false;
            }
          }
        };

        // Add event listeners
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchmove", handleTouchMove, false);
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchend", handleTouchEnd);

        const stopUpdateLoop = createUpdateLoop(gl, programs, framebuffers, canvas, blit, clear, pointers, splat);

        // Cleanup function
        return () => {
          stopUpdateLoop();
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("touchmove", handleTouchMove);
          canvas.removeEventListener("mousedown", handleMouseDown);
          canvas.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("mouseup", handleMouseUp);
          window.removeEventListener("touchend", handleTouchEnd);

          if (gl) {
            gl.getExtension("WEBGL_lose_context")?.loseContext();
          }
        };
      } catch (error) {
        console.error("FluidCanvas initialization error:", error);
        return null;
      }
    }, 100); // 100ms delay

    return () => {
      clearTimeout(timeoutId);
      isInitialized.current = false;
    };
  }, [initializeWebGL, setupShaders, setupBuffers, initFramebuffers, createPointer, createSplatFunction, createUpdateLoop, clear]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block" }}
    />
  );
});

FluidCanvas.displayName = 'FluidCanvas';

export default FluidCanvas;
