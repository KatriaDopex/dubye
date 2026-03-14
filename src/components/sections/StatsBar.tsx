"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "motion/react";
import { STATS } from "@/lib/constants";

function AnimatedNumber({
  value,
  prefix,
  suffix,
  decimals = 0,
}: {
  value: number;
  prefix: string;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(
        decimals > 0
          ? v.toFixed(decimals)
          : Math.floor(v).toLocaleString()
      );
    });
    return unsubscribe;
  }, [spring, decimals]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90 tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
              />
              <p className="mt-2 text-white/30 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-light">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
