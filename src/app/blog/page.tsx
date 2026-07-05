"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">Latest News & Articles</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Stay up to date with the latest from Format, tips on studying in Italy, and important visa deadlines.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-italy-green" /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-slate-500 bg-white rounded-3xl shadow-sm border border-slate-100">
              No articles published yet. Check back soon!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all">
                  {post.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-italy-green transition-colors">{post.title}</h2>
                    <p className="text-slate-600 line-clamp-3 mb-6">
                      {post.content.replace(/[#_*\[\]]/g, '').substring(0, 150)}...
                    </p>
                    <span className="inline-flex items-center gap-2 text-italy-green font-bold text-sm">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
