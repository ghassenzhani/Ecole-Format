"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, Mail, BookOpen, Award, Loader2, Calendar, FileText } from "lucide-react";
import Link from "next/link";

import { use } from "react";

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/users/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  if (!profile || profile.error) return <div className="p-8 text-center text-red-500">User not found</div>;

  const { student, courses, celiTests, documents } = profile;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/users" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Profile</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">{student.name}</h2>
          <p className="text-slate-500 text-sm mb-4">Joined {new Date(student.createdAt).toLocaleDateString()}</p>
          
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" /> {student.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" /> {student.phone || "No phone provided"}
            </div>
          </div>
        </div>

        {/* Enrollments & Inscriptions */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-italy-green" />
                Enrolled Courses
              </h3>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">{courses.length}</span>
            </div>

            {courses.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-xl">No courses enrolled.</p>
            ) : (
              <div className="space-y-3">
                {courses.map((course: any) => (
                  <div key={course.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:border-italy-green/20 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-italy-green text-white px-2 py-0.5 rounded text-[10px] font-bold">{course.level}</span>
                        <h4 className="font-bold text-slate-800">{course.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Mode: {course.mode}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{course.status.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CELI Tests */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-italy-red" />
                CELI Inscriptions
              </h3>
              <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold">{celiTests.length}</span>
            </div>

            {celiTests.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-xl">No CELI exams inscribed.</p>
            ) : (
              <div className="space-y-3">
                {celiTests.map((test: any) => (
                  <div key={test.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="font-bold text-slate-800">CELI Exam</p>
                        <p className="text-xs text-slate-500">{test.date}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{test.status.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Uploaded Documents
              </h3>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{documents?.length || 0}</span>
            </div>

            {!documents || documents.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-xl">No documents uploaded.</p>
            ) : (
              <div className="space-y-3">
                {documents.map((doc: any) => (
                  <div key={doc.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <div>
                        <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="font-bold text-slate-800 hover:text-blue-600 hover:underline">{doc.fileName}</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        value={doc.status}
                        onChange={async (e) => {
                          await fetch(`/api/admin/documents/${doc.id}`, {
                            method: "PATCH",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({ status: e.target.value })
                          });
                          window.location.reload();
                        }}
                        className={`text-xs font-bold px-2 py-1 rounded-md border-0 focus:ring-2 focus:ring-slate-200 ${
                          doc.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                          doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}
                      >
                        <option value="pending">PENDING</option>
                        <option value="approved">APPROVED</option>
                        <option value="rejected">REJECTED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
