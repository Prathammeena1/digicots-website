import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useMemo, useEffect } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Reference shaders from Codrops
const boxVertex = `
  varying vec2 vUv;
  uniform float uTime;
  mat4 rotation3d(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(
      oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                                0.0,                                0.0,                                1.0
    );
  }
  vec3 rotate(vec3 v, vec3 axis, float angle) {
    return (rotation3d(axis, angle) * vec4(v, 1.0)).xyz;
  }
  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 axis = vec3(1., 0., 0.);
    float twist = 0.1;
    float angle = pos.x * twist;
    vec3 transformed = rotate(pos, axis, angle);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
  }
`;
const boxFragment = `
  varying vec2 vUv;
  uniform float uTime;
  uniform sampler2D uTexture;
  void main() {
    float time = uTime * 0.18; // <-- Slower animation
    vec2 uv = fract(vUv * 3. - vec2(time, 0.));
    vec3 texture = texture2D(uTexture, uv).rgb;
    gl_FragColor = vec4(texture, 1.);
  }
`;

// TwistedText: renders text to a texture, then maps it to a twisted box
function  TwistedText({ text }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const textRef = useRef();
  const rtRef = useRef();
  const rtSceneRef = useRef();
  const rtCameraRef = useRef();
  const { gl } = useThree();

  // Setup render target and scene for text
  useEffect(() => {
    rtRef.current = new THREE.WebGLRenderTarget(2048, 1024);
    rtCameraRef.current = new THREE.PerspectiveCamera(45, 2, 0.1, 1000);
    rtCameraRef.current.position.z = 2.4;
    rtSceneRef.current = new THREE.Scene();
    rtSceneRef.current.background = new THREE.Color("white");
    return () => {
      rtRef.current && rtRef.current.dispose();
    };
  }, []);

  // Add text mesh to render target scene
  useEffect(() => {
    if (
      textRef.current &&
      rtSceneRef.current &&
      !rtSceneRef.current.children.includes(textRef.current)
    ) {
      rtSceneRef.current.add(textRef.current);
    }
  }, [textRef, rtSceneRef]);

  // Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: null },
    }),
    []
  );

  useFrame((state) => {
    // Animate time
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    // Render text to texture
    if (rtRef.current && rtSceneRef.current && rtCameraRef.current) {
      gl.setRenderTarget(rtRef.current);
      gl.render(rtSceneRef.current, rtCameraRef.current);
      gl.setRenderTarget(null);
      if (materialRef.current) {
        materialRef.current.uniforms.uTexture.value = rtRef.current.texture;
      }
    }
  });

  // Repeat the word to fill the texture horizontally
  // const repeatedText = Array(14).fill(text).join(' ')
  return (
    <group>
      {/* Text mesh for render target (not visible in main scene) */}
      <Text
        ref={textRef}
        fontSize={1.2}
        fontWeight={900}
        lineHeight={1}
        letterSpacing={0.1}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="black"
        position={[0, 0, 0]}
        scale={[.28, 1.8, 1]}
        visible={true}
        whiteSpace="nowrap"
        overflowWrap="normal"
      >
        {text}
      </Text>
      {/* Twisted box geometry with text texture */}
      <mesh ref={meshRef}>
        <boxGeometry args={[160, 18, 18, 168, 168, 64]} scale={[10.5,1,1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={boxVertex}
          fragmentShader={boxFragment}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

const TwistedTextEffect = () => {
  return (
    <div className="h-screen w-full absolute top-0 pointer-events-none overflow-hidden">
      <Canvas
        className="w-full h-full absolute top-0 left-0 z-10 pointer-events-none"
        camera={{ position: [0, 0, 80], fov: 45 }}
        style={{ pointerEvents: 'none' }}
        onPointerOver={undefined}
        onPointerOut={undefined}
        onPointerDown={undefined}
        onPointerUp={undefined}
        onPointerMove={undefined}
        onWheel={undefined}
        onClick={undefined}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <TwistedText text="ALPHA MARKETING" />
      </Canvas>
    </div>
  );
};

export default TwistedTextEffect;
