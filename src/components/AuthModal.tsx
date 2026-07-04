"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, setStudent } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isLoginMode ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Authentication failed");
      } else {
        setStudent(data.student);
        closeAuthModal();
      }
    } catch (err) {
      setError("An error occurred");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
          >
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">
                  {isLoginMode ? "Welcome Back" : "Create Account"}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Log in to chat with our agents and save your history
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                      <User className="w-3.5 h-3.5" /> Name
                    </label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="John Doe" />
                  </div>
                )}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
                    <Lock className="w-3.5 h-3.5" /> Password
                  </label>
                  <input type="password" required minLength={6} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-italy-green/20 focus:border-italy-green transition-all" placeholder="••••••••" />
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-italy-green to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 flex items-center justify-center mt-2">
                  {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (isLoginMode ? "Login" : "Register")}
                </button>

                <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="w-full text-sm text-slate-500 hover:text-italy-green transition-colors mt-4">
                  {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
