import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const studentId = cookieStore.get("student_token")?.value;

    if (!studentId) {
      return NextResponse.json({ student: null });
    }

    const [student] = await db.select({
      id: students.id,
      name: students.name,
      email: students.email,
    }).from(students).where(eq(students.id, parseInt(studentId)));

    if (!student) {
      return NextResponse.json({ student: null });
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json({ student: null });
  }
}
