import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import {
  paletteRGB,
  FLUID_CONSTANTS,
  shaders,
  GLProgram,
  compileShader,
  createFBO,
  createDoubleFBO,
} from "../utils/fluidSimUtils.js";

// Enhanced device capabilities detection with performance tiers
const detectDeviceCapabilities = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return { 
    isLowEnd: true, 
    maxTextureSize: 512, 
    performanceTier: 'ultra-low',
    targetFps: 15,
    maxQuality: 0.3
  };
  
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const renderer = gl.getParameter(gl.RENDERER) || '';
  const vendor = gl.getParameter(gl.VENDOR) || '';
  const maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
  const maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
  
  // Enhanced device detection
  const isIntegrated = /intel|integrated|mobile|mali|adreno|powervr|videocore/i.test(renderer + vendor);
  const hasLimitedMemory = maxTextureSize < 4096;
  const isSlowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  const hasLimitedUniforms = maxVertexUniforms < 256 || maxFragmentUniforms < 256;
  
  // Detect high-end devices
  const isHighEnd = /nvidia|geforce|radeon|apple.*gpu|m1|m2|m3/i.test(renderer + vendor);
  const hasHighMemory = maxTextureSize >= 8192;
  const isFastCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 8;
  const isDesktop = !('ontouchstart' in window) && navigator.maxTouchPoints === 0;
  
  // Performance tier classification
  let performanceTier, targetFps, maxQuality;
  
  if (isHighEnd && hasHighMemory && isFastCPU && isDesktop) {
    performanceTier = 'high';
    targetFps = 60;
    maxQuality = 1.0;
  } else if (!isIntegrated && !hasLimitedMemory && !isSlowCPU) {
    performanceTier = 'medium';
    targetFps = 45;
    maxQuality = 0.8;
  } else if (isIntegrated || hasLimitedMemory || isSlowCPU || hasLimitedUniforms) {
    performanceTier = 'low';
    targetFps = 25;
    maxQuality = 0.5;
  } else {
    performanceTier = 'ultra-low';
    targetFps = 15;
    maxQuality = 0.3;
  }
  
  const isLowEnd = performanceTier === 'low' || performanceTier === 'ultra-low';
  
  canvas.remove();
  return { 
    isLowEnd, 
    maxTextureSize: Math.min(maxTextureSize, isLowEnd ? 1024 : 4096),
    performanceTier,
    targetFps,
    maxQuality,
    deviceInfo: {
      renderer,
      vendor,
      cores: navigator.hardwareConcurrency || 1,
      isMobile: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      isDesktop
    }
  };
};

const initializeWebGL = (canvas) => {
  if (!canvas) {
    console.error("Canvas element is null");
    return null;
  }

  // Enhanced resolution scaling based on performance tier
  const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
  const rect = canvas.getBoundingClientRect();
  
  // Detect device capabilities for dynamic sizing
  const deviceInfo = detectDeviceCapabilities();
  
  // Performance-tier based quality multipliers
  let qualityMultiplier;
  switch (deviceInfo.performanceTier) {
    case 'high':
      qualityMultiplier = 0.9; // High quality for high-end devices
      break;
    case 'medium':
      qualityMultiplier = 0.7; // Medium quality for mid-range devices
      break;
    case 'low':
      qualityMultiplier = 0.5; // Lower quality for low-end devices
      break;
    case 'ultra-low':
      qualityMultiplier = 0.3; // Minimal quality for ultra-low-end devices
      break;
    default:
      qualityMultiplier = 0.7;
  }
  
  canvas.width = Math.floor(rect.width * dpr * qualityMultiplier);
  canvas.height = Math.floor(rect.height * dpr * qualityMultiplier);

  const params = {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true, // Changed to true to avoid slow contexts
    desynchronized: true,
  };

  let gl = canvas.getContext("webgl2", params);
  const isWebGL2 = !!gl;

  if (!isWebGL2) {
    gl =
      canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params);
  }

  if (!gl) {
    console.error("WebGL not supported");
    return null;
  }

  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  const halfFloat = gl.getExtension("OES_texture_half_float");
  let support_linear_float = gl.getExtension("OES_texture_half_float_linear");

  if (isWebGL2) {
    gl.getExtension("EXT_color_buffer_float");
    support_linear_float = gl.getExtension("OES_texture_float_linear");
  }

  return { gl, isWebGL2, halfFloat, support_linear_float, deviceInfo };
};

