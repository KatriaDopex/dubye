import * as THREE from "three";

export const GLOBE_RADIUS = 1;

export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = GLOBE_RADIUS
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

export function createArcCurve(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  radius: number = GLOBE_RADIUS,
  altitudeScale: number = 0.4
): THREE.QuadraticBezierCurve3 {
  const start = latLngToVector3(startLat, startLng, radius);
  const end = latLngToVector3(endLat, endLng, radius);

  // Calculate distance-based altitude
  const distance = start.distanceTo(end);
  const altitude = distance * altitudeScale;

  // Midpoint elevated above the surface
  const mid = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  mid.normalize().multiplyScalar(radius + altitude);

  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

export function geoJsonToLines(
  geoJson: GeoJSON.FeatureCollection,
  radius: number = GLOBE_RADIUS
): Float32Array {
  const points: number[] = [];

  for (const feature of geoJson.features) {
    const geometry = feature.geometry;
    if (geometry.type === "Polygon") {
      for (const ring of geometry.coordinates) {
        addRingPoints(ring, radius, points);
      }
    } else if (geometry.type === "MultiPolygon") {
      for (const polygon of geometry.coordinates) {
        for (const ring of polygon) {
          addRingPoints(ring, radius, points);
        }
      }
    }
  }

  return new Float32Array(points);
}

function addRingPoints(
  ring: number[][],
  radius: number,
  points: number[]
): void {
  for (let i = 0; i < ring.length - 1; i++) {
    const [lng1, lat1] = ring[i];
    const [lng2, lat2] = ring[i + 1];
    const p1 = latLngToVector3(lat1, lng1, radius * 1.001);
    const p2 = latLngToVector3(lat2, lng2, radius * 1.001);
    points.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
  }
}
