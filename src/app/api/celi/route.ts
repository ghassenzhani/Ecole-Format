import { NextResponse } from "next/server";
import { db } from "@/db";
import { celiTests } from "@/db/schema";

export async function GET() {
  try {
    const tests = await db.select().from(celiTests);
    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch CELI tests" }, { status: 500 });
  }
}
