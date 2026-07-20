import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground/10">
      <div className="container mx-auto px-4 py-10">
        <p className="font-display text-3xl uppercase md:text-5xl">
          See you at <span className="text-acid">Parliament.</span>
        </p>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Built by students, for students · Sansad Chalo · 20 July 2026
          </p>
          <div className="flex items-center gap-6 font-mono text-xs tracking-widest uppercase">
            <Link href="/about" className="text-muted-foreground transition-colors hover:text-acid">
              Why we march
            </Link>
            <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-acid">
              Privacy
            </Link>
            <Link href="/faq" className="text-muted-foreground transition-colors hover:text-acid">
              FAQ
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground/70">
          Protest peacefully. Know your rights. Follow the instructions of march
          coordinators and stay safe.
        </p>
      </div>
    </footer>
  );
}
