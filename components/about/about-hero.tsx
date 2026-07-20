"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function AboutHero() {
  return (
    <section className="relative pt-20 pb-12 md:pt-28 md:pb-16">
      <div
        aria-hidden
        className="halftone absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_55%_60%_at_35%_35%,black,transparent)]"
      />

      <motion.p
        variants={stagger}
        custom={0}
        initial="hidden"
        animate="show"
        className="mb-6 font-mono text-xs tracking-widest text-muted-foreground uppercase md:text-sm"
      >
        The manifesto · Read it. Share it. Show up.
      </motion.p>

      <h1 className="font-display text-[19vw] leading-[0.88] uppercase sm:text-[14vw] lg:text-[10rem]">
        <motion.span variants={stagger} custom={1} initial="hidden" animate="show" className="block">
          Why we
        </motion.span>
        <motion.span
          variants={stagger}
          custom={2}
          initial="hidden"
          animate="show"
          className="text-stroke-acid block"
        >
          march
        </motion.span>
      </h1>

      {/* rubber stamp */}
      <motion.div
        initial={{ opacity: 0, scale: 1.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
        aria-hidden
        className="pointer-events-none absolute top-24 right-[2%] hidden select-none md:block"
      >
        <span className="inline-block border-[3px] border-alarm px-4 py-2 font-display text-xl tracking-widest text-alarm uppercase">
          Non-violent
          <br />
          Non-negotiable
        </span>
      </motion.div>

      <motion.p
        variants={stagger}
        custom={3}
        initial="hidden"
        animate="show"
        className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        We are the students who did everything right. We took the coaching
        loans, gave up the birthdays, sat the mock tests at 6 AM. Then the
        papers we sweated over showed up on Telegram the night before the exam
        — priced like real estate. This page is the record: what happened, who
        looked away, and why on{" "}
        <span className="text-foreground">20 July we walk to Parliament</span>{" "}
        and refuse to be a statistic.
      </motion.p>
    </section>
  );
}
