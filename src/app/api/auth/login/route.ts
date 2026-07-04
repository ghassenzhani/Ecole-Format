import { NextResponse } from "next/server";
import { db } from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const verifyPassword = (password: string, storedHash: string) => {
  const [salt, key] = storedHash.split(":");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return key === hash;
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [student] = await db.select().from(students).where(eq(students.email, email));

    if (!student || !verifyPassword(password, student.passwordHash)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, student: { id: student.id, name: student.name, email: student.email } });
    
    response.cookies.set("student_token", student.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
