import Link from 'next/link';
import { Settings, MessageSquare, LayoutDashboard } from 'lucide-react';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-italy-green rounded-xl transition-colors font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/chat" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-italy-green rounded-xl transition-colors font-medium">
            <MessageSquare className="w-5 h-5" />
            Live Chat
          </Link>
          <Link href="/admin/faq" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-italy-green rounded-xl transition-colors font-medium">
            <Settings className="w-5 h-5" />
            Bot FAQ
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
