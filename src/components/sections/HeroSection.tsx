"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

const Globe = dynamic(() => import("@/components/globe/Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border border-white/[0.06] animate-pulse" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Globe />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      <div className="relative z-[2] h-full flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-white/40 text-[11px] tracking-[0.35em] uppercase mb-6 font-light"
        >
          DUBYE &mdash; Dubai &rarr; Asia relocation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="text-white text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight max-w-4xl leading-[1.1]"
        >
          Your next chapter
          <br />
          <span className="font-light text-white/60">starts in Asia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-6 text-white/35 text-sm sm:text-base max-w-lg font-light tracking-wide"
        >
          End-to-end relocation from Dubai to Bangkok, Hong Kong, Singapore &amp; Bali.
          Visa, housing, banking — handled.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10 pointer-events-auto"
        >
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Book a free consultation
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
