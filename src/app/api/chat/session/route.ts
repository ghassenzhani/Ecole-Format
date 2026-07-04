import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { chatSessions, chatMessages, students } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    const cookieStore = await cookies();
    const studentIdStr = cookieStore.get("student_token")?.value;
    const studentId = studentIdStr ? parseInt(studentIdStr) : null;
    
    // Check for existing open session
    const existingSessions = await db.select().from(chatSessions)
      .where(eq(chatSessions.studentEmail, email));
      
    if (existingSessions.length > 0) {
      // Return the most recent session (assuming they are ordered by id ascending in Postgres default, let's just pick the last one)
      const latest = existingSessions[existingSessions.length - 1];
      
      // Update studentId if it was previously null and now we have one
      if (!latest.studentId && studentId) {
        await db.update(chatSessions).set({ studentId }).where(eq(chatSessions.id, latest.id));
      }
      
      return NextResponse.json({ sessionId: latest.id });
    }
    
    // Create new session
    const [session] = await db.insert(chatSessions).values({
      studentId: studentId,
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
