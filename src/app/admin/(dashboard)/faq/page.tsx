import { db } from "@/db";
import { botFaq } from "@/db/schema";
import { desc } from "drizzle-orm";
import FaqClient from "./FaqClient";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await db.select().from(botFaq).orderBy(desc(botFaq.createdAt));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Bot FAQ Management</h1>
      <p className="text-slate-600 mb-8">
        Add predefined questions and answers here. If a student asks a question that matches one of these, the bot will automatically reply!
      </p>
      
      <FaqClient initialFaqs={faqs} />
    </div>
  );
}
