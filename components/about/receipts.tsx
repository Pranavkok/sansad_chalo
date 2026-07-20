"use client";

import { motion } from "framer-motion";

/**
 * "The receipts" — a scandal timeline. Deliberately styled like a case file:
 * mono dates, hard borders, one alarm-red entry for the breaking point.
 */
const EVENTS = [
  {
    date: "EXAM NIGHT",
    title: "The paper leaks — again",
    body: "Question papers circulate on Telegram hours before lakhs of students sit the exam. Solved answer keys sell for the price of a year of coaching. For the students who paid with sleep instead of money, the merit list is decided before the first bell.",
  },
  {
    date: "RESULT DAY",
    title: "Numbers that don't add up",
    body: "Impossible clusters of perfect scores. Grace marks invented after the fact. Toppers concentrated in single centres. Every statistician who looks at the distribution says the same thing: this is not what an honest exam looks like.",
  },
  {
    date: "THE DENIAL",
    title: "“There was no leak.”",
    body: "The Education Minister goes on camera and denies it. Then arrests happen. Then a re-exam is ordered for some. The story changes every week — the accountability never arrives. Not one resignation. Not one apology to the students whose year was stolen.",
    alarm: true,
  },
  {
    date: "THE HUNGER STRIKE",
    title: "Our elders put their bodies on the line",
    body: "Sonam Wangchuk goes on hunger strike so that someone, anyone, in power has to look at what is being done to young people. Days pass. The silence from the ministry gets louder.",
  },
  {
    date: "THE CRACKDOWN",
    title: "They answer us with Section 163",
    body: "Instead of answering the questions, Delhi Police imposes Section 163 restrictions around Parliament. When the response to “who sold our exams?” is a barricade, you learn exactly how afraid of the question they are.",
  },
  {
    date: "20 JULY",
    title: "Sansad Chalo",
    body: "So we march. Peacefully, loudly, in numbers too large to ignore, to the one building that is supposed to answer to us. This is where you come in.",
    acid: true,
  },
];

export function Receipts() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mb-12 flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl uppercase md:text-6xl">
          The <span className="text-acid">receipts</span>
        </h2>
        <span className="hidden font-mono text-xs tracking-widest text-muted-foreground uppercase md:block">
          Exhibit A through F
        </span>
      </div>

      <ol className="relative ml-3 border-l-2 border-foreground/20 md:ml-4">
        {EVENTS.map((e, i) => (
          <motion.li
            key={e.title}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-12 pl-8 last:pb-0 md:pl-12"
          >
            {/* timeline node */}
            <span
              className={`absolute top-1 -left-[7px] block size-3 rotate-45 ${
                e.acid ? "bg-acid" : e.alarm ? "bg-alarm" : "bg-foreground/40"
              }`}
              aria-hidden
            />
            <p
              className={`font-mono text-xs tracking-widest uppercase ${
                e.acid ? "text-acid" : e.alarm ? "text-alarm" : "text-muted-foreground"
              }`}
            >
              {e.date}
            </p>
            <h3
              className={`font-display mt-2 text-2xl uppercase md:text-3xl ${
                e.acid ? "text-acid" : ""
              }`}
            >
              {e.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {e.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
