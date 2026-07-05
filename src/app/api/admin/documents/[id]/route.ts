import { NextResponse } from "next/server";
import { db } from "@/db";
import { studentDocuments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === 'authenticated';
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const resolvedParams = await params;
    const documentId = parseInt(resolvedParams.id);
    const { status } = await req.json();

    await db.update(studentDocuments)
      .set({ status })
      .where(eq(studentDocuments.id, documentId));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 });
  }
}
