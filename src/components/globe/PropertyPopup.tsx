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
  images: [
    { gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", label: "Living Area" },
    { gradient: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)", label: "Bedroom" },
    { gradient: "linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%)", label: "View" },
  ],
};

const BKK_LAT = 13.7563;
const BKK_LNG = 100.5018;

export default function PropertyPopup() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const pos = latLngToVector3(BKK_LAT, BKK_LNG, GLOBE_RADIUS * 1.01);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % PROPERTY.images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + PROPERTY.images.length) % PROPERTY.images.length);

  if (!isVisible) return null;

  return (
    <Html
      position={[pos.x + 0.06, pos.y + 0.05, pos.z]}
      distanceFactor={2.8}
      style={{ pointerEvents: "auto" }}
      zIndexRange={[100, 0]}
    >
      <div
        style={{
          width: "200px",
          background: "rgba(8, 8, 16, 0.88)",
          backdropFilter: "blur(40px) saturate(1.8)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, sans-serif",
          color: "#f5f5f7",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.5)",
          transform: "translateX(-50%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <span
            style={{
              fontSize: "7px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: 300,
            }}
          >
            Curated Property
          </span>
          <button
            onClick={() => setIsVisible(false)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.3)",
              cursor: "pointer",
              fontSize: "11px",
              padding: "0 2px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Image carousel */}
        <div style={{ position: "relative", height: "100px", overflow: "hidden" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: PROPERTY.images[currentImage].gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.4s ease",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                color: "rgba(255, 255, 255, 0.2)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              {PROPERTY.images[currentImage].label}
            </span>
          </div>

          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          >
            ›
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "5px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "4px",
            }}
          >
            {PROPERTY.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                style={{
                  width: i === currentImage ? "10px" : "4px",
                  height: "4px",
                  borderRadius: "2px",
                  background: i === currentImage ? "#fff" : "rgba(255, 255, 255, 0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Property info */}
        <div style={{ padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "2px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>
              {PROPERTY.name}
            </h3>
            <span style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.3)" }}>
              Bangkok
            </span>
          </div>

          <p
            style={{
              fontSize: "9px",
              color: "rgba(255, 255, 255, 0.45)",
              margin: "0 0 8px 0",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {PROPERTY.tagline}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              fontSize: "9px",
            }}
          >
            <div>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>Floor </span>
              <span style={{ fontWeight: 400 }}>{PROPERTY.floor}</span>
            </div>
            <div>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>Beds </span>
              <span style={{ fontWeight: 400 }}>{PROPERTY.beds}</span>
            </div>
            <div>
              <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>Size </span>
              <span style={{ fontWeight: 400 }}>{PROPERTY.size}</span>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              padding: "7px",
              borderRadius: "8px",
              background: "#fff",
              color: "#000",
              border: "none",
              fontSize: "10px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            Inquire
          </button>
        </div>
      </div>
    </Html>
  );
}
