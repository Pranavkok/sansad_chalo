import 'dotenv/config';
import { prisma } from './lib/prisma';
async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found.");
    return;
  }
  console.log(`Fetching card for user: ${user.id}`);
  const response = await fetch(`http://localhost:3000/api/card/${user.id}`);
  console.log(`Status: ${response.status}`);
  if (!response.ok) {
    console.log("Error body:", await response.text());
  } else {
    const fs = await import('fs');
    const buffer = await response.arrayBuffer();
    fs.writeFileSync('card.png', Buffer.from(buffer));
    console.log(`Success! Image saved to card.png (${buffer.byteLength} bytes).`);
  }
}

main().catch(console.error);
