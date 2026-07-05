import { db } from "@/db";
import { chatSessions, students, courseEnrollments, celiEnrollments, contacts } from "@/db/schema";
import { count } from "drizzle-orm";
import { MessageSquare, Users, BookOpen, Award, Inbox } from "lucide-react";

export default async function AdminDashboard() {
  const [
    sessionsCount, 
    studentsCount, 
    coursesCount, 
    celiCount, 
    contactsCount
  ] = await Promise.all([
    db.select({ value: count() }).from(chatSessions),
    db.select({ value: count() }).from(students),
    db.select({ value: count() }).from(courseEnrollments),
    db.select({ value: count() }).from(celiEnrollments),
    db.select({ value: count() }).from(contacts),
  ]);

  const statCards = [
    {
      title: "Registered Students",
      value: studentsCount[0].value,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Course Enrollments",
      value: coursesCount[0].value,
      icon: BookOpen,
      color: "text-italy-green",
      bg: "bg-emerald-50",
    },
    {
      title: "CELI Inscriptions",
      value: celiCount[0].value,
      icon: Award,
      color: "text-italy-red",
      bg: "bg-red-50",
    },
    {
      title: "Total Chat Sessions",
      value: sessionsCount[0].value,
      icon: MessageSquare,
      color: "text-italy-gold",
      bg: "bg-amber-50",
    },
    {
      title: "Contact Messages",
      value: contactsCount[0].value,
      icon: Inbox,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome to the format admin portal. Here is a quick summary of your school's data.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
