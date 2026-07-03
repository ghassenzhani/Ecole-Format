"use server";
import { db } from "@/db";
import { botFaq } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addFaq(question: string, answer: string) {
  await db.insert(botFaq).values({ question, answer });
  revalidatePath("/admin/faq");
}

export async function deleteFaq(id: number) {
  await db.delete(botFaq).where(eq(botFaq.id, id));
  revalidatePath("/admin/faq");
}
