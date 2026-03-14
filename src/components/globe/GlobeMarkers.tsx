"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { DESTINATIONS, DUBAI, PHUKET } from "@/lib/constants";
import { latLngToVector3, GLOBE_RADIUS } from "./globe-utils";

function Marker({
  lat,
  lng,
  label,
  size = "normal",
}: {
  lat: number;
  lng: number;
  label: string;
  size?: "origin" | "large" | "normal" | "small";
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const pos = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.005);

  const dotRadius =
    size === "origin" ? 0.008 :
    size === "large" ? 0.008 :
    size === "small" ? 0.003 :
    0.005;

  const ringInner = size === "large" ? 0.012 : 0.008;
  const ringOuter = size === "large" ? 0.016 : 0.011;

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.25;
      ringRef.current.scale.setScalar(scale);
    }
    if (outerRingRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
      outerRingRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[dotRadius, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Inner pulse ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[ringInner, ringOuter, 32]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={size === "large" ? 0.3 : 0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Extra outer ring for Bangkok */}
      {size === "large" && (
        <mesh ref={outerRingRef}>
          <ringGeometry args={[0.02, 0.024, 32]} />
          <meshBasicMaterial
            color="#4488ff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {size !== "small" && (
        <Html
          position={[0, size === "large" ? 0.03 : 0.02, 0]}
          center
          distanceFactor={2.5}
          style={{ pointerEvents: "none" }}
        >
          <div
            className="whitespace-nowrap tracking-[0.15em] uppercase"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 300,
              fontSize: size === "large" ? "9px" : "7px",
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function GlobeMarkers() {
  return (
    <group>
      <Marker lat={DUBAI.lat} lng={DUBAI.lng} label="Dubai" size="origin" />
      {DESTINATIONS.map((dest) => (
        <Marker
          key={dest.city}
          lat={dest.lat}
          lng={dest.lng}
          label={dest.city}
          size={dest.city === "Bangkok" ? "large" : "normal"}
        />
      ))}
      {/* Phuket — small dot, no label */}
      <Marker lat={PHUKET.lat} lng={PHUKET.lng} label="Phuket" size="small" />
    </group>
  );
}
