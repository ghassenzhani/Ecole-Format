import { NextResponse } from "next/server";
import { db } from "@/db";
import { students, courseEnrollments, courses, celiEnrollments, celiTests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import * as jwt from "jose";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwt.jwtVerify(token, secret);
    const studentId = payload.id as number;

    const studentRecord = await db.select().from(students).where(eq(students.id, studentId)).limit(1);
    
    if (!studentRecord.length) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const studentInfo = studentRecord[0];

    const cEnrollments = await db.select({
      id: courseEnrollments.id,
      courseId: courseEnrollments.courseId,
      mode: courseEnrollments.mode,
      status: courseEnrollments.status,
      title: courses.title,
      level: courses.level
    })
    .from(courseEnrollments)
    .innerJoin(courses, eq(courseEnrollments.courseId, courses.id))
    .where(eq(courseEnrollments.studentId, studentId));

    const tEnrollments = await db.select({
      id: celiEnrollments.id,
      testId: celiEnrollments.testId,
      status: celiEnrollments.status,
      date: celiTests.date
    })
    .from(celiEnrollments)
    .innerJoin(celiTests, eq(celiEnrollments.testId, celiTests.id))
    .where(eq(celiEnrollments.studentId, studentId));

    return NextResponse.json({
      student: {
        id: studentInfo.id,
        name: studentInfo.name,
        email: studentInfo.email,
        phone: studentInfo.phone,
      },
      courses: cEnrollments,
      celiTests: tEnrollments
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
