"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Loader2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: "", slug: "", content: "", imageUrl: "", isPublished: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = () => {
    fetch("/api/admin/blog")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openNewPostModal = () => {
    setFormData({ id: null, title: "", slug: "", content: "", imageUrl: "", isPublished: 0 });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (formData.id) {
        await fetch(`/api/admin/blog/${formData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to save post");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Blog / CMS</h1>
          <p className="text-slate-500">Manage news, articles, and announcements.</p>
        </div>
        <button onClick={openNewPostModal} className="flex items-center gap-2 bg-italy-green text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors font-semibold">
          <Plus className="w-5 h-5" /> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-slate-500">No blog posts found. Create one!</td></tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">{post.title}</p>
                  <p className="text-xs text-slate-500 font-mono">/{post.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${post.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {post.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => { setFormData(post); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">{formData.id ? "Edit Post" : "Create New Post"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="blog-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1 block">Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1 block">URL Slug</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm">/blog/</span>
                      <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})} className="w-full px-4 py-2 border border-slate-200 rounded-r-xl" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">Cover Image URL</label>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-slate-400" />
                    <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://example.com/image.jpg" className="w-full px-4 py-2 border border-slate-200 rounded-xl" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1 block">Content (Markdown supported)</label>
                  <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl h-64 font-mono text-sm" placeholder="Write your post here..."></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="published" checked={formData.isPublished === 1} onChange={e => setFormData({...formData, isPublished: e.target.checked ? 1 : 0})} className="w-4 h-4 text-italy-green border-slate-300 rounded" />
                  <label htmlFor="published" className="text-sm font-semibold text-slate-700">Publish immediately</label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button type="submit" form="blog-form" disabled={isSubmitting} className="px-5 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 flex items-center gap-2">
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Save Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
