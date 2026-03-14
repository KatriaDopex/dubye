"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";
import { latLngToVector3, GLOBE_RADIUS } from "./globe-utils";

const PROPERTY = {
  name: "The Tait",
  tagline: "Special corner garden unit",
  floor: "Ground floor",
  beds: 2,
  baths: 2,
  size: "95 sqm",
  price: "Contact for pricing",
  features: ["Corner unit", "Private garden", "Pool access", "Fully furnished"],
  images: [
    { gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", label: "Living Area" },
    { gradient: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)", label: "Bedroom" },
    { gradient: "linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%)", label: "Garden View" },
    { gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%)", label: "Kitchen" },
  ],
};

// Bangkok coordinates
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
      position={[pos.x + 0.08, pos.y + 0.06, pos.z]}
      distanceFactor={2.2}
      style={{ pointerEvents: "auto" }}
      zIndexRange={[100, 0]}
    >
      <div
        style={{
          width: "280px",
          background: "rgba(8, 8, 16, 0.85)",
          backdropFilter: "blur(40px) saturate(1.8)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, sans-serif",
          color: "#f5f5f7",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 113, 227, 0.08)",
          transform: "translateX(-50%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header badge */}
        <div
          style={{
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <span
            style={{
              fontSize: "9px",
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
              fontSize: "14px",
              padding: "0 2px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Image carousel */}
        <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
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
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.25)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              {PROPERTY.images[currentImage].label}
            </span>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ›
          </button>

          {/* Dots indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "5px",
            }}
          >
            {PROPERTY.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                style={{
                  width: i === currentImage ? "14px" : "5px",
                  height: "5px",
                  borderRadius: "3px",
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
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 500,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {PROPERTY.name}
            </h3>
            <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.3)" }}>
              Bangkok
            </span>
          </div>

          <p
            style={{
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.5)",
              margin: "0 0 12px 0",
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
              gap: "12px",
              marginBottom: "12px",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.35)" }}>Floor</span>
              <span style={{ fontSize: "11px", fontWeight: 400 }}>{PROPERTY.floor}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.35)" }}>Beds</span>
              <span style={{ fontSize: "11px", fontWeight: 400 }}>{PROPERTY.beds}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.35)" }}>Size</span>
              <span style={{ fontSize: "11px", fontWeight: 400 }}>{PROPERTY.size}</span>
            </div>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "14px" }}>
            {PROPERTY.features.map((f) => (
              <span
                key={f}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.4)",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontWeight: 300,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              background: "#fff",
              color: "#000",
              border: "none",
              fontSize: "12px",
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
