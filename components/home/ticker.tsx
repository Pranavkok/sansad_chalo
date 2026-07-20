"use client";

const LINE = [
  "SANSAD CHALO",
  "20 JULY",
  "NEW DELHI",
  "ANSWER US",
  "RESIGN",
  "OUR EXAMS. OUR FUTURE.",
  "NO MORE LEAKS",
];

function TickerRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...LINE, ...LINE];
  return (
    <div
      className={`flex w-max items-center gap-8 pr-8 ${
        reverse ? "animate-marquee-slow" : "animate-marquee"
      }`}
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {items.map((text, i) => (
        <span
          key={i}
          className="flex items-center gap-8 font-display text-lg uppercase tracking-wide whitespace-nowrap"
        >
          {text}
          <span aria-hidden className="text-alarm">
            ✊
          </span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div
      aria-hidden
      className="relative z-10 -mx-4 -rotate-1 overflow-hidden border-y-2 border-foreground bg-acid py-2.5 text-background"
    >
      <TickerRow />
    </div>
  );
}
