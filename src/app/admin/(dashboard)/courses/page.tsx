"use client";

import { useState, useEffect } from "react";
import { BookOpen, Users, ToggleLeft, ToggleRight, Save, Loader2 } from "lucide-react";

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  const fetchCourses = () => {
    fetch("/api/admin/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleUpdate = async (courseId: number, data: any) => {
    setSavingId(courseId);
    try {
      await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: courseId, ...data })
      });
      fetchCourses();
    } catch (error) {
      console.error(error);
    }
    setSavingId(null);
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Course Management</h1>
        <p className="text-slate-500">Manage capacities and open/close enrollments.</p>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-italy-green text-white px-2 py-0.5 rounded text-xs font-bold">{course.level}</span>
                  <h3 className="text-lg font-bold text-slate-800">{course.title}</h3>
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${course.isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {course.isOpen ? "OPEN" : "CLOSED"}
                  </span>
                </p>
              </div>
              <button 
                onClick={() => handleUpdate(course.id, { 
                  maxInPerson: course.maxInPerson, 
                  maxOnline: course.maxOnline, 
                  isOpen: course.isOpen ? 0 : 1 
                })}
                disabled={savingId === course.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${course.isOpen ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
              >
                {course.isOpen ? "Close Course" : "Open Course"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* In Person */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-slate-700">In-Person Seats</span>
                  <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500">
                    {course.currentInPerson} / {course.maxInPerson} Enrolled
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                  <div className={`h-2 rounded-full ${course.currentInPerson >= course.maxInPerson ? 'bg-red-500' : 'bg-italy-green'}`} style={{ width: `${Math.min(100, (course.currentInPerson / course.maxInPerson) * 100)}%` }}></div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Max Capacity:</span>
                  <input 
                    type="number" 
                    defaultValue={course.maxInPerson}
                    onBlur={(e) => {
                      if (Number(e.target.value) !== course.maxInPerson) {
                        handleUpdate(course.id, { maxInPerson: Number(e.target.value), maxOnline: course.maxOnline, isOpen: course.isOpen });
                      }
                    }}
                    className="w-20 px-2 py-1 text-sm border border-slate-200 rounded-lg" 
                  />
                  {savingId === course.id && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
                </div>
              </div>

              {/* Online */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-slate-700">Online Seats</span>
                  <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500">
                    {course.currentOnline} / {course.maxOnline} Enrolled
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                  <div className={`h-2 rounded-full ${course.currentOnline >= course.maxOnline ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(100, (course.currentOnline / course.maxOnline) * 100)}%` }}></div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Max Capacity:</span>
                  <input 
                    type="number" 
                    defaultValue={course.maxOnline}
                    onBlur={(e) => {
                      if (Number(e.target.value) !== course.maxOnline) {
                        handleUpdate(course.id, { maxInPerson: course.maxInPerson, maxOnline: Number(e.target.value), isOpen: course.isOpen });
                      }
                    }}
                    className="w-20 px-2 py-1 text-sm border border-slate-200 rounded-lg" 
                  />
                  {savingId === course.id && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
