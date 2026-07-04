import { NextResponse } from "next/server";
import { db } from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user exists
    const existing = await db.select().from(students).where(eq(students.email, email));
    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = hashPassword(password);

    const [newStudent] = await db.insert(students).values({
      name,
      email,
      passwordHash,
    }).returning();

    // Set cookie
    const response = NextResponse.json({ success: true, student: { id: newStudent.id, name: newStudent.name, email: newStudent.email } });
    
    // In a real app we'd sign a JWT. Here we just store the ID securely (showcase app)
    response.cookies.set("student_token", newStudent.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
