"use client";

import { Button } from "@/components/ui/button";
import { incrementShareCount } from "@/actions/supporter";
import { toast } from "sonner";
import { Download, Link as LinkIcon, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ShareButtons({ user }: { user: any }) {
  const router = useRouter();
  
  const formattedNumber = String(user.supporterNumber).padStart(6, '0');
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/user/${user.id}` : "";
  const shareText = `I just joined the movement as Supporter #${formattedNumber}! Stand together and share your voice.`;

  const handleShare = async (platform: string) => {
    // Increment share count via API instead of Server Action
    await fetch("/api/user/share", { method: "POST" });
    router.refresh();

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
      return;
    }

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
      toast.success("Shared on X!");
      return;
    }

    if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
      toast.success("Shared on LinkedIn!");
      return;
    }
  };

  const handleDownload = () => {
    // We will trigger a download of the generated card
    const link = document.createElement("a");
    link.href = `/api/card/${user.id}`;
    link.download = `supporter_card_${formattedNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloading your card...");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <Button className="w-full" variant="default" onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download Card
      </Button>
      <Button className="w-full" variant="outline" onClick={() => handleShare("twitter")}>
        <Share2 className="mr-2 h-4 w-4" />
        Share on X
      </Button>
      <Button className="w-full" variant="outline" onClick={() => handleShare("linkedin")}>
        <Share2 className="mr-2 h-4 w-4" />
        Share on LinkedIn
      </Button>
      <Button className="w-full" variant="secondary" onClick={() => handleShare("copy")}>
        <LinkIcon className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
}
