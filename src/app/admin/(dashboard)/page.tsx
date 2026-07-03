import { db } from "@/db";
import { chatSessions } from "@/db/schema";
import { count } from "drizzle-orm";
import { MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const sessionsCount = await db.select({ value: count() }).from(chatSessions);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-italy-green">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Chat Sessions</p>
            <p className="text-2xl font-bold text-slate-800">{sessionsCount[0].value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