const FluidCanvas = React.memo(() => {
  const canvasRef = useRef(null);
  const isInitialized = useRef(false);
  const animationRef = useRef(null);
  const lastFrameTime = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  // Enhanced performance monitoring with device-adaptive settings
  const deviceCapabilities = detectDeviceCapabilities();
  const performanceRef = useRef({
    frameCount: 0,
    lastFpsCheck: Date.now(),
    targetFps: deviceCapabilities.targetFps, // Device-specific target FPS
    adaptiveQuality: deviceCapabilities.maxQuality * 0.8, // Start at 80% of max quality
    skipFrames: 0,
    maxSkipFrames: deviceCapabilities.performanceTier === 'ultra-low' ? 5 : 
                   deviceCapabilities.performanceTier === 'low' ? 3 : 2,
    isLowEndDevice: deviceCapabilities.isLowEnd,
    lastPerformanceCheck: 0,
    performanceTier: deviceCapabilities.performanceTier,
    maxQuality: deviceCapabilities.maxQuality,
    frameHistory: [], // Track frame times for better adaptation
    avgFrameTime: 16.67, // Start with 60fps equivalent
  });

  // // More aggressive adaptive quality adjustment
  // const adjustQuality = useCallback(() => {
  //   const perf = performanceRef.current;
  //   perf.frameCount++;

  //   const now = Date.now();
  //   if (now - perf.lastFpsCheck > 1000) { // Check every second
  //     const fps = perf.frameCount;
  //     perf.frameCount = 0;
  //     perf.lastFpsCheck = now;

  //     // Balanced quality adjustments for better visual experience
  //     if (fps < 25) {
  //       perf.adaptiveQuality = Math.max(0.4, perf.adaptiveQuality - 0.15); // Less aggressive reduction
  //       perf.maxSkipFrames = Math.min(2, perf.maxSkipFrames + 1);
  //     } else if (fps < 35) {
  //       perf.adaptiveQuality = Math.max(0.6, perf.adaptiveQuality - 0.08);
  //     } else if (fps > 50) {
  //       perf.adaptiveQuality = Math.min(1.0, perf.adaptiveQuality + 0.05); // Allow full quality when performance is good
  //       perf.maxSkipFrames = Math.max(0, perf.maxSkipFrames - 1);
  //     }
  //   }

  //   return perf.adaptiveQuality;
  // }, []);

  const setupShaders = useCallback((gl, isWebGL2, support_linear_float) => {
    // Cache compiled shaders so we don't recompile on every call
    const shaderCache = new Map();
    const programCache = new Map();

    // Helper to compile only once
    const getShader = (type, source) => {
      const key = type + source;
      if (shaderCache.has(key)) return shaderCache.get(key);

      const compiled = compileShader(gl, type, source);
      shaderCache.set(key, compiled);
      return compiled;
    };

    // Helper to create program lazily
    const getProgram = (name, fragSource) => {
      if (programCache.has(name)) return programCache.get(name);

      const baseVertexShader = getShader(gl.VERTEX_SHADER, shaders.baseVertex);
      const fragShader = getShader(gl.FRAGMENT_SHADER, fragSource);
      const program = new GLProgram(gl, baseVertexShader, fragShader);

      programCache.set(name, program);
      return program;
    };

    // Return getters instead of immediately compiled programs
    return {
      get display() {
        return getProgram("display", shaders.display);
      },
      get splat() {
        return getProgram("splat", shaders.splat);
      },
      get advection() {
        return getProgram(
          "advection",
          support_linear_float
            ? shaders.advection
            : shaders.advectionManualFiltering
        );
      },
      get divergence() {
        return getProgram("divergence", shaders.divergence);
      },
      get curl() {
        return getProgram("curl", shaders.curl);
      },
      get vorticity() {
        return getProgram("vorticity", shaders.vorticity);
      },
      get pressure() {
        return getProgram("pressure", shaders.pressure);
      },
      get gradientSubtract() {
        return getProgram("gradientSubtract", shaders.gradientSubtract);
      },
      dispose() {
        // Dispose all programs and shaders
        for (const program of programCache.values()) {
          gl.deleteProgram(program.program);
        }
        for (const shader of shaderCache.values()) {
          gl.deleteShader(shader);
        }
        programCache.clear();
        shaderCache.clear();
      },
    };
  }, []);

  const setupBuffers = useCallback((gl) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW
    );
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

  const initFramebuffers = useCallback(
    (gl, isWebGL2, halfFloat, support_linear_float, deviceInfo) => {
      const framebufferCache = new Map();

      // Helper to create only once
      const getFBO = (name, creator) => {
        if (framebufferCache.has(name)) return framebufferCache.get(name);
        const fbo = creator();
        framebufferCache.set(name, fbo);
        return fbo;
      };

      // Enhanced texture size calculation based on performance tier
      const quality = performanceRef.current.adaptiveQuality;
      let baseDownsample, maxSize;
      
      // Performance-tier specific texture sizing
      switch (deviceInfo.performanceTier) {
        case 'high':
          baseDownsample = FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE + Math.floor((1.0 - quality) * 1);
          maxSize = 1024; // High resolution for high-end devices
          break;
        case 'medium':
          baseDownsample = FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE + Math.floor((1.0 - quality) * 2);
          maxSize = 512; // Medium resolution for mid-range devices
          break;
        case 'low':
          baseDownsample = FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE + Math.floor((1.0 - quality) * 3);
          maxSize = 256; // Lower resolution for low-end devices
          break;
        case 'ultra-low':
          baseDownsample = FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE + Math.floor((1.0 - quality) * 4);
          maxSize = 128; // Minimal resolution for ultra-low-end devices
          break;
        default:
          baseDownsample = FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE + Math.floor((1.0 - quality) * 2);
          maxSize = 512;
      }
      
      // Ensure minimum viable texture size based on device tier
      const minSize = deviceInfo.performanceTier === 'ultra-low' ? 32 : 
                     deviceInfo.performanceTier === 'low' ? 64 : 128;
      
      const textureWidth = Math.max(
        minSize,
        Math.min(maxSize, gl.drawingBufferWidth >> baseDownsample)
      );
      const textureHeight = Math.max(
        minSize,
        Math.min(maxSize, gl.drawingBufferHeight >> baseDownsample)
      );

      // Use simpler formats for low-end devices
      const useSimpleFormats = deviceInfo.isLowEnd || !isWebGL2;
      const internalFormat = useSimpleFormats ? gl.RGBA : (isWebGL2 ? gl.RGBA16F : gl.RGBA);
      const internalFormatRG = useSimpleFormats ? gl.RGBA : (isWebGL2 ? gl.RG16F : gl.RGBA);
      const formatRG = useSimpleFormats ? gl.RGBA : (isWebGL2 ? gl.RG : gl.RGBA);
      const texType = useSimpleFormats ? gl.UNSIGNED_BYTE : (isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES);
      const filterType = useSimpleFormats ? gl.NEAREST : (support_linear_float ? gl.LINEAR : gl.NEAREST);

      // Framebuffer getters (lazy) with optimized settings for low-end devices
      const framebuffers = {
        get density() {
          return getFBO("density", () =>
            createDoubleFBO(
              gl,
              0,
              textureWidth,
              textureHeight,
              internalFormat,
              gl.RGBA,
              texType,
              filterType
            )
          );
        },
        get velocity() {
          return getFBO("velocity", () =>
            createDoubleFBO(
              gl,
              2,
              textureWidth,
              textureHeight,
              internalFormatRG,
              formatRG,
              texType,
              filterType
            )
          );
        },
        get divergence() {
          return getFBO("divergence", () =>
            createFBO(
              gl,
              4,
              textureWidth,
              textureHeight,
              internalFormatRG,
              formatRG,
              texType,
              gl.NEAREST
            )
          );
        },
        get curl() {
          return getFBO("curl", () =>
            createFBO(
              gl,
              5,
              textureWidth,
              textureHeight,
              internalFormatRG,
              formatRG,
              texType,
              gl.NEAREST
            )
          );
        },
        get pressure() {
          return getFBO("pressure", () =>
            createDoubleFBO(
              gl,
              6,
              textureWidth,
              textureHeight,
              internalFormatRG,
              formatRG,
              texType,
              gl.NEAREST
            )
          );
        },
        dispose() {
          // Cleanup GPU memory
          for (const fbo of framebufferCache.values()) {
            if (fbo?.read) {
              // DoubleFBO
              gl.deleteFramebuffer(fbo.read.fbo);
              gl.deleteTexture(fbo.read.texture);
              gl.deleteFramebuffer(fbo.write.fbo);
              gl.deleteTexture(fbo.write.texture);
            } else if (fbo?.fbo) {
              // Single FBO
              gl.deleteFramebuffer(fbo.fbo);
              gl.deleteTexture(fbo.texture);
            }
          }
          framebufferCache.clear();
        },
      };

      return { framebuffers, textureWidth, textureHeight };
    },
    []
  );

  const createPointer = useCallback(
    () => ({
      id: -1,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      down: false,
      moved: false,
      color: [1, 0, 0],
    }),
    []
  );

  const createSplatFunction = useCallback(
    (gl, programs, framebuffers, canvas, blit) => {
      let colorCycleTime = Date.now();
      let lastSplatTime = 0;
      const splatThrottle = 25; // Reduced from 40 to 25ms for more responsive interaction

      return (x, y, dx, dy, color) => {
        const now = Date.now();
        if (now - lastSplatTime < splatThrottle) return;
        lastSplatTime = now;

        programs.splat.bind();

        // Increased radius for more fluid spread
        const quality = performanceRef.current.adaptiveQuality;
        const baseRadius = Math.max(
          0.0003, // Increased from 0.01
          Math.min(0.000002, 0.025 - Math.abs(dy) * 0.0009) // Much larger radius for better flow
        );
        const dynamicRadius = baseRadius * quality * 1.5; // Added 1.5x multiplier

        // Enhanced velocity splat with more intensity
        gl.uniform1i(
          programs.splat.uniforms.uTarget,
          framebuffers.velocity.first[2]
        );
        gl.uniform1f(
          programs.splat.uniforms.aspectRatio,
          canvas.width / canvas.height
        );
        gl.uniform2f(
          programs.splat.uniforms.point,
          x / canvas.width,
          1.0 - y / canvas.height
        );

        // Enhanced color cycling for more dynamic flow
        const currentTime = Date.now();
        const timeDiff = (currentTime - colorCycleTime) / 30; // Faster cycling from 40 to 30

        // Pre-computed colors
        const copperRed = [0.722, 0.267, 0.169];
        const skyBlue = [0.329, 0.708, 0.822];

        // More dynamic interpolation
        const blendFactor = (Math.sin(timeDiff) + 1) * 0.5;

        const rgbV = [
          skyBlue[0] * (1 - blendFactor) + copperRed[0] * blendFactor,
          skyBlue[1] * (1 - blendFactor) + copperRed[1] * blendFactor,
          skyBlue[2] * (1 - blendFactor) + copperRed[2] * blendFactor,
        ];

        // Increased velocity intensity for more fluid movement
        const intensityV = Math.max(0.5, Math.min(1.2, Math.abs(dy) / 100)) * quality; // Increased intensity range
        gl.uniform3f(
          programs.splat.uniforms.color,
          dx * 2.5 * rgbV[0] * intensityV, // Increased from 1.5 to 2.5
          -dy * 2.5 * rgbV[1] * intensityV,
          2.5 * rgbV[2] * intensityV
        );
        gl.uniform1f(programs.splat.uniforms.radius, dynamicRadius * 4.5); // Increased from 3.0 to 4.5
        blit(framebuffers.velocity.second[1]);
        framebuffers.velocity.swap();

        // Enhanced density splat for more visible flow
        const wavePhase = Math.sin(timeDiff * 0.8) * 0.5 + 0.5; // Faster wave from 0.6 to 0.8
        const finalRgb = [
          copperRed[0] * wavePhase + skyBlue[0] * (1 - wavePhase),
          copperRed[1] * wavePhase + skyBlue[1] * (1 - wavePhase),
          copperRed[2] * wavePhase + skyBlue[2] * (1 - wavePhase),
        ];

        const intensityD = Math.max(0.6, Math.min(1.4, Math.abs(dy) / 80)) * quality; // Increased intensity

        gl.uniform1i(
          programs.splat.uniforms.uTarget,
          framebuffers.density.first[2]
        );
        gl.uniform3f(
          programs.splat.uniforms.color,
          finalRgb[0] * 4.5 * intensityD, // Increased from 3.0 to 4.5
          finalRgb[1] * 5.0 * intensityD, // Increased from 3.5 to 5.0
          finalRgb[2] * 5.5 * intensityD  // Increased from 4.0 to 5.5
        );
        gl.uniform1f(programs.splat.uniforms.radius, dynamicRadius * 5.0); // Increased from 3.5 to 5.0
        blit(framebuffers.density.second[1]);
        framebuffers.density.swap();
      };
    },
    []
  );

  const createUpdateLoop = useCallback(
    (gl, programs, framebuffers, canvas, blit, clear, pointers, splat) => {
      let animationFrameId;
      let lastTime = Date.now();

      const resizeCanvas = () => {
        if (
          canvas.width !== canvas.clientWidth ||
          canvas.height !== canvas.clientHeight
        ) {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
          // Note: In a complete implementation, we'd reinitialize framebuffers here
        }
      };

      const update = () => {
        const currentTime = Date.now();
        let frameCount = 0;
        let lastFrameTime = currentTime;

        const animate = () => {
          const now = Date.now();
          const deltaTime = now - lastFrameTime;

          // Enhanced device-adaptive frame control
          const perf = performanceRef.current;
          const targetInterval = 1000 / perf.targetFps;
          
          // Track frame history for better adaptation
          perf.frameHistory.push(deltaTime);
          if (perf.frameHistory.length > 10) {
            perf.frameHistory.shift();
          }
          
          // Calculate average frame time
          if (perf.frameHistory.length > 5) {
            perf.avgFrameTime = perf.frameHistory.reduce((a, b) => a + b) / perf.frameHistory.length;
          }
          
          // Adaptive frame skipping based on performance tier and current performance
          let shouldSkip = false;
          
          if (perf.performanceTier === 'ultra-low') {
            // Ultra-low devices: strict frame limiting
            shouldSkip = deltaTime < targetInterval * 1.2 || perf.skipFrames > 0;
          } else if (perf.performanceTier === 'low') {
            // Low devices: moderate frame limiting
            shouldSkip = deltaTime < targetInterval || perf.skipFrames > 0;
          } else if (perf.performanceTier === 'medium') {
            // Medium devices: light frame limiting
            shouldSkip = deltaTime < targetInterval * 0.8 || perf.skipFrames > 0;
          } else if (perf.performanceTier === 'high') {
            // High devices: minimal frame limiting, prioritize smoothness
            shouldSkip = deltaTime < targetInterval * 0.5 || perf.skipFrames > 0;
          }
          
          if (shouldSkip) {
            if (perf.skipFrames > 0) {
              perf.skipFrames--;
            }
            animationFrameId = requestAnimationFrame(animate);
            return;
          }

          frameCount++;

          // Device-adaptive performance monitoring frequency
          const monitoringFrequency = perf.performanceTier === 'high' ? 60 : 
                                     perf.performanceTier === 'medium' ? 30 : 20;

          if (frameCount % monitoringFrequency === 0) {
            const fps = 1000 / perf.avgFrameTime;

            if (performanceRef.current) {
              const currentQuality = performanceRef.current.adaptiveQuality;
              const maxQuality = performanceRef.current.maxQuality;

              // Performance-tier specific FPS thresholds and adjustments
              if (perf.performanceTier === 'high') {
                // High-end devices: maintain high FPS, allow aggressive quality
                if (fps < 45 && currentQuality > 0.6) {
                  performanceRef.current.adaptiveQuality = Math.max(0.6, currentQuality - 0.1);
                  performanceRef.current.skipFrames = Math.min(2, performanceRef.current.skipFrames + 1);
                } else if (fps > 55 && currentQuality < maxQuality) {
                  performanceRef.current.adaptiveQuality = Math.min(maxQuality, currentQuality + 0.05);
                  performanceRef.current.skipFrames = Math.max(0, performanceRef.current.skipFrames - 1);
                }
              } else if (perf.performanceTier === 'medium') {
                // Medium devices: balance FPS and quality
                if (fps < 35 && currentQuality > 0.4) {
                  performanceRef.current.adaptiveQuality = Math.max(0.4, currentQuality - 0.15);
                  performanceRef.current.skipFrames = Math.min(3, performanceRef.current.skipFrames + 1);
                } else if (fps > 40 && currentQuality < maxQuality) {
                  performanceRef.current.adaptiveQuality = Math.min(maxQuality, currentQuality + 0.03);
                  performanceRef.current.skipFrames = Math.max(0, performanceRef.current.skipFrames - 1);
                }
              } else if (perf.performanceTier === 'low') {
                // Low-end devices: prioritize stability over quality
                if (fps < 20 && currentQuality > 0.3) {
                  performanceRef.current.adaptiveQuality = Math.max(0.3, currentQuality - 0.15);
                  performanceRef.current.skipFrames = Math.min(4, performanceRef.current.skipFrames + 2);
                } else if (fps > 28 && currentQuality < maxQuality) {
                  performanceRef.current.adaptiveQuality = Math.min(maxQuality, currentQuality + 0.02);
                  performanceRef.current.skipFrames = Math.max(0, performanceRef.current.skipFrames - 1);
                }
              } else if (perf.performanceTier === 'ultra-low') {
                // Ultra-low devices: minimize load, ensure basic functionality
                if (fps < 12 && currentQuality > 0.2) {
                  performanceRef.current.adaptiveQuality = Math.max(0.2, currentQuality - 0.1);
                  performanceRef.current.skipFrames = Math.min(5, performanceRef.current.skipFrames + 2);
                } else if (fps > 18 && currentQuality < maxQuality) {
                  performanceRef.current.adaptiveQuality = Math.min(maxQuality, currentQuality + 0.01);
                  performanceRef.current.skipFrames = Math.max(1, performanceRef.current.skipFrames - 1);
                }
              }

              performanceRef.current.frameRate = fps;
            }
          }

          lastFrameTime = now;

          // Enhanced visibility check with much longer pause times for low-end devices
          if (canvasRef.current && typeof document !== "undefined") {
            const rect = canvasRef.current.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;

            if (!isVisible) {
              // Much longer pause when not visible
              setTimeout(() => {
                animationFrameId = requestAnimationFrame(animate);
              }, 500); // Increased from 200ms to 500ms
              return;
            }
          }

          // Core simulation with adaptive quality
          resizeCanvas();
          const dt = Math.min((now - lastTime) / 1000, 0.016);
          lastTime = now;

          const { textureWidth, textureHeight } = framebuffers;
          gl.viewport(0, 0, textureWidth, textureHeight);

          // Get current quality setting
          const quality = performanceRef.current?.adaptiveQuality || 1.0;

          // Velocity advection
          programs.advection.bind();
          gl.uniform2f(
            programs.advection.uniforms.texelSize,
            1.0 / textureWidth,
            1.0 / textureHeight
          );
          gl.uniform1i(
            programs.advection.uniforms.uVelocity,
            framebuffers.velocity.first[2]
          );
          gl.uniform1i(
            programs.advection.uniforms.uSource,
            framebuffers.velocity.first[2]
          );
          gl.uniform1f(programs.advection.uniforms.dt, dt);
          gl.uniform1f(
            programs.advection.uniforms.dissipation,
            FLUID_CONSTANTS.VELOCITY_DISSIPATION
          );
          blit(framebuffers.velocity.second[1]);
          framebuffers.velocity.swap();

          // Density advection
          gl.uniform1i(
            programs.advection.uniforms.uVelocity,
            framebuffers.velocity.first[2]
          );
          gl.uniform1i(
            programs.advection.uniforms.uSource,
            framebuffers.density.first[2]
          );
          gl.uniform1f(
            programs.advection.uniforms.dissipation,
            FLUID_CONSTANTS.DENSITY_DISSIPATION
          );
          blit(framebuffers.density.second[1]);
          framebuffers.density.swap();

          // Process pointer interactions
          for (let i = 0; i < pointers.length; i++) {
            const pointer = pointers[i];
            if (pointer.moved) {
              splat(
                pointer.x,
                pointer.y,
                pointer.dx,
                pointer.dy,
                pointer.color
              );
              pointer.moved = false;
            }
          }

          // Curl calculation
          programs.curl.bind();
          gl.uniform2f(
            programs.curl.uniforms.texelSize,
            1.0 / textureWidth,
            1.0 / textureHeight
          );
          gl.uniform1i(
            programs.curl.uniforms.uVelocity,
            framebuffers.velocity.first[2]
          );
          blit(framebuffers.curl[1]);

          // Vorticity confinement
          programs.vorticity.bind();
          gl.uniform2f(
            programs.vorticity.uniforms.texelSize,
            1.0 / textureWidth,
            1.0 / textureHeight
          );
          gl.uniform1i(
            programs.vorticity.uniforms.uVelocity,
            framebuffers.velocity.first[2]
          );
          gl.uniform1i(programs.vorticity.uniforms.uCurl, framebuffers.curl[2]);
          gl.uniform1f(programs.vorticity.uniforms.curl, FLUID_CONSTANTS.CURL);
          gl.uniform1f(programs.vorticity.uniforms.dt, dt);
          blit(framebuffers.velocity.second[1]);
          framebuffers.velocity.swap();

          // Divergence calculation
          programs.divergence.bind();
          gl.uniform2f(
            programs.divergence.uniforms.texelSize,
            1.0 / textureWidth,
            1.0 / textureHeight
          );
          gl.uniform1i(
            programs.divergence.uniforms.uVelocity,
            framebuffers.velocity.first[2]
          );
          blit(framebuffers.divergence[1]);

          // Reduced pressure solve iterations for low-end devices
          const pressureIterations = Math.floor(
            FLUID_CONSTANTS.PRESSURE_ITERATIONS * quality * 0.5 // Halved iterations for performance
          );
          clear(gl, framebuffers.pressure.first[1]);
          programs.pressure.bind();
          gl.uniform2f(
            programs.pressure.uniforms.texelSize,
            1.0 / textureWidth,
            1.0 / textureHeight
          );
          gl.uniform1i(
            programs.pressure.uniforms.uDivergence,
            framebuffers.divergence[2]
          );

          // Reduced loop count for better performance
          for (let i = 0; i < Math.min(pressureIterations, 50); i++) { // Cap at 50 iterations
            gl.uniform1i(
              programs.pressure.uniforms.uPressure,
              framebuffers.pressure.first[2]
            );
            blit(framebuffers.pressure.second[1]);
            framebuffers.pressure.swap();
          }

          // Gradient subtraction
          programs.gradientSubtract.bind();
          gl.uniform2f(
            programs.gradientSubtract.uniforms.texelSize,
            1.0 / textureWidth,
            1.0 / textureHeight
          );
          gl.uniform1i(
            programs.gradientSubtract.uniforms.uPressure,
            framebuffers.pressure.first[2]
          );
          gl.uniform1i(
            programs.gradientSubtract.uniforms.uVelocity,
            framebuffers.velocity.first[2]
          );
          blit(framebuffers.velocity.second[1]);
          framebuffers.velocity.swap();

          // Display
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          programs.display.bind();
          gl.uniform1i(
            programs.display.uniforms.uTexture,
            framebuffers.density.first[2]
          );
          blit(null);

          animationFrameId = requestAnimationFrame(animate);
        };

        animate();
      };

      update();
      return () => cancelAnimationFrame(animationFrameId);
    },
    []
  );

  useLayoutEffect(() => {
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

        const { gl, isWebGL2, halfFloat, support_linear_float, deviceInfo } = webglContext;
        
        // Enhanced performance settings based on device capabilities and performance tier
        console.log(`Device Performance Tier: ${deviceInfo.performanceTier}`, {
          targetFps: deviceInfo.targetFps,
          maxQuality: deviceInfo.maxQuality,
          renderer: deviceInfo.deviceInfo?.renderer,
          cores: deviceInfo.deviceInfo?.cores
        });
        
        // Apply device-specific performance settings
        performanceRef.current.targetFps = deviceInfo.targetFps;
        performanceRef.current.maxQuality = deviceInfo.maxQuality;
        performanceRef.current.adaptiveQuality = deviceInfo.maxQuality * 0.8; // Start at 80% of max
        performanceRef.current.performanceTier = deviceInfo.performanceTier;
        performanceRef.current.isLowEndDevice = deviceInfo.isLowEnd;
        
        // Set device-specific frame skipping limits
        switch (deviceInfo.performanceTier) {
          case 'high':
            performanceRef.current.maxSkipFrames = 1;
            break;
          case 'medium':
            performanceRef.current.maxSkipFrames = 2;
            break;
          case 'low':
            performanceRef.current.maxSkipFrames = 4;
            break;
          case 'ultra-low':
            performanceRef.current.maxSkipFrames = 5;
            break;
        }

        const programs = setupShaders(gl, isWebGL2, support_linear_float);
        const blit = setupBuffers(gl);
        const { framebuffers, textureWidth, textureHeight } = initFramebuffers(
          gl,
          isWebGL2,
          halfFloat,
          support_linear_float,
          deviceInfo
        );

        // Add textureWidth and textureHeight to framebuffers for update loop
        framebuffers.textureWidth = textureWidth;
        framebuffers.textureHeight = textureHeight;

        const pointers = [createPointer()];
        const splat = createSplatFunction(
          gl,
          programs,
          framebuffers,
          canvas,
          blit
        );

        isInitialized.current = true;

        // Enhanced event handlers with performance-tier based sensitivity
        const handleMouseMove = (e) => {
          pointers[0].moved = pointers[0].down;
          
          // Performance-tier specific sensitivity
          let sensitivity;
          switch (deviceInfo?.performanceTier) {
            case 'high':
              sensitivity = 18.0; // High sensitivity for smooth experience on high-end devices
              break;
            case 'medium':
              sensitivity = 14.0; // Medium sensitivity for balanced performance
              break;
            case 'low':
              sensitivity = 10.0; // Lower sensitivity for low-end devices
              break;
            case 'ultra-low':
              sensitivity = 6.0; // Minimal sensitivity for ultra-low-end devices
              break;
            default:
              sensitivity = 12.0;
          }
          
          pointers[0].dx = (e.offsetX - pointers[0].x) * sensitivity;
          pointers[0].dy = (e.offsetY - pointers[0].y) * sensitivity;
          pointers[0].x = e.offsetX;
          pointers[0].y = e.offsetY;
          pointers[0].down = true;
        };

        const handleTouchMove = (e) => {
          e.preventDefault();
          const touches = e.targetTouches;
          
          // Performance-tier specific touch sensitivity
          let sensitivity;
          switch (deviceInfo?.performanceTier) {
            case 'high':
              sensitivity = 16.0; // High sensitivity for responsive touch on high-end devices
              break;
            case 'medium':
              sensitivity = 12.0; // Medium sensitivity for balanced touch performance
              break;
            case 'low':
              sensitivity = 8.0; // Lower sensitivity for low-end devices
              break;
            case 'ultra-low':
              sensitivity = 5.0; // Minimal sensitivity for ultra-low-end devices
              break;
            default:
              sensitivity = 10.0;
          }
          
          for (let i = 0; i < touches.length; i++) {
            const pointer = pointers[i];
            if (pointer) {
              pointer.moved = pointer.down;
              pointer.dx = (touches[i].pageX - pointer.x) * sensitivity;
              pointer.dy = (touches[i].pageY - pointer.y) * sensitivity;
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

        const stopUpdateLoop = createUpdateLoop(
          gl,
          programs,
          framebuffers,
          canvas,
          blit,
          clear,
          pointers,
          splat
        );

        // Cleanup function
        return () => {
          stopUpdateLoop();
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("touchmove", handleTouchMove);
          canvas.removeEventListener("mousedown", handleMouseDown);
          canvas.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("mouseup", handleMouseUp);
          window.removeEventListener("touchend", handleTouchEnd);

          programs.dispose();
          framebuffers.dispose();
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
  }, [
    initializeWebGL,
    setupShaders,
    setupBuffers,
    initFramebuffers,
    createPointer,
    createSplatFunction,
    createUpdateLoop,
    clear,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full bg-white"
      style={{ display: "block", backgroundColor: "white" }}
    />
  );
});

FluidCanvas.displayName = "FluidCanvas";

export default FluidCanvas;
