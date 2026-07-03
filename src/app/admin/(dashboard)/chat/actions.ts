"use server";
import { db } from "@/db";
import { chatSessions, chatMessages } from "@/db/schema";
import { eq, desc, asc } from "drizzle-orm";

export async function getSessions() {
  return await db.select().from(chatSessions).orderBy(desc(chatSessions.updatedAt));
}

export async function getMessages(sessionId: number) {
  return await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(asc(chatMessages.createdAt));
}

export async function sendAdminMessage(sessionId: number, message: string) {
  await db.insert(chatMessages).values({
    sessionId,
    senderRole: 'admin',
    message,
  });
  await db.update(chatSessions).set({ updatedAt: new Date() }).where(eq(chatSessions.id, sessionId));
}
