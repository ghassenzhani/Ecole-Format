import { NextResponse } from 'next/server';
import { db } from '@/db';
import { botFaq } from '@/db/schema';

export async function GET() {
  try {
    const faqs = await db.select({
      id: botFaq.id,
      question: botFaq.question,
    }).from(botFaq);
    
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}
