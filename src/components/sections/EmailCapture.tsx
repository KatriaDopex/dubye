"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { subscribeAction } from "@/actions/subscribe";

export default function EmailCapture() {
  const [state, formAction, isPending] = useActionState(subscribeAction, null);

  return (
    <section className="py-24 sm:py-32 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Start your move
        </h2>
        <p className="text-white/35 text-sm font-light mb-10">
          Drop your email. We&apos;ll send a free relocation briefing
          <br />
          within 24 hours. No obligations.
        </p>

        {state?.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6"
          >
            <p className="text-white/60 text-sm font-light">
              {state.message}
            </p>
          </motion.div>
        ) : (
          <form action={formAction} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="glass-input flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/90 placeholder:text-white/20 text-sm font-light tracking-wide focus:border-white/25 transition-colors"
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Get briefing"}
            </button>
          </form>
        )}

        {state && !state.success && (
          <p className="mt-3 text-red-400/70 text-xs font-light">
            {state.message}
          </p>
        )}
      </motion.div>
    </section>
  );
}
