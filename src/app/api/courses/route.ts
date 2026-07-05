import { NextResponse } from "next/server";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allCourses = await db.select().from(courses).orderBy(courses.title);
    return NextResponse.json(allCourses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
