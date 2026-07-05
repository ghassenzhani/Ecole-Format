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

    // 2. Check for redirect intent
    const msgWords = message.toLowerCase().replace(/[^\w\s]/gi, '');
    const courseKeywords = ['course', 'courses', 'cours', 'corsi', 'program', 'programs'];
    const wantsCourses = courseKeywords.some(keyword => msgWords.includes(keyword));
    const wantsCeli = msgWords.includes('celi') || msgWords.includes('exam') || msgWords.includes('test');
    const wantsOpenCourses = (msgWords.includes('open') || msgWords.includes('available')) && wantsCourses;

    let matchedAnswer = null;

    if (wantsOpenCourses) {
      const { courses } = await import("@/db/schema");
      const openCourses = await db.select().from(courses).where(eq(courses.isOpen, 1));
      if (openCourses.length > 0) {
        matchedAnswer = `Yes! We currently have ${openCourses.length} open courses: ` + openCourses.map(c => c.title).join(", ") + ". You can enroll on the courses page!";
      } else {
        matchedAnswer = "Currently, all our courses are full. You can join the waitlist on the courses page!";
      }
    } else if (wantsCeli) {
      const { celiTests } = await import("@/db/schema");
      const tests = await db.select().from(celiTests).where(eq(celiTests.isOpen, 1));
      if (tests.length > 0) {
        matchedAnswer = `The next open CELI exam is scheduled for: ${tests[0].date}. You can inscribe via the courses page!`;
      } else {
        matchedAnswer = "There are currently no open CELI exams. Please check back later!";
      }
    } else if (wantsCourses) {
      matchedAnswer = '__REDIRECT__/courses';
    } else {
      // 3. Check for FAQ match
      const faqs = await db.select().from(botFaq);
      for (const faq of faqs) {
        const qWords = faq.question.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').filter((w: string) => w.length > 3);
        const match = qWords.some((w: string) => msgWords.includes(w));
        if (match && qWords.length > 0) {
          matchedAnswer = faq.answer;
          break;
        }
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
