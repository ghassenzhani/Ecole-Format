"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User } from "lucide-react";
import { getSessions, getMessages, sendAdminMessage } from "./actions";

export default function ChatClient() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchSessions = async () => {
    const data = await getSessions();
    setSessions(data);
  };

  const fetchMessages = async (sessionId: number) => {
    const data = await getMessages(sessionId);
    setMessages(data);
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000); // poll sessions every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeSession) {
      fetchMessages(activeSession);
      const interval = setInterval(() => fetchMessages(activeSession), 3000); // poll msgs every 3s
      return () => clearInterval(interval);
    }
  }, [activeSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !activeSession) return;
    
    const msg = reply;
    setReply("");
    setMessages([...messages, { id: Date.now(), senderRole: 'admin', message: msg, createdAt: new Date() }]);
    
    await sendAdminMessage(activeSession, msg);
    fetchMessages(activeSession);
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 flex overflow-hidden min-h-[500px]">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-100 font-semibold text-slate-700">Active Sessions</div>
        <div className="flex-1 overflow-y-auto">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSession(s.id)}
              className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${activeSession === s.id ? 'bg-emerald-50 border-l-4 border-l-italy-green' : ''}`}
            >
              <div className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                {s.studentName}
              </div>
              <div className="text-xs text-slate-500 mt-1 truncate">{s.studentEmail}</div>
            </button>
          ))}
          {sessions.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-500">No active chats</div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeSession ? (
          <>
            <div className="p-4 border-b border-slate-100 bg-white font-semibold text-slate-700">
              Chat Thread
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => {
                const isAdminOrBot = m.senderRole === 'admin' || m.senderRole === 'bot';
                return (
                  <div key={m.id} className={`flex flex-col ${isAdminOrBot ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] text-slate-400 mb-1 uppercase font-semibold">{m.senderRole}</div>
                    <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${isAdminOrBot ? 'bg-italy-green text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                      {m.message}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green text-sm"
                  placeholder="Type a reply..."
                />
                <button type="submit" disabled={!reply.trim()} className="p-2 bg-italy-green text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 flex-col gap-3">
            <User className="w-12 h-12 opacity-20" />
            <p>Select a session to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
