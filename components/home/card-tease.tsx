"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { ArrowRight, BadgeCheck, Hash, Share2 } from "lucide-react";

/**
 * A stylized mock of the supporter card so visitors see the payoff
 * before signing in. The real card is rendered by /api/card/[id].
 */
function CardMock() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -6, y: 40 }}
      whileInView={{ opacity: 1, rotate: -3, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      className="relative mx-auto aspect-[1200/630] w-full max-w-lg cursor-default overflow-hidden border-2 border-foreground bg-background shadow-[8px_8px_0_0_var(--alarm)]"
    >
      <div className="halftone absolute inset-0 opacity-40" aria-hidden />
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <span className="bg-acid px-2 py-0.5 font-display text-xs tracking-wide text-background uppercase sm:text-sm">
            Sansad Chalo · 20 July
          </span>
          <span className="font-mono text-[10px] text-muted-foreground sm:text-xs">
            NEW DELHI
          </span>
        </div>
        <div>
          <p className="font-display text-3xl leading-none uppercase sm:text-4xl">
            Your Name
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground sm:text-sm">
            marches for clean exams
          </p>
        </div>
        <div className="flex items-end justify-between">
          <span className="font-display text-4xl text-acid sm:text-5xl">
            #0042069
          </span>
          <span className="border border-alarm px-2 py-0.5 font-mono text-[10px] tracking-widest text-alarm uppercase sm:text-xs">
            Verified supporter
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const STEPS = [
  {
    icon: BadgeCheck,
    title: "Sign in",
    body: "One tap with Google. No forms, no spam, no fee.",
  },
  {
    icon: Hash,
    title: "Get your number",
    body: "Every supporter gets a permanent, sequential number. Early numbers are badges of honor.",
  },
  {
    icon: Share2,
    title: "Flood the feed",
    body: "Post your card everywhere. When lakhs of faces show up with numbers, silence stops being an option.",
  },
];

export function CardTease() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-4xl uppercase md:text-6xl">
            One card.
            <br />
            <span className="text-stroke-acid">Lakhs of voices.</span>
          </h2>
          <ol className="mt-10 space-y-8">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="flex gap-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center border-2 border-foreground bg-card">
                  <s.icon className="size-5 text-acid" />
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground md:text-base">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="btn-riot group mt-10 inline-flex items-center gap-2 border-2 border-foreground bg-acid px-8 py-4 font-display text-lg tracking-wide text-background uppercase"
          >
            Get card #{" "}
            <span className="font-mono text-base">next</span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <CardMock />
      </div>
    </section>
  );
}
