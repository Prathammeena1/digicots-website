// import React, { useRef, useEffect, useState } from 'react';
// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import * as THREE from 'three';

// const UnrollingPlane = () => {
//   const meshRef = useRef();
//   const [isAnimating, setIsAnimating] = useState(true);
  
//   // Load the texture
//   const texture = useLoader(TextureLoader, '/images/branding-page/img1.png');
  
//   // Animation progress (0 = fully rolled, 1 = fully unrolled)
//   const animationProgress = useRef(0);
  
//   useFrame((state, delta) => {
//     if (!meshRef.current || !isAnimating) return;
    
//     // Much slower animation for better visibility (8 seconds)
//     animationProgress.current += delta * 1.8; // Reduced from 0.25 to 0.125
    
//     if (animationProgress.current >= 1) {
//       animationProgress.current = 1;
//       setIsAnimating(false);
//     }
    
//     // Smooth easing
//     const progress = animationProgress.current;
//     const easedProgress = progress * progress * (3 - 2 * progress); // Smoothstep
    
//     // Update geometry to create true paper rolling effect
//     const geometry = meshRef.current.geometry;
//     const positionAttribute = geometry.attributes.position;
    
//     // Store original positions if not already stored
//     if (!geometry.userData.originalPositions) {
//       geometry.userData.originalPositions = positionAttribute.array.slice();
//     }
    
//     const originalPositions = geometry.userData.originalPositions;
//     const planeWidth = 6;
//     const planeHeight = 4;
    
//     for (let i = 0; i < positionAttribute.count; i++) {
//       const i3 = i * 3;
//       const originalX = originalPositions[i3];
//       const originalY = originalPositions[i3 + 1];
//       const originalZ = originalPositions[i3 + 2];
      
//       // Normalize X coordinate (0 to 1 from left to right)
//       const normalizedX = (originalX + planeWidth / 2) / planeWidth;
      
//       // REVERSED DIRECTION: Paper now unrolls from RIGHT to LEFT
//       // Calculate unroll progress - now starts from right side (1.0) and moves to left (0.0)
//       const unrollBoundary = 1.0 - easedProgress * 1.2; // Reversed: starts at 1.0, goes to 0.0
//       const isUnrolled = normalizedX >= unrollBoundary; // Reversed condition
      
//       if (isUnrolled) {
//         // This part is unrolled - use original flat position
//         positionAttribute.setXYZ(i, originalX, originalY, originalZ);
//       } else {
//         // This part is still rolled - create a VERY VISIBLE cylinder
//         const rollRadius = 1.0; // Much larger radius for visibility
//         const rollTightness = 3; // Number of complete wraps around the cylinder
        
//         // Position of the roll center (moves from left to right as it unrolls)
//         const rollCenter = (unrollBoundary - 0.5) * planeWidth;
        
//         // Distance from the unroll boundary (reversed calculation)
//         const distanceFromBoundary = (unrollBoundary - normalizedX) * planeWidth;
        
//         // Create multiple wraps - the further from boundary, the more wraps
//         const totalAngle = distanceFromBoundary * rollTightness * Math.PI;
        
//         // Add the Y position to create a spiral effect
//         const spiralAngle = totalAngle + (originalY / planeHeight) * Math.PI * 0.5;
        
//         // Transform to cylindrical coordinates with multiple wraps
//         const newX = rollCenter + rollRadius * Math.sin(spiralAngle);
//         const newY = originalY; // Keep Y position mostly unchanged
//         const newZ = rollRadius * Math.cos(spiralAngle) + rollRadius; // Offset to make it visible
        
//         positionAttribute.setXYZ(i, newX, newY, newZ);
//       }
//     }
    
//     positionAttribute.needsUpdate = true;
//     geometry.computeVertexNormals();
//   });
  
//   // Create plane geometry with high resolution for smooth rolling
//   const geometry = new THREE.PlaneGeometry(6, 4, 150, 100);
  
//   return (
//     <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]} castShadow receiveShadow>
//       <meshStandardMaterial 
//         map={texture} 
//         side={THREE.DoubleSide}
//         roughness={0.7}
//         metalness={0.0}
//         transparent={false}
//         wireframe={false} // Set to true to see the rolling geometry clearly
//       />
//     </mesh>
//   );
// };

// const UnrollingPaper = ({ 
//   width = "100%", 
//   height = "500px", 
//   className = "",
//   autoStart = true 
// }) => {
//   const [key, setKey] = useState(0);
  
//   // Function to restart animation
//   const restartAnimation = () => {
//     setKey(prev => prev + 1);
//   };
  
//   return (
//     <div className={`relative ${className}`} style={{ width, height }}>
//       <Canvas
//         key={key}
//         camera={{ 
//           position: [0, 0, 10], // Better angle to see the rolling cylinder
//           fov: 50,
//           near: 0.1,
//           far: 1000
//         }}
//         style={{ background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)' }}
//       >
//         {/* Enhanced lighting setup for better rolling visibility */}
//         <ambientLight intensity={0.6} />
//         <directionalLight 
//           position={[10, 10, 8]} 
//           intensity={1.5}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />
//         <pointLight position={[-5, 3, 5]} intensity={0.8} color="#ffffff" />
//         <spotLight 
//           position={[8, 8, 8]} 
//           angle={0.4} 
//           penumbra={0.3} 
//           intensity={1.0}
//           castShadow
//         />
//         <pointLight position={[-8, 2, 8]} intensity={0.6} color="#ffffff" />
//         <spotLight 
//           position={[5, 5, 10]} 
//           angle={0.3} 
//           penumbra={0.5} 
//           intensity={0.8}
//           castShadow
//         />
        
//         {/* The unrolling plane */}
//         <UnrollingPlane />
//       </Canvas>
      
//       {/* Control button to restart animation */}
//       <button
//         onClick={restartAnimation}
//         className="absolute bottom-4 right-4 pointer-events-auto bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
//       >
//         Restart Animation
//       </button>
//     </div>
//   );
// };

// export default UnrollingPaper;
