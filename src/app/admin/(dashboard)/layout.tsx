"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, MessageSquare, LayoutDashboard, Mail, Users, BookOpen, Award, HelpCircle, Inbox, LogOut, FileText } from 'lucide-react';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/chat", icon: MessageSquare, label: "Live Chat" },
    { href: "/admin/courses", icon: BookOpen, label: "Courses" },
    { href: "/admin/celi", icon: Award, label: "CELI Exams" },
    { href: "/admin/blog", icon: FileText, label: "Blog" },
    { href: "/admin/users", icon: Users, label: "Students" },
    { href: "/admin/contacts", icon: Inbox, label: "Messages" },
    { href: "/admin/faq", icon: HelpCircle, label: "Bot FAQ" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActive 
                    ? "bg-italy-green/10 text-italy-green" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-italy-green"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
