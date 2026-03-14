"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import GlobeMesh from "./GlobeMesh";
import GlobeArcs from "./GlobeArcs";
import GlobeMarkers from "./GlobeMarkers";
import GlobeParticles from "./GlobeParticles";
import PropertyPopup from "./PropertyPopup";

const DUBAI_LNG = 55.27;
const INITIAL_Y_ROTATION = -((DUBAI_LNG + 90) * Math.PI) / 180;

function RotatingGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const startedRef = useRef(false);

  useFrame(() => {
    if (!groupRef.current) return;
    if (!startedRef.current) {
      groupRef.current.rotation.y = INITIAL_Y_ROTATION;
      startedRef.current = true;
    }
    groupRef.current.rotation.y += 0.0005;
  });

  return <group ref={groupRef}>{children}</group>;
}

// Soft atmosphere halo — light blue for white bg
function AtmosphereGlow() {
  return (
    <mesh>
      <sphereGeometry args={[1.15, 64, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vec3 viewDir = normalize(-vPosition);
            float rim = pow(0.65 - dot(vNormal, viewDir), 3.0);
            gl_FragColor = vec4(0.4, 0.65, 1.0, rim * 0.2);
          }
        `}
      />
    </mesh>
  );
}

export default function Globe() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");
    const isMobile = window.innerWidth < 768;
    setCanRender(!!gl && !isMobile);
  }, []);

  if (!canRender) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-80 h-80">
          <div className="absolute inset-0 rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute inset-8 rounded-full border border-blue-200/30" />
        </div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0.3, 2.2], fov: 50 }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
    >
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, 2, 2]} intensity={0.3} color="#ffffff" />

      <Suspense fallback={null}>
        <RotatingGroup>
          <GlobeMesh />
          <GlobeArcs />
          <GlobeMarkers />
          <GlobeParticles />
          <PropertyPopup />
        </RotatingGroup>
        <AtmosphereGlow />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />
    </Canvas>
  );
}
