import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { Ticker } from "@/components/home/ticker";
import { Receipts } from "@/components/about/receipts";
import { MarchDay } from "@/components/about/march-day";
import { Faq } from "@/components/about/faq";
import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "Why We March — Sansad Chalo · 20 July",
  description:
    "The receipts: paper leaks, denials, a hunger strike, and a barricade. Read why students are marching to Parliament on 20 July and what we demand.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <AboutHero />
      <Ticker />
      <Receipts />
      <MarchDay />
      <Faq />
      <AboutCta />
    </div>
  );
}
