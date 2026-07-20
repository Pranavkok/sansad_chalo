import { prisma } from './lib/prisma';

async function main() {
  try {
    console.log("Testing DB connection...");
    const count = await prisma.user.count();
    console.log("Success! User count:", count);
  } catch (error) {
    console.error("DB Connection Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
