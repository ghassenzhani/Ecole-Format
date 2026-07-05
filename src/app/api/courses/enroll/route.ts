import { NextResponse } from "next/server";
import { db } from "@/db";
import { courses, courseEnrollments } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import * as jwt from "jose";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwt.jwtVerify(token, secret);
    const studentId = payload.id as number;

    const { courseId, mode } = await req.json();

    if (!courseId || !mode) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if course is open
    const courseRecord = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (!courseRecord.length || courseRecord[0].isOpen === 0) {
      return NextResponse.json({ error: "Course is not available for enrollment" }, { status: 400 });
    }

    const course = courseRecord[0];

    // Check if already enrolled
    const existing = await db.select().from(courseEnrollments).where(and(
      eq(courseEnrollments.studentId, studentId),
      eq(courseEnrollments.courseId, courseId)
    )).limit(1);

    if (existing.length) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 });
    }

    // Check capacity
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

    // Insert enrollment
    await db.insert(courseEnrollments).values({
      studentId,
      courseId,
      mode,
      status: "enrolled"
    });

    // Auto-close check (optional, but requested: "when the number hits the limit the course it close by it self")
    // If BOTH in-person and online are full, close the course.
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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
  }
}
