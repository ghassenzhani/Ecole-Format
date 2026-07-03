"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Mail, HelpCircle } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "chat">("form");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<{ id: number; question: string }[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("chatSessionId");
    if (savedSession) {
      setSessionId(parseInt(savedSession));
      setStep("chat");
    }
    
    // Fetch FAQs
    fetch("/api/chat/faq").then(res => res.json()).then(data => {
      if (Array.isArray(data)) setFaqs(data);
    }).catch(() => {});
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

  const sendSpecificMessage = async (msgText: string) => {
    if (!msgText.trim() || !sessionId) return;
    
    // Optimistic update
    setMessages([...messages, { id: Date.now(), senderRole: "student", message: msgText, createdAt: new Date() }]);

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: msgText }),
      });
      fetchMessages(sessionId);
    } catch (err) {}
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = reply;
    setReply("");
    sendSpecificMessage(msg);
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
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[550px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-italy-green to-emerald-600 px-5 py-4 shrink-0 shadow-sm z-10">
              <h3 className="text-white font-semibold text-sm">Live Support</h3>
              <p className="text-emerald-100 text-xs mt-0.5">We reply instantly</p>
            </div>

            {/* Body */}
            {step === "form" ? (
              <div className="p-5 flex-1 overflow-y-auto flex flex-col justify-center bg-slate-50">
                <form onSubmit={handleStartSession} className="space-y-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
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
                <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50 flex flex-col">
                  {messages.map((m) => {
                    const isStudent = m.senderRole === "student";
                    
                    // Handle special redirect command from bot
                    if (m.message.startsWith('__REDIRECT__/')) {
                      const redirectUrl = m.message.replace('__REDIRECT__', '');
                      return (
                        <div key={m.id} className="flex flex-col items-start w-full">
                          <div className="text-[10px] text-slate-400 mb-1 uppercase font-semibold ml-1 flex items-center gap-1">🤖 Agent</div>
                          <div className="px-4 py-3 rounded-2xl max-w-[85%] text-sm shadow-sm bg-white border border-slate-200 text-slate-700 rounded-tl-sm w-full">
                            <p className="mb-3 font-medium">Here are our available courses! Let me take you there.</p>
                            <button onClick={() => { setIsOpen(false); router.push(redirectUrl); }} className="w-full py-2 bg-italy-green text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs font-bold">
                              Click here to view Courses
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={m.id} className={`flex flex-col ${isStudent ? "items-end" : "items-start"}`}>
                        {!isStudent && <div className="text-[10px] text-slate-400 mb-1 uppercase font-semibold ml-1 flex items-center gap-1">{m.senderRole === 'bot' ? '🤖 Agent' : '👨‍🏫 Admin'}</div>}
                        <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm shadow-sm ${isStudent ? "bg-italy-green text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm leading-relaxed"}`}>
                          {m.message}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Suggested Questions */}
                {faqs.length > 0 && (
                  <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto scrollbar-hide">
                    {faqs.map(faq => (
                      <button
                        key={faq.id}
                        onClick={() => sendSpecificMessage(faq.question)}
                        className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5 flex-shrink-0"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        {faq.question}
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                  <form onSubmit={handleSendMessage} className="flex gap-2 relative">
                    <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} className="flex-1 pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green text-sm transition-all" placeholder="Type a message..." />
                    <button type="submit" disabled={!reply.trim()} className="absolute right-1.5 top-1.5 p-1.5 bg-italy-green text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50">
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
