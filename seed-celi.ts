import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

dotenv.config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const celiTests = pgTable("celi_tests", {
  id: serial("id").primaryKey(),
  date: varchar("date", { length: 255 }).notNull(),
  isOpen: integer("is_open").default(1).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

async function main() {
  console.log("Seeding CELI exam dates...");
  await db.insert(celiTests).values({ date: "2026-11-20", isOpen: 1 });
  console.log("CELI Exam seeded.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
