"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { addFaq, deleteFaq } from "./actions";

export default function FaqClient({ initialFaqs }: { initialFaqs: any[] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addFaq(question, answer);
    setQuestion("");
    setAnswer("");
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Add New FAQ</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Question</label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green outline-none"
              placeholder="e.g. What are the tuition fees?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Answer</label>
            <textarea
              required
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green outline-none resize-none"
              placeholder="The tuition fees are..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-italy-green text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            {loading ? "Adding..." : "Add FAQ"}
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {initialFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-500">
            No FAQs added yet.
          </div>
        ) : (
          initialFaqs.map((faq) => (
            <div key={faq.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Q: {faq.question}</h3>
                <p className="text-slate-600 text-sm whitespace-pre-wrap">A: {faq.answer}</p>
              </div>
              <button
                onClick={() => deleteFaq(faq.id)}
                className="text-red-400 hover:text-red-600 p-2 h-fit rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
