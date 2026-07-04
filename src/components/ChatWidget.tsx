"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Mail, HelpCircle, Lock, Phone } from "lucide-react";
import { useTranslation } from "@/lib/i18nContext";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"auth" | "chat">("auth");
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [student, setStudent] = useState<any>(null);
  
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<{ id: number; question: string }[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  
  const { t } = useTranslation();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.student) {
          setStudent(data.student);
          checkExistingSession(data.student.email, data.student.name);
        }
      })
      .catch(() => {});

    // Fetch FAQs
    fetch("/api/chat/faq").then(res => res.json()).then(data => {
      if (Array.isArray(data)) setFaqs(data);
    }).catch(() => {});
  }, []);

  const checkExistingSession = async (email: string, name: string) => {
    try {
      const res = await fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.sessionId);
        setStep("chat");
        fetchMessages(data.sessionId);
      }
    } catch (err) {}
  };

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    
    const endpoint = isLoginMode ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Authentication failed");
      } else {
        setStudent(data.student);
        await checkExistingSession(data.student.email, data.student.name);
      }
    } catch (err) {
      setAuthError("An error occurred");
    }
    setLoading(false);
  };

  const sendSpecificMessage = async (msgText: string) => {
    if (!msgText.trim() || !sessionId) return;
    
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

  const unreadCount = messages.filter(m => m.senderRole !== 'student' && new Date(m.createdAt) > new Date(Date.now() - 60000)).length;

  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/21627477123"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[96px] right-6 z-40 px-4 h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center gap-2 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group"
      >
        <Phone className="w-5 h-5 fill-current group-hover:rotate-12 transition-transform" />
        <span className="font-semibold text-sm hidden sm:block">WhatsApp</span>
      </motion.a>

      {/* Main Chat Trigger */}
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
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
              <MessageCircle className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
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
            <div className="bg-gradient-to-r from-italy-green to-emerald-600 px-5 py-4 shrink-0 shadow-sm z-10 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold text-sm">{t("chat.liveSupport")}</h3>
                <p className="text-emerald-100 text-xs mt-0.5">{student ? `Welcome, ${student.name}` : t("chat.replyInstantly")}</p>
              </div>
            </div>

            {/* Body */}
            {step === "auth" ? (
              <div className="p-5 flex-1 overflow-y-auto flex flex-col justify-center bg-slate-50">
                <form onSubmit={handleAuth} className="space-y-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-slate-800">{isLoginMode ? "Welcome Back" : "Create Account"}</h4>
                    <p className="text-xs text-slate-500 mt-1">To save your chat history</p>
                  </div>
                  
                  {authError && <div className="p-2 bg-red-50 text-red-600 text-xs rounded-lg text-center">{authError}</div>}
                  
                  {!isLoginMode && (
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                        <User className="w-3.5 h-3.5" /> Name
                      </label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="John Doe" />
                    </div>
                  )}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                      <Lock className="w-3.5 h-3.5" /> Password
                    </label>
                    <input type="password" required minLength={6} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="••••••••" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full py-2.5 bg-gradient-to-r from-italy-green to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 flex items-center justify-center mt-2">
                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (isLoginMode ? "Login" : "Register")}
                  </button>
                  
                  <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="w-full text-xs text-slate-500 hover:text-italy-green transition-colors mt-2">
                    {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50 flex flex-col">
                  {messages.length === 0 && (
                    <div className="text-center text-sm text-slate-400 my-4">No messages yet. Send a message to start!</div>
                  )}
                  {messages.map((m) => {
                    const isStudent = m.senderRole === "student";
                    
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
                    <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} className="flex-1 pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green text-sm transition-all" placeholder={t("chat.typeMessage")} />
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
