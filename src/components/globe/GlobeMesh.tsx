"use client";

import * as THREE from "three";
import { GLOBE_RADIUS } from "./globe-utils";

// Fresnel rim glow
const rimVert = `
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vN = normalize(normalMatrix * normal);
    vP = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const rimFrag = `
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    float rim = 1.0 - max(dot(normalize(-vP), vN), 0.0);
    rim = pow(rim, 2.8);
    gl_FragColor = vec4(0.7, 0.85, 1.0, rim * 0.35);
  }
`;

export default function GlobeMesh() {
  return (
    <group>
      {/* Core sphere — clean dark */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial color="#08080f" />
      </mesh>

      {/* Subtle wireframe grid */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.001, 36, 18]} />
        <meshBasicMaterial
          wireframe
          color="#ffffff"
          transparent
          opacity={0.03}
        />
      </mesh>

      {/* Rim glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.002, 64, 64]} />
        <shaderMaterial
          vertexShader={rimVert}
          fragmentShader={rimFrag}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}
