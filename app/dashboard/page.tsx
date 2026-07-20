import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { becomeSupporter } from "@/actions/supporter";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { ShareButtons } from "@/components/dashboard/share-buttons";

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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-8rem)]">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <ProfileCard user={user} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Spread the Word</h2>
        <p className="text-muted-foreground mb-6">
          Share your card to invite others and watch the movement grow.
        </p>
        {/* We can include a preview of the card here as well */}
        <div className="aspect-[1200/630] max-w-2xl mx-auto rounded-xl overflow-hidden border shadow-lg bg-muted relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`/api/card/${user.id}?t=${Date.now()}`} 
            alt="Your Supporter Card Preview" 
            className="w-full h-full object-cover"
          />
        </div>
        <ShareButtons user={user} />
      </div>
    </div>
  );
}
