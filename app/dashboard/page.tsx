import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { becomeSupporter } from "@/actions/supporter";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { ShareButtons } from "@/components/dashboard/share-buttons";
import { CardReveal } from "@/components/dashboard/card-reveal";

export const metadata = {
  title: "Your Card — Sansad Chalo · 20 July",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/");
  }

  let user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.supporterNumber) {
    const result = await becomeSupporter();
    if (!result.success) {
      throw new Error("Failed to assign supporter number");
    }
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
  }

  if (!user) {
    return redirect("/");
  }

  const formattedNumber = String(user.supporterNumber).padStart(6, "0");
  const firstName = (user.name ?? "comrade").split(" ")[0];

  return (
    <div className="container mx-auto min-h-[calc(100vh-8rem)] max-w-5xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="relative">
        <div
          aria-hidden
          className="halftone absolute inset-x-0 -top-12 -z-10 h-72 [mask-image:radial-gradient(ellipse_60%_100%_at_50%_0%,black,transparent)]"
        />
        <p className="font-mono text-xs tracking-widest text-alarm uppercase md:text-sm">
          Welcome to the march, {firstName}
        </p>
        <h1 className="font-display mt-3 text-5xl leading-[0.9] uppercase md:text-7xl">
          You are voice
          <br />
          <span className="text-stroke-acid">#{formattedNumber}</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          This number is permanently yours — nobody else will ever hold it.
          Below is your card. It only counts if people see it.
        </p>
      </div>

      {/* The card itself */}
      <section className="mt-12 md:mt-16">
        <CardReveal userId={user.id} cacheKey={String(user.updatedAt.getTime())} />
      </section>

      {/* Share rail */}
      <section className="mt-12 md:mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl uppercase md:text-5xl">
            Now <span className="text-acid">flood the feed</span>
          </h2>
          <span className="hidden font-mono text-xs tracking-widest text-muted-foreground uppercase md:block">
            Step 2 of 2
          </span>
        </div>
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
          Every share puts your number in front of people who haven&apos;t
          claimed theirs. Three shares from every supporter and the feed
          belongs to us on march day.
        </p>
        <ShareButtons user={user} />
      </section>

      {/* Stats */}
      <section className="mt-12 md:mt-16">
        <ProfileCard user={user} />
      </section>
    </div>
  );
}
