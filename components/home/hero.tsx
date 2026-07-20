"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { ArrowRight, MapPin } from "lucide-react";

const stagger = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Sticker({
  children,
  className,
  rotate,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotate * 3 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 14 }}
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ "--float-rotate": `${rotate}deg` } as React.CSSProperties}
      aria-hidden
    >
      <div className="animate-float font-display uppercase">{children}</div>
    </motion.div>
  );
}

export function Hero() {
  const claim = () => signIn("google", { callbackUrl: "/dashboard" });

  return (
    <section className="relative flex flex-col items-center pt-20 pb-16 text-center md:pt-28 md:pb-24">
      {/* halftone backdrop, fading out toward the edges */}
      <div
        aria-hidden
        className="halftone absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />

      {/* floating protest stickers around the headline */}
      <Sticker rotate={-8} delay={0.9} className="top-6 left-[4%] hidden md:block">
        <span className="inline-block border-2 border-alarm bg-background px-3 py-1 text-sm text-alarm">
          RESIGN NOW
        </span>
      </Sticker>
      <Sticker rotate={6} delay={1.05} className="top-24 right-[5%] hidden md:block">
        <span className="inline-block bg-acid px-3 py-1 text-sm text-background">
          #SansadChalo
        </span>
      </Sticker>
      <Sticker rotate={-5} delay={1.2} className="bottom-32 left-[9%] hidden lg:block">
        <span className="inline-block bg-foreground px-3 py-1 text-sm text-background">
          NO MORE PAPER LEAKS
        </span>
      </Sticker>
      <Sticker rotate={7} delay={1.35} className="right-[10%] bottom-24 hidden lg:block">
        <span className="inline-block border-2 border-foreground px-3 py-1 text-sm">
          ANSWER THE STUDENTS
        </span>
      </Sticker>

      <motion.div
        variants={stagger}
        custom={0}
        initial="hidden"
        animate="show"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-alarm/60 bg-alarm/10 px-4 py-1.5 font-mono text-xs tracking-widest uppercase md:text-sm"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alarm opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-alarm" />
        </span>
        Marching today · 20 July · New Delhi
      </motion.div>

      <h1 className="font-display text-[17vw] leading-[0.9] uppercase sm:text-[13vw] lg:text-[9.5rem]">
        <motion.span variants={stagger} custom={1} initial="hidden" animate="show" className="block">
          Our exams
        </motion.span>
        <motion.span
          variants={stagger}
          custom={2}
          initial="hidden"
          animate="show"
          className="text-stroke-acid block"
        >
          were sold.
        </motion.span>
        <motion.span variants={stagger} custom={3} initial="hidden" animate="show" className="block">
          We&apos;re <span className="text-alarm">done</span> asking.
        </motion.span>
      </h1>

      <motion.p
        variants={stagger}
        custom={4}
        initial="hidden"
        animate="show"
        className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
      >
        Paper leaks stole seats from students who earned them — and nobody has
        answered for it. Today we march to Parliament to demand the Education
        Minister&apos;s resignation. Claim your numbered protest card and put
        your face on this movement.
      </motion.p>

      <motion.div
        variants={stagger}
        custom={5}
        initial="hidden"
        animate="show"
        className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <button
          onClick={claim}
          className="btn-riot group inline-flex w-full items-center justify-center gap-2 border-2 border-foreground bg-acid px-8 py-4 font-display text-lg tracking-wide text-background uppercase sm:w-auto"
        >
          Claim your card
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </button>
        <a
          href="/about"
          className="inline-flex w-full items-center justify-center gap-2 border-2 border-foreground/40 px-8 py-4 font-display text-lg tracking-wide uppercase transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:w-auto"
        >
          <MapPin className="size-5" />
          Why we march
        </a>
      </motion.div>

      <motion.p
        variants={stagger}
        custom={6}
        initial="hidden"
        animate="show"
        className="mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase"
      >
        Free · 10 seconds · your card, your number, your voice
      </motion.p>
    </section>
  );
}
