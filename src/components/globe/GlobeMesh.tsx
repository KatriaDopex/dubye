"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { GLOBE_RADIUS } from "./globe-utils";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath } from "d3-geo";
import type { Topology } from "topojson-specification";

const W = 2048;
const H = 1024;

function buildTexture(
  landTopo: Topology,
  countriesTopo: Topology
): THREE.CanvasTexture {
  const land = feature(
    landTopo,
    landTopo.objects.land
  ) as unknown as GeoJSON.FeatureCollection;
  const countries = feature(
    countriesTopo,
    countriesTopo.objects.countries
  ) as unknown as GeoJSON.FeatureCollection;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Ocean
  ctx.fillStyle = "#020208";
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 0.5;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * H;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * W;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  const projection = geoEquirectangular()
    .scale(W / (2 * Math.PI))
    .translate([W / 2, H / 2]);

  const path = geoPath(projection, ctx);

  // Land fill
  ctx.fillStyle = "#162040";
  for (const f of land.features) {
    ctx.beginPath();
    path(f);
    ctx.fill();
  }

  // Country borders
  ctx.strokeStyle = "rgba(120, 160, 220, 0.25)";
  ctx.lineWidth = 0.8;
  for (const f of countries.features) {
    ctx.beginPath();
    path(f);
    ctx.stroke();
  }

  // Coastlines
  ctx.strokeStyle = "rgba(180, 210, 255, 0.7)";
  ctx.lineWidth = 1.8;
  for (const f of land.features) {
    ctx.beginPath();
    path(f);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

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
    rim = pow(rim, 2.5);
    gl_FragColor = vec4(0.7, 0.8, 1.0, rim * 0.2);
  }
`;

function EarthSphere() {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    Promise.all([
      fetch("/land-110m.json").then((r) => {
        if (!r.ok) throw new Error(`Land fetch failed: ${r.status}`);
        return r.json();
      }),
      fetch("/countries-110m.json").then((r) => {
        if (!r.ok) throw new Error(`Countries fetch failed: ${r.status}`);
        return r.json();
      }),
    ])
      .then(([landTopo, countriesTopo]) => {
        const texture = buildTexture(landTopo, countriesTopo);
        console.log("[Globe] texture ready:", texture.image.width, "x", texture.image.height);
        if (matRef.current) {
          matRef.current.map = texture;
          matRef.current.needsUpdate = true;
        }
      })
      .catch((err) => {
        console.error("[Globe] Failed to load map data:", err);
      });
  }, []);

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshBasicMaterial ref={matRef} color="#050510" />
    </mesh>
  );
}

export default function GlobeMesh() {
  return (
    <group>
      <EarthSphere />

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
