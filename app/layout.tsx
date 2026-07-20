import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sansad Chalo — 20 July | Claim Your Protest Card",
  description:
    "Our exams were sold. Our futures gambled. Join the Sansad Chalo march on 20 July, claim your numbered protest card, and flood every feed until the Education Minister resigns.",
  keywords: [
    "Sansad Chalo",
    "protest",
    "NEET",
    "exam irregularities",
    "student movement",
    "20 July",
  ],
  openGraph: {
    title: "Sansad Chalo — 20 July",
    description:
      "Our exams were sold. Our futures gambled. Claim your numbered protest card and make it impossible to ignore us.",
    siteName: "Sansad Chalo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sansad Chalo — 20 July",
    description:
      "Our exams were sold. Our futures gambled. Claim your numbered protest card and make it impossible to ignore us.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${anton.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
