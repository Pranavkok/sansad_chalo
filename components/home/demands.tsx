"use client";

import { motion } from "framer-motion";

const DEMANDS = [
  {
    num: "01",
    title: "Resignation",
    body: "The Education Minister must resign. Leaked papers, cancelled exams, ruined years — accountability starts at the top.",
  },
  {
    num: "02",
    title: "Clean exams",
    body: "An independent probe into every NEET irregularity, with the findings made public. No more committees that report to the accused.",
  },
  {
    num: "03",
    title: "Justice for students",
    body: "Restore what was stolen: fair re-examination, compensation for lost attempts, and criminal charges for everyone who sold our futures.",
  },
];

export function Demands() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mb-12 flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl uppercase md:text-6xl">
          What we <span className="text-acid">demand</span>
        </h2>
        <span className="hidden font-mono text-xs tracking-widest text-muted-foreground uppercase md:block">
          Non-negotiable
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {DEMANDS.map((d, i) => (
          <motion.div
            key={d.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative border-2 border-foreground/20 bg-card p-6 transition-colors hover:border-acid md:p-8"
          >
            <span className="font-display text-stroke-fg text-6xl md:text-7xl">
              {d.num}
            </span>
            <h3 className="font-display mt-4 text-2xl uppercase group-hover:text-acid md:text-3xl">
              {d.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {d.body}
            </p>
            <div className="absolute top-0 right-0 h-3 w-3 -translate-y-1/2 translate-x-1/2 rotate-45 bg-alarm opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
