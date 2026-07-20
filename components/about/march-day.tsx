"use client";

import { motion } from "framer-motion";
import { Megaphone, ShieldCheck, Users, Landmark } from "lucide-react";

const RULES = [
  {
    icon: ShieldCheck,
    title: "Peaceful. Period.",
    body: "No stones, no fires, no fights — not even when provoked. The moment we break something, the story stops being about the leaks. Our discipline is our weapon.",
  },
  {
    icon: Users,
    title: "Move together",
    body: "Stay with your group, follow the march coordinators, and keep an eye on the people around you. Nobody gets left behind at a barricade.",
  },
  {
    icon: Megaphone,
    title: "Know your rights",
    body: "You have the right to peaceful assembly. If detained, stay calm, ask for the grounds of detention, and contact the legal-aid numbers shared by coordinators.",
  },
  {
    icon: Landmark,
    title: "Respect the restrictions",
    body: "Section 163 is in force around Parliament. Coordinators will announce the permitted route and assembly points — stick to them so the march stays on our terms, not theirs.",
  },
];

export function MarchDay() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mb-12">
        <h2 className="font-display text-4xl uppercase md:text-6xl">
          March day <span className="text-stroke-acid">rules</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          A march this size only works if every single person protects it. Read
          this twice. Screenshot it. It matters more than your poster.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {RULES.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative border-2 border-foreground/20 bg-card p-6 transition-colors hover:border-acid md:p-8"
          >
            <span className="flex size-11 items-center justify-center border-2 border-foreground bg-background">
              <r.icon className="size-5 text-acid" />
            </span>
            <h3 className="font-display mt-4 text-2xl uppercase group-hover:text-acid">
              {r.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              {r.body}
            </p>
            <div className="absolute top-0 right-0 h-3 w-3 -translate-y-1/2 translate-x-1/2 rotate-45 bg-alarm opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

      {/* the where/when strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 flex flex-col items-start justify-between gap-4 border-2 border-acid bg-acid/10 p-6 md:flex-row md:items-center md:p-8"
      >
        <div className="font-display text-2xl uppercase md:text-3xl">
          20 July · New Delhi · <span className="text-acid">Sansad Chalo</span>
        </div>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Assembly points announced by coordinators
        </p>
      </motion.div>
    </section>
  );
}
