"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";

export function AboutCta() {
  return (
    <section className="relative py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden border-2 border-foreground bg-card p-8 text-center md:p-16"
      >
        <div
          aria-hidden
          className="halftone absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,black,transparent)]"
        />
        <div className="relative">
          <p className="font-mono text-xs tracking-widest text-alarm uppercase md:text-sm">
            You read the receipts. Now sign your name.
          </p>
          <h2 className="font-display mt-4 text-5xl leading-[0.9] uppercase md:text-8xl">
            History has
            <br />
            <span className="text-stroke-acid">a guest list.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
            Ten seconds, one tap, and your name gets a permanent number on this
            movement. When they ask who demanded better, the answer should
            include you.
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="btn-riot group mt-10 inline-flex items-center gap-2 border-2 border-foreground bg-acid px-8 py-4 font-display text-lg tracking-wide text-background uppercase"
          >
            Claim your card
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
