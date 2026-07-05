import { NextResponse } from "next/server";
import { db } from "@/db";
import { celiTests, celiEnrollments } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";
import * as jwt from "jose";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentId = parseInt(token);

    const { testId } = await req.json();

    if (!testId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if open
    const testRecord = await db.select().from(celiTests).where(eq(celiTests.id, testId)).limit(1);
    if (!testRecord.length || testRecord[0].isOpen === 0) {
      return NextResponse.json({ error: "Inscription for this test is closed" }, { status: 400 });
    }

    // Check if already inscribed
    const existing = await db.select().from(celiEnrollments).where(and(
      eq(celiEnrollments.studentId, studentId),
      eq(celiEnrollments.testId, testId)
    )).limit(1);

    if (existing.length) {
      return NextResponse.json({ error: "Already inscribed for this test" }, { status: 400 });
    }

    // Insert
    await db.insert(celiEnrollments).values({
      studentId,
      testId,
      status: "enrolled"
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Inscription failed" }, { status: 500 });
  }
}
