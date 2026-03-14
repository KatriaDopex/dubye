"use client";

import { Suspense, useRef, useMemo, useState, useEffect } from "react";
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

// Shooting stars — small streaks that fly across the background
const SHOOTING_STAR_COUNT = 8;

function ShootingStars() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const stars = useMemo(() => {
    return Array.from({ length: SHOOTING_STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 12,
      z: -(Math.random() * 30 + 5),
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 0.4 - 0.2,
      delay: Math.random() * 12,
      life: 0,
      active: false,
    }));
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
      const s = stars[i];

      if (!s.active) {
        if (time > s.delay) {
          s.active = true;
          s.life = 0;
          s.x = (Math.random() - 0.5) * 16;
          s.y = Math.random() * 6 + 2;
          s.z = -(Math.random() * 20 + 8);
          s.speed = Math.random() * 4 + 3;
          s.angle = Math.random() * 0.3 - 0.15;
        }
      }

      if (s.active) {
        s.life += delta;
        const t = s.life;
        const px = s.x + t * s.speed * Math.cos(s.angle);
        const py = s.y - t * s.speed * Math.sin(Math.PI / 6 + s.angle);
        const pz = s.z;

        // Fade in/out
        const fade = t < 0.1 ? t / 0.1 : t > 1.5 ? Math.max(0, 1 - (t - 1.5) / 0.3) : 1;
        const scale = fade * 0.015;

        dummy.position.set(px, py, pz);
        dummy.scale.set(scale * 8, scale, scale); // elongated streak
        dummy.lookAt(px + Math.cos(s.angle), py - Math.sin(Math.PI / 6 + s.angle), pz);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        if (t > 2) {
          s.active = false;
          s.delay = time + Math.random() * 8 + 3;
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        }
      } else {
        dummy.position.set(0, 0, -100);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, SHOOTING_STAR_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

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
            gl_FragColor = vec4(0.4, 0.6, 1.0, rim * 0.2);
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
          <div className="absolute inset-0 rounded-full bg-white/[0.02] blur-3xl" />
          <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
        </div>
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0.3, 2.2], fov: 50 }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
    >
      <ambientLight intensity={0.1} color="#ffffff" />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#e8eeff" />
      <directionalLight position={[-4, 2, 2]} intensity={0.4} color="#ffffff" />
      <directionalLight position={[0, 1, -5]} intensity={0.6} color="#aabbff" />


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
