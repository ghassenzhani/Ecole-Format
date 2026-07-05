import { NextResponse } from "next/server";
import { db } from "@/db";
import { courseWaitlists, courses, students } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentId = parseInt(token);
    const { courseId, mode } = await req.json();

    const studentRecord = await db.select().from(students).where(eq(students.id, studentId)).limit(1);
    const courseRecord = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (!courseRecord.length) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const existing = await db.select().from(courseWaitlists).where(and(eq(courseWaitlists.studentId, studentId), eq(courseWaitlists.courseId, courseId))).limit(1);
    if (existing.length) {
      return NextResponse.json({ error: "Already on the waitlist for this course" }, { status: 400 });
    }

    await db.insert(courseWaitlists).values({ studentId, courseId, mode });

    if (studentRecord.length > 0) {
      await sendEmail(studentRecord[0].email, "Waitlist Confirmed", `Ciao ${studentRecord[0].name},\n\nYou have been successfully added to the waitlist for ${courseRecord[0].title}. We will contact you immediately if a spot opens up!\n\nThe Format Team`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
