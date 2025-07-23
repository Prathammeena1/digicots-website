import React, { useRef, useEffect, useCallback, useState } from "react";
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
  const animationRef = useRef(null);
  const lastFrameTime = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // GPU-optimized performance monitoring
  const performanceRef = useRef({
    frameCount: 0,
    lastFpsCheck: Date.now(),
    targetFps: 30, // Reduced from 45 to 30 for lower GPU usage
    adaptiveQuality: 0.6, // Reduced from 0.85 to 0.6 for better GPU performance
    skipFrames: 0,
    maxSkipFrames: 2 // Increased from 1 to 2 for more frame skipping
  });

  // More aggressive adaptive quality adjustment
  const adjustQuality = useCallback(() => {
    const perf = performanceRef.current;
    perf.frameCount++;
    
    const now = Date.now();
    if (now - perf.lastFpsCheck > 1000) { // Check every second
      const fps = perf.frameCount;
      perf.frameCount = 0;
      perf.lastFpsCheck = now;
      
      // Balanced quality adjustments for better visual experience
      if (fps < 25) {
        perf.adaptiveQuality = Math.max(0.4, perf.adaptiveQuality - 0.15); // Less aggressive reduction
        perf.maxSkipFrames = Math.min(2, perf.maxSkipFrames + 1);
      } else if (fps < 35) {
        perf.adaptiveQuality = Math.max(0.6, perf.adaptiveQuality - 0.08);
      } else if (fps > 50) {
        perf.adaptiveQuality = Math.min(1.0, perf.adaptiveQuality + 0.05); // Allow full quality when performance is good
        perf.maxSkipFrames = Math.max(0, perf.maxSkipFrames - 1);
      }
    }
    
    return perf.adaptiveQuality;
  }, []);

  const initializeWebGL = useCallback((canvas) => {
    if (!canvas) {
      console.error("Canvas element is null");
      return null;
    }

    // GPU-optimized resolution approach
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Reduced from 2 to 1.5 for lower GPU load
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr * 0.7); // Reduced from 0.85 to 0.7 for better GPU performance
    canvas.height = Math.floor(rect.height * dpr * 0.7);

    const params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power", // Use low-power for better battery life and less heat
      failIfMajorPerformanceCaveat: false,
      desynchronized: true, // Reduce input lag
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
    // Balanced texture resolution - maintain quality while optimizing performance
    const quality = performanceRef.current.adaptiveQuality;
    const baseDownsample = FLUID_CONSTANTS.TEXTURE_DOWNSAMPLE + Math.floor((1.0 - quality) * 2); // Reduced from 3 to 2 for better quality
    
    // Better minimum texture size for quality balance
    const textureWidth = Math.max(128, gl.drawingBufferWidth >> baseDownsample); // Increased back to 128 from 96
    const textureHeight = Math.max(128, gl.drawingBufferHeight >> baseDownsample);

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
    let colorCycleTime = Date.now();
    let lastSplatTime = 0;
    const splatThrottle = 25; // Increased throttle from 12 to 25ms for reduced GPU load
    
    return (x, y, dx, dy, color) => {
      const now = Date.now();
      if (now - lastSplatTime < splatThrottle) return; // Throttle splats
      lastSplatTime = now;
      
      programs.splat.bind();
      
      // Much larger base radius for bigger mouse cursor effect
      const quality = performanceRef.current.adaptiveQuality;
      const baseRadius = Math.max(0.002, Math.min(0.0000000025, 0.0000025 - Math.abs(dy) * 0.0000000001));
      const dynamicRadius = baseRadius * quality;
      
      // Velocity splat with reduced complexity
      gl.uniform1i(programs.splat.uniforms.uTarget, framebuffers.velocity.first[2]);
      gl.uniform1f(programs.splat.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(programs.splat.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
      
      // Enhanced color cycling for more dynamic wave flow
      const currentTime = Date.now();
      const timeDiff = (currentTime - colorCycleTime) / 4000; // Faster cycling from 6000 to 4000 for more dynamic waves
      
      // Pre-computed colors to reduce real-time calculation
      const copperRed = [0.722, 0.267, 0.169];
      const skyBlue = [0.329, 0.708, 0.822];
      
      // Simple linear interpolation
      const blendFactor = (Math.sin(timeDiff) + 1) * 0.5;
      
      const rgbV = [
        skyBlue[0] * (1 - blendFactor) + copperRed[0] * blendFactor,
        skyBlue[1] * (1 - blendFactor) + copperRed[1] * blendFactor,
        skyBlue[2] * (1 - blendFactor) + copperRed[2] * blendFactor,
      ];
      
      // GPU-optimized intensity calculations
      const intensityV = Math.max(0.4, Math.min(0.8, Math.abs(dy) / 120)) * quality; // Reduced intensity range for better GPU performance
      gl.uniform3f(programs.splat.uniforms.color,
        dx * 2.0 * rgbV[0] * intensityV, // Reduced multiplier from 2.8 to 2.0
        -dy * 2.0 * rgbV[1] * intensityV,
        2.0 * rgbV[2] * intensityV
      );
      gl.uniform1f(programs.splat.uniforms.radius, dynamicRadius * 4.5); // Keep existing radius
      blit(framebuffers.velocity.second[1]);
      framebuffers.velocity.swap();

      // Enhanced density splat with increased wave flow
      const wavePhase = Math.sin(timeDiff * 0.8) * 0.5 + 0.5; // Increased frequency from 0.4 to 0.8 for more dynamic waves
      const finalRgb = [
        copperRed[0] * wavePhase + skyBlue[0] * (1 - wavePhase),
        copperRed[1] * wavePhase + skyBlue[1] * (1 - wavePhase),
        copperRed[2] * wavePhase + skyBlue[2] * (1 - wavePhase),
      ];
      
      const intensityD = Math.max(0.6, Math.min(1.0, Math.abs(dy) / 90)) * quality; // Reduced intensity range for GPU optimization
      
      gl.uniform1i(programs.splat.uniforms.uTarget, framebuffers.density.first[2]);
      gl.uniform3f(programs.splat.uniforms.color,
        finalRgb[0] * 4.5 * intensityD, // Reduced from 6.5 to 4.5 for lower GPU usage
        finalRgb[1] * 5.0 * intensityD, // Reduced from 6.2 to 5.0
        finalRgb[2] * 6.5 * intensityD  // Reduced from 8.8 to 6.5
      );
      gl.uniform1f(programs.splat.uniforms.radius, dynamicRadius * 4.8); // Increased radius from 3.2 to 4.8
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
      const currentTime = Date.now();
      let frameCount = 0;
      let lastFrameTime = currentTime;
      const targetFPS = 30; // Reduced from 45 to 30 for lower GPU usage
      const frameInterval = 1000 / targetFPS;
      
      const animate = () => {
        const now = Date.now();
        const deltaTime = now - lastFrameTime;
        
        // Enhanced frame skipping for GPU optimization
        const perf = performanceRef.current;
        if (deltaTime < frameInterval || perf.skipFrames > 0) {
          if (perf.skipFrames > 0) {
            perf.skipFrames--;
          }
          animationFrameId = requestAnimationFrame(animate);
          return;
        }
        
        frameCount++;
        
        // Performance monitoring every 30 frames (1 second at 30fps)
        if (frameCount % 30 === 0) {
          const fps = 1000 / deltaTime;
          
          // More aggressive performance adjustments for GPU optimization
          if (performanceRef.current) {
            const currentQuality = performanceRef.current.adaptiveQuality;
            
            // Aggressive quality adjustments for lower GPU usage
            if (fps < 20 && currentQuality > 0.3) {
              performanceRef.current.adaptiveQuality = Math.max(0.3, currentQuality - 0.15);
              performanceRef.current.skipFrames = Math.min(3, performanceRef.current.skipFrames + 1);
            } else if (fps < 25 && currentQuality > 0.4) {
              performanceRef.current.adaptiveQuality = Math.max(0.4, currentQuality - 0.1);
            } else if (fps > 35 && currentQuality < 0.8) {
              performanceRef.current.adaptiveQuality = Math.min(0.8, currentQuality + 0.02);
            }
            
            performanceRef.current.frameRate = fps;
          }
        }
        
        lastFrameTime = now;
        
        // Enhanced visibility check with longer pause times
        if (canvasRef.current && typeof document !== 'undefined') {
          const rect = canvasRef.current.getBoundingClientRect();
          const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
          
          if (!isVisible) {
            // Longer pause when not visible
            setTimeout(() => {
              animationFrameId = requestAnimationFrame(animate);
            }, 200); // Increased from 100ms to 200ms when off-screen
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

        // Adaptive pressure solve iterations based on performance
        const pressureIterations = Math.floor(FLUID_CONSTANTS.PRESSURE_ITERATIONS * quality);
        clear(gl, framebuffers.pressure.first[1]);
        programs.pressure.bind();
        gl.uniform2f(programs.pressure.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
        gl.uniform1i(programs.pressure.uniforms.uDivergence, framebuffers.divergence[2]);

        for (let i = 0; i < pressureIterations; i++) {
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

        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
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

        // Event handlers with optimized sensitivity for GPU performance
        const handleMouseMove = (e) => {
          pointers[0].moved = pointers[0].down;
          pointers[0].dx = (e.offsetX - pointers[0].x) * 12.0; // Reduced from 15.0 to 12.0 for lower GPU load
          pointers[0].dy = (e.offsetY - pointers[0].y) * 12.0;
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
              pointer.dx = (touches[i].pageX - pointer.x) * 12.0; // Reduced from 15.0 to 12.0
              pointer.dy = (touches[i].pageY - pointer.y) * 12.0;
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
