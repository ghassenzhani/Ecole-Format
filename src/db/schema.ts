import { pgTable, serial, text, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  studentEmail: varchar("student_email", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("open").notNull(), // 'open' | 'closed'
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => chatSessions.id, { onDelete: "cascade" }).notNull(),
  senderRole: varchar("sender_role", { length: 50 }).notNull(), // 'student' | 'admin' | 'bot'
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const botFaq = pgTable("bot_faq", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
