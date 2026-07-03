"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Mail } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "chat">("form");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("chatSessionId");
    if (savedSession) {
      setSessionId(parseInt(savedSession));
      setStep("chat");
    }
  }, []);

  const fetchMessages = async (sid: number) => {
    try {
      const res = await fetch(`/api/chat?sessionId=${sid}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (sessionId && isOpen) {
      fetchMessages(sessionId);
      const interval = setInterval(() => fetchMessages(sessionId), 3000);
      return () => clearInterval(interval);
    }
  }, [sessionId, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.sessionId);
        localStorage.setItem("chatSessionId", data.sessionId.toString());
        setStep("chat");
        fetchMessages(data.sessionId);
      }
    } catch (err) {}
    setLoading(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !sessionId) return;

    const msg = reply;
    setReply("");
    
    // Optimistic update
    setMessages([...messages, { id: Date.now(), senderRole: "student", message: msg, createdAt: new Date() }]);

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: msg }),
      });
      fetchMessages(sessionId);
    } catch (err) {}
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-italy-green to-emerald-600 text-white shadow-2xl shadow-emerald-500/30 flex items-center justify-center cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && <span className="absolute inset-0 rounded-full bg-italy-green animate-pulse-ring" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-italy-green to-emerald-600 px-5 py-4 shrink-0">
              <h3 className="text-white font-semibold text-sm">Live Support</h3>
              <p className="text-emerald-100 text-xs mt-0.5">We reply instantly</p>
            </div>

            {/* Body */}
            {step === "form" ? (
              <div className="p-5 flex-1 overflow-y-auto flex flex-col justify-center">
                <form onSubmit={handleStartSession} className="space-y-4">
                  <p className="text-sm text-slate-600 mb-2 text-center">Please enter your details to start chatting.</p>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                      <User className="w-3.5 h-3.5" /> Name
                    </label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="your@email.com" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-2.5 bg-gradient-to-r from-italy-green to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 flex items-center justify-center mt-2">
                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Start Chat"}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-slate-50/50">
                  {messages.map((m) => {
                    const isStudent = m.senderRole === "student";
                    return (
                      <div key={m.id} className={`flex flex-col ${isStudent ? "items-end" : "items-start"}`}>
                        {!isStudent && <div className="text-[10px] text-slate-400 mb-1 uppercase font-semibold ml-1 flex items-center gap-1">{m.senderRole === 'bot' ? '🤖 Agent' : '👨‍🏫 Admin'}</div>}
                        <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm shadow-sm ${isStudent ? "bg-italy-green text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"}`}>
                          {m.message}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green text-sm" placeholder="Type a message..." />
                    <button type="submit" disabled={!reply.trim()} className="p-2 bg-italy-green text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
