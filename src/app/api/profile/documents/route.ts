import { NextResponse } from "next/server";
import { db } from "@/db";
import { studentDocuments, students } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const studentId = parseInt(token);

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // generate unique filename
    const uniqueSuffix = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(file.name);
    const fileName = `${studentId}-${uniqueSuffix}${extension}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    await db.insert(studentDocuments).values({
      studentId,
      fileName: file.name,
      fileUrl,
      status: "pending"
    });

    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("student_token")?.value;
    
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const studentId = parseInt(token);

    const docs = await db.select().from(studentDocuments).where(eq(studentDocuments.studentId, studentId));
    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}
