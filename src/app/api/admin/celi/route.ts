import { NextResponse } from "next/server";
import { db } from "@/db";
import { celiTests, celiEnrollments } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import * as jwt from "jose";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === 'authenticated';
}

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const tests = await db.select().from(celiTests).orderBy(celiTests.id);
    
    const testsWithCounts = await Promise.all(tests.map(async (t) => {
      const enrolls = await db.select({ count: sql<number>`count(*)` })
        .from(celiEnrollments)
        .where(eq(celiEnrollments.testId, t.id));
        
      return { ...t, currentEnrollments: enrolls[0].count };
    }));

    return NextResponse.json(testsWithCounts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { action, id, date, isOpen } = await req.json();
    
    if (action === "update") {
      await db.update(celiTests).set({ isOpen }).where(eq(celiTests.id, id));
    } else if (action === "create") {
      await db.insert(celiTests).values({ date, isOpen: 1 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
