"use client";

import { useEffect, useState } from "react";
import { getSupporterCount } from "@/actions/supporter";
import { motion, AnimatePresence } from "framer-motion";

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function LiveCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentCount = await getSupporterCount();
      setCount(currentCount);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chars = count.toLocaleString("en-IN").split("");

  return (
    <section className="relative py-16 text-center md:py-24">
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
        Cards claimed and counting
      </p>
      <div className="font-display flex items-center justify-center text-7xl leading-none tabular-nums md:text-9xl">
        {chars.map((c, i) =>
          c === "," ? (
            <span key={`sep-${i}`} className="text-acid">
              ,
            </span>
          ) : (
            <Digit key={`d-${i}-${chars.length}`} value={c} />
          )
        )}
        <span aria-hidden className="animate-blink ml-2 inline-block h-[0.8em] w-[0.08em] bg-acid" />
      </div>
      <p className="mt-6 text-sm text-muted-foreground md:text-base">
        Every card is a person they can&apos;t ignore.{" "}
        <span className="text-foreground">The next number is yours.</span>
      </p>
    </section>
  );
}
