"use client";

import { motion } from "framer-motion";

/**
 * Protest-style stats strip for the dashboard: your number, shares,
 * and join date rendered like tally marks on a placard.
 */
export function ProfileCard({ user }: { user: { supporterNumber?: number | null; createdAt: Date; shareCount?: number | null } }) {
  const formattedNumber = String(user.supporterNumber).padStart(6, "0");
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const stats = [
    { label: "Your number", value: `#${formattedNumber}`, acid: true },
    { label: "Times shared", value: String(user.shareCount ?? 0) },
    { label: "Enlisted on", value: joinedDate },
    { label: "Status", value: "Verified ✊", alarm: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-px border-2 border-foreground/20 bg-foreground/20 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          className="bg-card p-4 md:p-5"
        >
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase md:text-xs">
            {s.label}
          </p>
          <p
            className={`font-display mt-1 text-xl uppercase md:text-2xl ${
              s.acid ? "text-acid" : s.alarm ? "text-alarm" : ""
            }`}
          >
            {s.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
