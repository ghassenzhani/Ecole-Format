"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { User, BookOpen, FileText, Phone, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18nContext";

export default function ProfilePage() {
  const { student, openAuthModal, logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (student === undefined) return; // Still loading Auth
    if (student === null) {
      router.push("/");
      openAuthModal();
      return;
    }

    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data.student) setProfileData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [student, router, openAuthModal]);

  if (loading || !profileData) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-italy-green" />
      </div>
    );
  }

  const { student: sData, courses, celiTests } = profileData;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <User className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">{sData.name}</h1>
              <p className="text-sm text-slate-500 mb-6">{sData.email}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Phone className="w-4 h-4 text-italy-green" />
                  {sData.phone || "No phone provided"}
                </div>
              </div>

              <button 
                onClick={logout}
                className="w-full py-2.5 text-red-600 bg-red-50 hover:bg-red-100 font-semibold rounded-xl transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 space-y-6">
            
            {/* Courses Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-italy-green" />
                  My Courses
                </h2>
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                  {courses.length}
                </span>
              </div>
              
              {courses.length === 0 ? (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-sm">You haven't enrolled in any courses yet.</p>
                  <button onClick={() => router.push('/courses')} className="mt-4 text-italy-green font-semibold text-sm hover:underline">
                    Browse Courses &rarr;
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course: any) => (
                    <div key={course.id} className="p-4 rounded-2xl border border-slate-100 hover:border-italy-green/30 transition-colors flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-italy-green text-white px-2 py-0.5 rounded text-[10px] font-bold">
                            {course.level}
                          </span>
                          <h3 className="font-bold text-slate-800">{course.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                          Mode: {course.mode}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.status === 'enrolled' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {course.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CELI Tests Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-italy-red" />
                  CELI Exams
                </h2>
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                  {celiTests.length}
                </span>
              </div>
              
              {celiTests.length === 0 ? (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-sm">You haven't inscribed for any CELI exams.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {celiTests.map((test: any) => (
                    <div key={test.id} className="p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-800">CELI Certification Exam</h3>
                        <p className="text-sm text-slate-500">Date: {test.date}</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                        {test.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
