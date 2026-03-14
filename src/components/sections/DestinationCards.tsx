"use client";

import { motion } from "motion/react";
import { DESTINATIONS } from "@/lib/constants";

function DotRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < rating ? "bg-black/40" : "bg-black/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function DestinationCards() {
  return (
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Where we relocate you
          </h2>
          <p className="text-black/40 text-sm font-light max-w-md mx-auto">
            Four proven corridors. Full-service relocation packages tailored to each destination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.city}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
              className="glass rounded-2xl p-5 hover:bg-black/[0.02] transition-colors duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xl">{dest.flag}</span>
                <div>
                  <h3 className="text-[15px] font-medium">{dest.city}</h3>
                  <p className="text-black/35 text-[11px] font-light">{dest.country}</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-black/40 text-[10px] uppercase tracking-[0.1em] font-light">
                    Cost of living
                  </span>
                  <span className="text-black/60 text-[13px] font-light tabular-nums">
                    {dest.costIndex}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black/40 text-[10px] uppercase tracking-[0.1em] font-light">
                    Visa ease
                  </span>
                  <DotRating rating={dest.visaEase} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black/40 text-[10px] uppercase tracking-[0.1em] font-light">
                    Lifestyle
                  </span>
                  <DotRating rating={dest.sceneRating} />
                </div>
              </div>

              <p className="text-black/30 text-[11px] font-light leading-relaxed italic">
                {dest.tagline}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
