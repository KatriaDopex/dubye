"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const IMAGES = ["/tait-1.jpg", "/tait-2.jpg", "/tait-3.jpg"];

const AMENITIES = [
  "Swimming pool & jacuzzi",
  "Sky deck & sunset pavilion",
  "Fitness gym & yoga room",
  "Theatre room",
  "Sauna & steam room",
  "24h concierge & security",
  "Private dining room",
  "Library lounge",
];

export default function TaitPropertyPage() {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-white/40 text-[11px] tracking-[0.2em] uppercase font-light hover:text-white/60 transition-colors"
          >
            &larr; DUBYE
          </Link>
          <span className="text-white/20 text-[10px] tracking-[0.15em] uppercase font-light">
            Curated Property
          </span>
        </div>
      </nav>

      {/* Hero image */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={IMAGES[currentImage]}
          alt="Tait Sathorn 12"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Carousel controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className="transition-all duration-300"
              style={{
                width: i === currentImage ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === currentImage ? "#fff" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <button
          onClick={() => setCurrentImage((p) => (p - 1 + IMAGES.length) % IMAGES.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentImage((p) => (p + 1) % IMAGES.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        >
          ›
        </button>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-2">
              Tait Sathorn 12
            </h1>
            <p className="text-white/35 text-sm font-light tracking-wide">
              Sathon Road, Bangkok &middot; by Raimon Land &times; Tokyo Tatemono
            </p>
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 pb-16 border-b border-white/[0.06]">
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-light mb-1">Floor</p>
              <p className="text-xl font-light">32nd</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-light mb-1">Bedrooms</p>
              <p className="text-xl font-light">2</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-light mb-1">Size</p>
              <p className="text-xl font-light">92.5 sqm</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-light mb-1">Provision</p>
              <p className="text-xl font-light">Furnished</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-16 pb-16 border-b border-white/[0.06]">
            <h2 className="text-lg font-medium mb-6 tracking-tight">About this property</h2>
            <div className="space-y-4 text-white/50 text-sm font-light leading-relaxed">
              <p>
                A rare corner unit on the 32nd floor of Tait Sathorn 12 — one of Bangkok&apos;s most
                prestigious new developments. The 40-storey tower&apos;s distinctive sloping fa&ccedil;ade
                and expansive glass panels deliver panoramic city views from every room.
              </p>
              <p>
                Built under the &ldquo;Iconic Urban Living&rdquo; philosophy by Raimon Land in partnership
                with Tokyo Tatemono, Tait balances refined design with genuine livability. The unit comes
                fully furnished and move-in ready — ideal for professionals relocating to Bangkok.
              </p>
              <p>
                Located just 180 meters from BTS Saint Louis Station, with immediate access to Central Silom,
                BNH Hospital, and Bangkok&apos;s finest dining. The building offers over 2,000 sqm of
                amenities across six floors.
              </p>
            </div>
          </div>

          {/* Building */}
          <div className="mb-16 pb-16 border-b border-white/[0.06]">
            <h2 className="text-lg font-medium mb-6 tracking-tight">The building</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <p className="text-2xl font-light mb-1">40</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.12em] font-light">Storeys</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl font-light mb-1">238</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.12em] font-light">Units</p>
              </div>
              <div className="text-center p-4">
                <p className="text-2xl font-light mb-1">Freehold</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.12em] font-light">Ownership</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-16 pb-16 border-b border-white/[0.06]">
            <h2 className="text-lg font-medium mb-6 tracking-tight">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AMENITIES.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-3 text-white/45 text-sm font-light"
                >
                  <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Interested?
            </h2>
            <p className="text-white/35 text-sm font-light mb-8">
              Contact us for pricing and availability.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/20 text-[11px] font-light tracking-wide">
            DUBYE &copy; 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
