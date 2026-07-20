import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        shareCount: { increment: 1 },
        lastSharedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error incrementing share count:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
