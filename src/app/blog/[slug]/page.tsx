import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const postResult = await db.select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, resolvedParams.slug))
    .limit(1);

  if (!postResult.length) return notFound();

  const post = postResult[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-italy-green transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-center gap-2 text-slate-500">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </header>

          {post.imageUrl && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-italy-green">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
