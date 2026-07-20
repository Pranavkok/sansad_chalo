"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Is this affiliated with any political party?",
    a: "No. This is a student-led movement. Politicians are welcome to answer our demands — not to co-opt our march. The only flag we carry is our future.",
  },
  {
    q: "What does the supporter card actually do?",
    a: "It puts a face and a number on the movement. One card is a post; a lakh cards is a feed nobody — not the media, not the ministry — can scroll past. Your number is permanent, sequential, and uniquely yours.",
  },
  {
    q: "What data do you take when I sign in?",
    a: "Only what Google shares on sign-in: your name, email, and profile photo. That's what goes on your card. Nothing is sold, nothing is shared, and you can ask us to delete it any time.",
  },
  {
    q: "I can't be in Delhi on 20 July. Am I useless?",
    a: "The march has two fronts: the street and the feed. If you can't walk, post. Claim your card, share it, tag three friends. Half the pressure on the ministry is coming from timelines, not barricades.",
  },
  {
    q: "Is it safe to attend?",
    a: "The march is peaceful and coordinated, but Section 163 restrictions are in force around Parliament. Follow coordinator instructions, stay with your group, and read the march-day rules above before you come.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border-2 border-foreground/20 bg-card transition-colors hover:border-foreground/50"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
      >
        <span className="font-display text-lg uppercase md:text-xl">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex size-8 shrink-0 items-center justify-center border-2 border-foreground bg-background"
        >
          <Plus className="size-4 text-acid" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6 md:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="mb-12 flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl uppercase md:text-6xl">
          Straight <span className="text-acid">answers</span>
        </h2>
        <span className="hidden font-mono text-xs tracking-widest text-muted-foreground uppercase md:block">
          Since nobody else gives them
        </span>
      </div>

      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
        ))}
      </div>
    </section>
  );
}
