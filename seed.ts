import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

dotenv.config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  level: varchar("level", { length: 50 }).notNull(),
  maxInPerson: integer("max_in_person").default(50).notNull(),
  maxOnline: integer("max_online").default(50).notNull(),
  isOpen: integer("is_open").default(1).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

async function main() {
  console.log("Seeding courses...");

  const defaultCourses = [
    { title: "Italian Beginner A1", level: "A1", maxInPerson: 50, maxOnline: 50, isOpen: 1 },
    { title: "Italian Elementary A2", level: "A2", maxInPerson: 50, maxOnline: 50, isOpen: 1 },
    { title: "Italian Intermediate B1", level: "B1", maxInPerson: 50, maxOnline: 50, isOpen: 1 },
    { title: "Italian Upper Intermediate B2", level: "B2", maxInPerson: 50, maxOnline: 50, isOpen: 1 },
  ];

  for (const course of defaultCourses) {
    await db.insert(courses).values(course);
  }

  console.log("Seeding completed.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
