import { NextResponse } from 'next/server';
import { db } from '@/db';
import { chatMessages, chatSessions, botFaq } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) return NextResponse.json([]);

  const msgs = await db.select().from(chatMessages)
    .where(eq(chatMessages.sessionId, parseInt(sessionId)))
    .orderBy(asc(chatMessages.createdAt));
    
  return NextResponse.json(msgs);
}

export async function POST(request: Request) {
  try {
    const { sessionId, message } = await request.json();

    // 1. Insert student message
    await db.insert(chatMessages).values({
      sessionId,
      senderRole: 'student',
      message
    });

    await db.update(chatSessions).set({ updatedAt: new Date() }).where(eq(chatSessions.id, sessionId));

    // 2. Check for FAQ match
    const faqs = await db.select().from(botFaq);
    let matchedAnswer = null;

    const msgWords = message.toLowerCase().replace(/[^\w\s]/gi, '');
    for (const faq of faqs) {
      const qWords = faq.question.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').filter((w: string) => w.length > 3);
      const match = qWords.some((w: string) => msgWords.includes(w));
      if (match && qWords.length > 0) {
        matchedAnswer = faq.answer;
        break;
      }
    }

    // 3. If matched, send bot reply
    if (matchedAnswer) {
      await db.insert(chatMessages).values({
        sessionId,
        senderRole: 'bot',
        message: matchedAnswer
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
