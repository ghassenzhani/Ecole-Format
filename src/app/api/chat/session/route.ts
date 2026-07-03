import { NextResponse } from 'next/server';
import { db } from '@/db';
import { chatSessions, chatMessages } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    
    // Create new session
    const [session] = await db.insert(chatSessions).values({
      studentName: name,
      studentEmail: email,
    }).returning();

    // Insert welcome message
    await db.insert(chatMessages).values({
      sessionId: session.id,
      senderRole: 'bot',
      message: `Hi ${name}! How can we help you today?`
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
