"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";
import { latLngToVector3, GLOBE_RADIUS } from "./globe-utils";

const PROPERTY = {
  name: "The Tait",
  tagline: "Special corner garden unit",
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
      position={[pos.x, pos.y + 0.07, pos.z]}
      distanceFactor={3.2}
      style={{ pointerEvents: "auto" }}
      zIndexRange={[100, 0]}
    >
      <div
        style={{
          width: "160px",
          background: "rgba(8, 8, 16, 0.30)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "10px",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, sans-serif",
          color: "#f5f5f7",
          transform: "translateX(-50%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image carousel */}
        <div style={{ position: "relative", height: "85px", overflow: "hidden" }}>
          <img
            src={PROPERTY.images[currentImage]}
            alt="The Tait"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 0.85,
            }}
          />

          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.4)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.4)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
            }}
          >
            ›
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "4px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "3px",
            }}
          >
            {PROPERTY.images.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentImage ? "8px" : "3px",
                  height: "3px",
                  borderRadius: "2px",
                  background: i === currentImage ? "#fff" : "rgba(255, 255, 255, 0.4)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "7px 9px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "5px", marginBottom: "3px" }}>
            <span style={{ fontSize: "11px", fontWeight: 500 }}>{PROPERTY.name}</span>
            <span style={{ fontSize: "7px", color: "rgba(255, 255, 255, 0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>BKK</span>
          </div>

          <div style={{ display: "flex", gap: "8px", fontSize: "8px", color: "rgba(255, 255, 255, 0.5)", marginBottom: "6px" }}>
            <span>{PROPERTY.floor}F</span>
            <span>{PROPERTY.beds} bed</span>
            <span>{PROPERTY.size}</span>
          </div>

          <button
            style={{
              width: "100%",
              padding: "5px",
              borderRadius: "6px",
              background: "rgba(255, 255, 255, 0.12)",
              color: "rgba(255, 255, 255, 0.8)",
              border: "none",
              fontSize: "8px",
              fontWeight: 400,
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            Inquire
          </button>
        </div>
      </div>
    </Html>
  );
}
