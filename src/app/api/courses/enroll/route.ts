import { NextResponse } from "next/server";
import { db } from "@/db";
import { courseEnrollments, courses, students } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentId = parseInt(token);
    const { courseId, mode } = await req.json();

    if (!courseId || !mode) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const studentRecord = await db.select().from(students).where(eq(students.id, studentId)).limit(1);

    const courseRecord = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (!courseRecord.length || courseRecord[0].isOpen === 0) {
      return NextResponse.json({ error: "Course is not available for enrollment" }, { status: 400 });
    }

    const course = courseRecord[0];

    const existing = await db.select().from(courseEnrollments).where(and(
      eq(courseEnrollments.studentId, studentId),
      eq(courseEnrollments.courseId, courseId)
    )).limit(1);

    if (existing.length) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 });
    }

    const currentEnrollments = await db.select({
      count: sql<number>`count(*)`
    }).from(courseEnrollments).where(and(
      eq(courseEnrollments.courseId, courseId),
      eq(courseEnrollments.mode, mode)
    ));

    const currentCount = currentEnrollments[0].count;
    const maxCapacity = mode === 'online' ? course.maxOnline : course.maxInPerson;

    if (currentCount >= maxCapacity) {
      return NextResponse.json({ error: `The ${mode} session is full` }, { status: 400 });
    }

    await db.insert(courseEnrollments).values({
      studentId,
      courseId,
      mode,
      status: "enrolled"
    });

    const otherMode = mode === 'online' ? 'in-person' : 'online';
    const otherEnrollments = await db.select({
      count: sql<number>`count(*)`
    }).from(courseEnrollments).where(and(
      eq(courseEnrollments.courseId, courseId),
      eq(courseEnrollments.mode, otherMode)
    ));
    const otherCount = otherEnrollments[0].count;
    const otherMax = mode === 'online' ? course.maxInPerson : course.maxOnline;

    if ((currentCount + 1) >= maxCapacity && otherCount >= otherMax) {
      await db.update(courses).set({ isOpen: 0 }).where(eq(courses.id, courseId));
    }

    if (studentRecord.length > 0) {
      await sendEmail(studentRecord[0].email, "Enrollment Confirmation", `Ciao ${studentRecord[0].name},\n\nYou have successfully enrolled in ${course.title} (${mode}). We look forward to seeing you in class!\n\nThe Format Team`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
  }
}
