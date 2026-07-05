import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const posts = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, 1))
      .orderBy(desc(blogPosts.createdAt));
      
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
