"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { DESTINATIONS, DUBAI, PHUKET } from "@/lib/constants";
import { createArcCurve, GLOBE_RADIUS } from "./globe-utils";

const ARC_SEGMENTS = 64;

function Arc({
  startLat,
  startLng,
  endLat,
  endLng,
  delay,
  opacity = 0.25,
}: {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  delay: number;
  opacity?: number;
}) {
  const progressRef = useRef(0);

  const lineObj = useMemo(() => {
    const curve = createArcCurve(
      startLat,
      startLng,
      endLat,
      endLng,
      GLOBE_RADIUS
    );
    const pts = curve.getPoints(ARC_SEGMENTS);
    const geometry = new THREE.BufferGeometry().setFromPoints(pts);
    const material = new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity,
    });
    const line = new THREE.Line(geometry, material);
    line.geometry.setDrawRange(0, 0);
    return line;
  }, [startLat, startLng, endLat, endLng, opacity]);

  useFrame((_, delta) => {
    progressRef.current += delta * 0.3;
    const t = Math.max(
      0,
      Math.min(1, (progressRef.current - delay) / 1.5)
    );
    const drawCount = Math.floor(t * (ARC_SEGMENTS + 1));
    lineObj.geometry.setDrawRange(0, drawCount);
  });

  return <primitive object={lineObj} />;
}

export default function GlobeArcs() {
  const bangkok = DESTINATIONS.find((d) => d.city === "Bangkok");

  return (
    <group>
      {/* Main arcs: Dubai → destinations */}
      {DESTINATIONS.map((dest, i) => (
        <Arc
          key={dest.city}
          startLat={DUBAI.lat}
          startLng={DUBAI.lng}
          endLat={dest.lat}
          endLng={dest.lng}
          delay={i * 0.2}
        />
      ))}

      {/* Secondary arc: Bangkok → Phuket (thinner) */}
      {bangkok && (
        <Arc
          startLat={bangkok.lat}
          startLng={bangkok.lng}
          endLat={PHUKET.lat}
          endLng={PHUKET.lng}
          delay={1.2}
          opacity={0.15}
        />
      )}
    </group>
  );
}
