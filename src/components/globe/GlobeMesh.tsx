"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
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

  // Ocean — rich blue
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0, "#1a5276");
  oceanGrad.addColorStop(0.3, "#2471a3");
  oceanGrad.addColorStop(0.5, "#2e86c1");
  oceanGrad.addColorStop(0.7, "#2471a3");
  oceanGrad.addColorStop(1, "#1a5276");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  const projection = geoEquirectangular()
    .scale(W / (2 * Math.PI))
    .translate([W / 2, H / 2]);

  const path = geoPath(projection, ctx);

  // Land fill — natural earth tones
  ctx.fillStyle = "#5b8c5a";
  for (const f of land.features) {
    ctx.beginPath();
    path(f);
    ctx.fill();
  }

  // Subtle inner land shading
  ctx.fillStyle = "rgba(107, 142, 95, 0.4)";
  for (const f of land.features) {
    ctx.beginPath();
    path(f);
    ctx.fill();
  }

  // Country borders — soft grey
  ctx.strokeStyle = "rgba(80, 80, 80, 0.3)";
  ctx.lineWidth = 0.6;
  for (const f of countries.features) {
    ctx.beginPath();
    path(f);
    ctx.stroke();
  }

  // Coastlines — subtle darker edge
  ctx.strokeStyle = "rgba(30, 80, 60, 0.5)";
  ctx.lineWidth = 1.2;
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
    rim = pow(rim, 3.0);
    gl_FragColor = vec4(0.5, 0.7, 1.0, rim * 0.25);
  }
`;

function EarthSphere() {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    let cancelled = false;

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
        if (cancelled) return;
        const texture = buildTexture(landTopo, countriesTopo);
        if (matRef.current) {
          matRef.current.map = texture;
          matRef.current.color.set("#ffffff");
          matRef.current.needsUpdate = true;
        }
      })
      .catch((err) => {
        console.error("[Globe] Failed to load map data:", err);
      });

    return () => { cancelled = true; };
  }, []);

  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshBasicMaterial ref={matRef} color="#2471a3" />
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
