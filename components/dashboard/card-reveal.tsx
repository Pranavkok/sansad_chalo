"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * The moment of payoff: your actual card, dealt onto the table with a
 * spring, tilted like a poster taped to a wall, straightening on hover.
 */
export function CardReveal({ userId, cacheKey }: { userId: string; cacheKey: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: -7, scale: 0.9 }}
      animate={
        loaded
          ? { opacity: 1, y: 0, rotate: -2, scale: 1 }
          : { opacity: 0, y: 60, rotate: -7, scale: 0.9 }
      }
      transition={{ type: "spring", stiffness: 110, damping: 15 }}
      whileHover={{ rotate: 0, scale: 1.015 }}
      className="relative mx-auto w-full max-w-3xl"
    >
      {/* tape strips */}
      <div
        aria-hidden
        className="absolute -top-3 left-8 z-10 h-6 w-24 -rotate-6 bg-acid/80"
      />
      <div
        aria-hidden
        className="absolute -top-3 right-8 z-10 h-6 w-24 rotate-3 bg-acid/80"
      />
      <div className="overflow-hidden border-2 border-foreground shadow-[10px_10px_0_0_var(--alarm)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/card/${userId}?t=${cacheKey}`}
          alt="Your Sansad Chalo supporter card"
          className="aspect-[1200/630] w-full object-cover"
          onLoad={() => setLoaded(true)}
        />
      </div>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center border-2 border-foreground/20 bg-card">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Printing your card…
          </p>
        </div>
      )}
    </motion.div>
  );
}
