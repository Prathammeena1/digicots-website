import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "../shaders/vertexShader.glsl?raw";
import fragmentShader from "../shaders/fragmentShader.glsl?raw";


const HomeFourthSectionCanvas = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const materialRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    
    const multiplier = 250
    const nbCol = 1 * multiplier; // Number of columns
    const nbRows = 1.118 * multiplier; // Number of rows


    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");
    sceneRef.current = scene;

    // Camera setup (orthographic for perfect scaling)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // Function to update camera for responsiveness
    const updateCamera = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const aspect = width / height;
      
      // Calculate the viewing area based on the wolf dimensions
      const wolfAspect = nbCol / nbRows; // ~0.895
      
      let viewWidth, viewHeight;
      
      if (aspect > wolfAspect) {
        // Screen is wider than wolf - fit to height
        viewHeight = nbRows / 2;
        viewWidth = viewHeight * aspect;
      } else {
        // Screen is taller than wolf - fit to width  
        viewWidth = nbCol / 2;
        viewHeight = viewWidth / aspect;
      }
      
      camera.left = -viewWidth;
      camera.right = viewWidth;
      camera.top = viewHeight;
      camera.bottom = -viewHeight;
      camera.updateProjectionMatrix();
    };

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    
    // Set initial canvas and renderer size
    const initialWidth = canvasRef.current.clientWidth;
    const initialHeight = canvasRef.current.clientHeight;
    
    canvasRef.current.width = initialWidth;
    canvasRef.current.height = initialHeight;
    canvasRef.current.style.width = initialWidth + 'px';
    canvasRef.current.style.height = initialHeight + 'px';
    
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create BufferGeometry for plane
    const geometry = new THREE.BufferGeometry();

    // Load SVG texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/wolf.svg', (loadedTexture) => {
      console.log('Texture loaded successfully');
      loadedTexture.minFilter = THREE.LinearFilter;
      loadedTexture.magFilter = THREE.LinearFilter;
      loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
      loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
    }, undefined, (error) => {
      console.error('Error loading texture:', error);
    });

    const vertices = [];

    for (let i = -nbCol / 2; i < nbCol / 2; i++) {
      for (let j = -nbRows / 2; j < nbRows / 2; j++) {
        const point = [i, j, 0];
        vertices.push(...point);
      }
    }

    // Define vertices for a plane (2 triangles)
    const vertices32 = new Float32Array(vertices);

    // Set attributes
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices32, 3));
    
    // Create material with texture
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uPointSize: { value: 3 },
        uTexture: { value: texture },
        uNbColumns: { value: nbCol },
        uNbLines: { value: nbRows },
        uMouse: { value: new THREE.Vector2(999999, 999999) },
        uTime: { value: 0 },
        uWaveStrength: { value: 5.5 },
        uWaveRadius: { value: 150 },
        uMouseInfluence: { value: 0 }
      },
      transparent: true,
      alphaTest: 0.5,
      depthTest: false,
      depthWrite: false
    });
    
    materialRef.current = material;

    // Create mesh
    const plane = new THREE.Points(geometry, material);
    scene.add(plane);

    // Add some ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Mouse event handlers
    const handleMouseMove = (event) => {
      const canvas = canvasRef.current;
      if (!canvas || !materialRef.current) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Convert normalized coordinates to world coordinates
      const worldX = x * (nbCol / 2);
      const worldY = y * (nbRows / 2);
      
      mouseRef.current = { x: worldX, y: worldY };
      materialRef.current.uniforms.uMouse.value.set(worldX, worldY);
    };

    const handleMouseEnter = () => {
      if (!materialRef.current) return;
      // Smooth transition in
      materialRef.current.uniforms.uMouseInfluence.needsUpdate = true;
    };

    const handleMouseLeave = () => {
      if (!materialRef.current) return;
      // Smooth transition out
      materialRef.current.uniforms.uMouseInfluence.needsUpdate = true;
    };

    // Add mouse event listeners
    canvasRef.current.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('mouseenter', handleMouseEnter);
    canvasRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Update time uniform for wave animation
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value += 0.07; // Slightly faster for more dynamic effect
        
        // Smooth mouse influence transition
        const canvas = canvasRef.current;
        if (canvas) {
          const isHovering = canvas.matches(':hover');
          const currentInfluence = materialRef.current.uniforms.uMouseInfluence.value;
          const targetInfluence = isHovering ? 1.0 : 0.0;
          const lerpSpeed = 0.05; // Slower transition for more organic feel
          
          materialRef.current.uniforms.uMouseInfluence.value = THREE.MathUtils.lerp(
            currentInfluence, 
            targetInfluence, 
            lerpSpeed
          );
        }
      }

      // Update controls
      // controls.update(); // Removed orbit controls

      // Render
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !renderer || !camera) return;
      
      const container = canvas.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Set canvas size explicitly
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      // Update renderer size
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Update camera for responsiveness
      updateCamera();
    };

    // Initial camera setup
    updateCamera();

    // Initial resize to ensure proper sizing
    handleResize();

    window.addEventListener("resize", handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      window.removeEventListener("resize", handleResize);
      
      // Remove mouse event listeners
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('mouseenter', handleMouseEnter);
        canvasRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      // Removed orbit controls cleanup
    };
  }, []);

  return (
    <div className="h-screen w-[30vw] overflow-hidden bg-black absolute left-1/2 top-1/2 -translate-1/2">
      <canvas
        ref={canvasRef}
        className="w-[30vw] h-full block bg-black"
        style={{ display: "block" }}
      />


    </div>
  );
};

export default HomeFourthSectionCanvas;
