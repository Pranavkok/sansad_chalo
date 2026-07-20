import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || !user.supporterNumber) {
    return {
      title: "User Not Found",
    }
  }

  const formattedNumber = String(user.supporterNumber).padStart(6, '0');
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const imageUrl = `${baseUrl}/api/card/${id}`;
  const title = `Supporter #${formattedNumber} | Sansad Chalo`;
  const description = `The youth of India is united. Stand with us for the peaceful #SansadChalo march.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Supporter #${formattedNumber} Card`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || !user.supporterNumber) {
    notFound();
  }

  const formattedNumber = String(user.supporterNumber).padStart(6, '0');
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Supporter #{formattedNumber}</h1>
        <p className="text-xl text-muted-foreground">{user.name} stands with the movement.</p>
      </div>

      <Card className="w-full max-w-2xl mx-auto mb-12">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl">{user.name}</CardTitle>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
              <Badge variant="secondary" className="font-mono text-sm">
                #{formattedNumber}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Joined {joinedDate}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4 pt-4 border-t text-center">
             <div className="aspect-[1200/630] w-full rounded-xl overflow-hidden border shadow-sm bg-muted relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`/api/card/${user.id}`} 
                  alt={`${user.name}'s Supporter Card`} 
                  className="w-full h-full object-cover"
                />
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
