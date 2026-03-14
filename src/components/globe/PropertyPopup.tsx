"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";
import { latLngToVector3, GLOBE_RADIUS } from "./globe-utils";

const PROPERTY = {
  name: "The Tait",
  tagline: "Tait Sathorn 12 · Iconic Urban Living",
  floor: "32nd",
  beds: 2,
  size: "92.5 sqm",
  images: ["/tait-1.jpg", "/tait-2.jpg", "/tait-3.jpg"],
};

const BKK_LAT = 13.7563;
const BKK_LNG = 100.5018;

export default function PropertyPopup() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const pos = latLngToVector3(BKK_LAT, BKK_LNG, GLOBE_RADIUS * 1.005);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % PROPERTY.images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + PROPERTY.images.length) % PROPERTY.images.length);

  if (!isVisible) return null;

  return (
    <Html
      position={[pos.x, pos.y + 0.09, pos.z]}
      distanceFactor={3.5}
      style={{ pointerEvents: "auto" }}
      zIndexRange={[100, 0]}
    >
      <div
        style={{
          width: "140px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "8px",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, sans-serif",
          color: "#f5f5f7",
          transform: "translateX(-50%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image carousel */}
        <div style={{ position: "relative", height: "75px", overflow: "hidden" }}>
          <img
            src={PROPERTY.images[currentImage]}
            alt={PROPERTY.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 0.75,
            }}
          />

          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "3px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.3)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "7px",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "3px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.3)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "7px",
            }}
          >
            ›
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "3px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "2px",
            }}
          >
            {PROPERTY.images.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentImage ? "6px" : "2px",
                  height: "2px",
                  borderRadius: "1px",
                  background: i === currentImage ? "#fff" : "rgba(255, 255, 255, 0.35)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "5px 7px" }}>
          <span style={{ fontSize: "9px", fontWeight: 500, display: "block", marginBottom: "2px" }}>
            {PROPERTY.name}
          </span>
          <div style={{ display: "flex", gap: "6px", fontSize: "7px", color: "rgba(255, 255, 255, 0.35)", marginBottom: "4px" }}>
            <span>{PROPERTY.floor}F</span>
            <span>{PROPERTY.beds} bed</span>
            <span>{PROPERTY.size}</span>
          </div>

          <a
            href="/property/tait-sathorn-12"
            style={{
              display: "block",
              width: "100%",
              padding: "3px",
              borderRadius: "4px",
              background: "rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "7px",
              fontWeight: 400,
              cursor: "pointer",
              letterSpacing: "0.05em",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            View property
          </a>
        </div>
      </div>
    </Html>
  );
}
