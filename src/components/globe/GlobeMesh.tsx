"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { GLOBE_RADIUS } from "./globe-utils";

// Animated scanline shader — premium holographic feel
const scanVert = `
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vUv = uv;
    vN = normalize(normalMatrix * normal);
    vP = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const scanFrag = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    // Base dark sphere
    vec3 baseColor = vec3(0.03, 0.03, 0.06);

    // Latitude lines — thin, bright
    float lat = sin(vUv.y * 3.14159 * 18.0);
    float latLine = smoothstep(0.97, 1.0, lat) * 0.12;

    // Longitude lines
    float lng = sin(vUv.x * 3.14159 * 36.0);
    float lngLine = smoothstep(0.97, 1.0, lng) * 0.08;

    float grid = max(latLine, lngLine);

    // Animated scan band — sweeps vertically
    float scanY = fract(uTime * 0.08);
    float scan = smoothstep(0.0, 0.02, abs(vUv.y - scanY));
    scan = 1.0 - scan;
    scan *= 0.15;

    // Fresnel rim
    float rim = 1.0 - max(dot(normalize(-vP), vN), 0.0);
    rim = pow(rim, 2.5);

    vec3 gridColor = vec3(0.4, 0.6, 1.0);
    vec3 scanColor = vec3(0.3, 0.7, 1.0);
    vec3 rimColor = vec3(0.5, 0.75, 1.0);

    vec3 color = baseColor;
    color += gridColor * grid;
    color += scanColor * scan;
    color += rimColor * rim * 0.25;

    float alpha = 1.0;
    gl_FragColor = vec4(color, alpha);
  }
`;

// Outer atmosphere glow
const glowVert = `
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vN = normalize(normalMatrix * normal);
    vP = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const glowFrag = `
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    float rim = 1.0 - max(dot(normalize(-vP), vN), 0.0);
    rim = pow(rim, 3.0);
    gl_FragColor = vec4(0.4, 0.65, 1.0, rim * 0.3);
  }
`;

export default function GlobeMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group>
      {/* Core sphere with animated shader */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={scanVert}
          fragmentShader={scanFrag}
          uniforms={{ uTime: { value: 0 } }}
        />
      </mesh>

      {/* Outer rim glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.003, 64, 64]} />
        <shaderMaterial
          vertexShader={glowVert}
          fragmentShader={glowFrag}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}
