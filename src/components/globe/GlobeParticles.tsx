"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { DESTINATIONS, DUBAI, PHUKET } from "@/lib/constants";
import { createArcCurve, GLOBE_RADIUS } from "./globe-utils";

function ArcParticles({
  startLat,
  startLng,
  endLat,
  endLng,
  count = 4,
  size = 0.005,
  speed = 0.15,
  opacity = 0.6,
}: {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  count?: number;
  size?: number;
  speed?: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const curve = useMemo(
    () =>
      createArcCurve(startLat, startLng, endLat, endLng, GLOBE_RADIUS),
    [startLat, startLng, endLat, endLng]
  );

  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => i / count),
    [count]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const t = (time * speed + offsets[i]) % 1;
      const point = curve.getPoint(t);
      dummy.position.copy(point);

      const scale = Math.sin(t * Math.PI) * 1.5;
      dummy.scale.setScalar(Math.max(0.3, scale));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
    </instancedMesh>
  );
}

export default function GlobeParticles() {
  // Bangkok coordinates for the secondary arc
  const bangkok = DESTINATIONS.find((d) => d.city === "Bangkok");

  return (
    <group>
      {/* Main arcs: Dubai → each destination */}
      {DESTINATIONS.map((dest) => (
        <ArcParticles
          key={dest.city}
          startLat={DUBAI.lat}
          startLng={DUBAI.lng}
          endLat={dest.lat}
          endLng={dest.lng}
        />
      ))}

      {/* Secondary arc: Bangkok → Phuket (smaller, faster dots) */}
      {bangkok && (
        <ArcParticles
          startLat={bangkok.lat}
          startLng={bangkok.lng}
          endLat={PHUKET.lat}
          endLng={PHUKET.lng}
          count={3}
          size={0.003}
          speed={0.25}
          opacity={0.4}
        />
      )}
    </group>
  );
}
