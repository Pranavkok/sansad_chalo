import { PrismaClient } from '@prisma/client';
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const tables = ['User', 'Account', 'Session', 'VerificationToken', 'Authenticator'];
    for (const table of tables) {
      console.log(`Unlocking ${table} table if it exists...`);
      try { 
        await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" SET (schema_locked = false);`); 
        console.log(`${table} unlocked.`);
      } catch (e) {
        console.log(`Skipped ${table} (may not exist yet).`);
      }
    }
  } catch (error) {
    console.error("Error unlocking tables:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
