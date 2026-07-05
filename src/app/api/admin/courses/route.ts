import { NextResponse } from "next/server";
import { db } from "@/db";
import { courses, courseEnrollments } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import * as jwt from "jose";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    await jwt.jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Get all courses with their current enrollments count
    const allCourses = await db.select().from(courses).orderBy(courses.title);
    
    const coursesWithCounts = await Promise.all(allCourses.map(async (c) => {
      const inPersonCount = await db.select({ count: sql<number>`count(*)` })
        .from(courseEnrollments)
        .where(sql`${courseEnrollments.courseId} = ${c.id} AND ${courseEnrollments.mode} = 'in-person'`);
        
      const onlineCount = await db.select({ count: sql<number>`count(*)` })
        .from(courseEnrollments)
        .where(sql`${courseEnrollments.courseId} = ${c.id} AND ${courseEnrollments.mode} = 'online'`);

      return {
        ...c,
        currentInPerson: inPersonCount[0].count,
        currentOnline: onlineCount[0].count
      };
    }));

    return NextResponse.json(coursesWithCounts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, maxInPerson, maxOnline, isOpen } = await req.json();
    
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await db.update(courses)
      .set({ maxInPerson, maxOnline, isOpen })
      .where(eq(courses.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
