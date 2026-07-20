"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function becomeSupporter() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to become a supporter.");
  }

  const userId = session.user.id;

  try {
    const updatedUser = await prisma.$transaction(async (tx) => {
      const currentUser = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!currentUser) throw new Error("User not found");
      
      // If already a supporter, return the user
      if (currentUser.supporterNumber !== null) {
        return currentUser;
      }

      // Find the highest current supporter number
      const lastSupporter = await tx.user.findFirst({
        where: { supporterNumber: { not: null } },
        orderBy: { supporterNumber: "desc" },
      });

      const nextNumber = (lastSupporter?.supporterNumber || 0) + 1;

      // Update user with the new number
      const user = await tx.user.update({
        where: { id: userId },
        data: { supporterNumber: nextNumber },
      });

      return user;
    });

    return { success: true, supporterNumber: updatedUser.supporterNumber };
  } catch (error) {
    console.error("Error assigning supporter number:", error);
    return { success: false, error: "Failed to become a supporter" };
  }
}

export async function getSupporterCount() {
  const count = await prisma.user.count({
    where: { supporterNumber: { not: null } },
  });
  return count;
}

export async function incrementShareCount() {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        shareCount: { increment: 1 },
        lastSharedAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error incrementing share count:", error);
    return { success: false };
  }
}
