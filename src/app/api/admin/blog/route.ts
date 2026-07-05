import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { cookies } from "next/headers";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === 'authenticated';
}

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, slug, content, imageUrl, isPublished } = await req.json();
    
    // Check slug uniqueness
    const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (existing.length) return NextResponse.json({ error: "Slug already exists" }, { status: 400 });

    await db.insert(blogPosts).values({
      title, slug, content, imageUrl, isPublished
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
