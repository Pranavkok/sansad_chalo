"use client";

import { toast } from "sonner";
import { Copy, Download, MessageCircle, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Share rail for the dashboard. WhatsApp first — that's where Indian
 * protest content actually travels — then X, native share, copy, download.
 */
export function ShareButtons({ user }: { user: any }) {
  const router = useRouter();

  const formattedNumber = String(user.supporterNumber).padStart(6, "0");
  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/user/${user.id}` : "";
  const shareText = `I'm Supporter #${formattedNumber} of the Sansad Chalo march. Our exams were sold — on 20 July we demand answers at Parliament. Claim your own numbered card:`;

  const countShare = async () => {
    // Fire-and-forget: never block the share sheet on our own API.
    fetch("/api/user/share", { method: "POST" })
      .then(() => router.refresh())
      .catch(() => {});
  };

  const share = (platform: "whatsapp" | "twitter" | "native" | "copy") => {
    countShare();

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "native":
        if (navigator.share) {
          navigator
            .share({ title: "Sansad Chalo — 20 July", text: shareText, url: shareUrl })
            .catch(() => {});
        } else {
          navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
          toast.success("Copied — paste it anywhere");
        }
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied. Now go make noise.");
        break;
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/api/card/${user.id}`;
    link.download = `sansad_chalo_${formattedNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Card downloading — post it everywhere ✊");
  };

  const base =
    "inline-flex w-full items-center justify-center gap-2 border-2 px-4 py-3.5 font-display text-base tracking-wide uppercase transition-colors";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <button
        onClick={handleDownload}
        className={`${base} btn-riot border-foreground bg-acid text-background`}
      >
        <Download className="size-5" />
        Download card
      </button>
      <button
        onClick={() => share("whatsapp")}
        className={`${base} border-foreground/40 hover:border-acid hover:text-acid`}
      >
        <MessageCircle className="size-5" />
        WhatsApp
      </button>
      <button
        onClick={() => share("twitter")}
        className={`${base} border-foreground/40 hover:border-acid hover:text-acid`}
      >
        <Share2 className="size-5" />
        Post on X
      </button>
      <button
        onClick={() => share("copy")}
        className={`${base} border-foreground/40 hover:border-acid hover:text-acid`}
      >
        <Copy className="size-5" />
        Copy link
      </button>
      <button
        onClick={() => share("native")}
        className="font-mono text-xs tracking-widest text-muted-foreground uppercase underline-offset-4 transition-colors hover:text-acid sm:col-span-2 lg:col-span-4"
      >
        More options → open your phone&apos;s share sheet
      </button>
    </div>
  );
}
