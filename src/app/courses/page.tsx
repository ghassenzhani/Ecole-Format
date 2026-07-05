"use client";

import { useTranslation } from "@/lib/i18nContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  Monitor,
  Award,
  CheckCircle2,
  ArrowRight,
  Star,
  Calendar,
  GraduationCap,
  X,
  Loader2
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

const staticCoursesData: Record<string, any> = {
  "A1": {
    duration: "8 weeks", hours: "60 hours", price: "800 TND",
    description: "Learn the basics of Italian language. Greetings, introductions, everyday conversations.",
    features: ["Basic grammar", "Everyday conversations", "Listening comprehension", "CELI A1 prep"],
    color: "from-emerald-500 to-italy-green", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", popular: false
  },
  "A2": {
    duration: "10 weeks", hours: "75 hours", price: "950 TND",
    description: "Build on your foundation. Describe routines, express opinions.",
    features: ["Past and future tenses", "Describing experiences", "Making requests", "CELI A2 prep"],
    color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200", popular: false
  },
  "B1": {
    duration: "12 weeks", hours: "90 hours", price: "1,100 TND",
    description: "Achieve intermediate fluency. Discuss topics of personal interest.",
    features: ["Complex sentence structures", "Expressing opinions", "CELI B1 prep", "Required for nationality"],
    color: "from-amber-500 to-italy-gold", bgColor: "bg-amber-50", borderColor: "border-amber-200", popular: true
  },
  "B2": {
    duration: "14 weeks", hours: "105 hours", price: "1,300 TND",
    description: "Interact with native speakers fluently. Understand complex texts.",
    features: ["Advanced grammar", "Technical discussions", "CELI B2 prep", "Required for study visa"],
    color: "from-red-500 to-italy-red", bgColor: "bg-red-50", borderColor: "border-red-200", popular: true
  }
};

const celiInfo = [
  { icon: Award, title: "Official CELI Center", description: "Accredited by the University of Perugia." },
  { icon: CheckCircle2, title: "Recognized Worldwide", description: "Accepted by Italian universities." },
  { icon: Calendar, title: "Regular Exam Sessions", description: "Organized throughout the year." },
  { icon: GraduationCap, title: "Exam Preparation", description: "Dedicated preparation courses." },
];

const scheduleOptions = [
  { title: "Morning Classes", time: "9:00 AM - 12:00 PM", days: "Mon - Fri", icon: Clock },
  { title: "Afternoon Classes", time: "2:00 PM - 5:00 PM", days: "Mon - Fri", icon: Clock },
  { title: "Evening Classes", time: "6:00 PM - 9:00 PM", days: "Mon - Thu", icon: Clock },
  { title: "Weekend Classes", time: "9:00 AM - 1:00 PM", days: "Sat - Sun", icon: Calendar },
];

export default function CoursesPage() {
  const { t } = useTranslation();
  const { student, openAuthModal } = useAuth();
  const router = useRouter();

  const [dbCourses, setDbCourses] = useState<any[]>([]);
  const [dbCeliTests, setDbCeliTests] = useState<any[]>([]);
  
  const [enrollCourse, setEnrollCourse] = useState<any>(null);
  const [enrollCeli, setEnrollCeli] = useState<any>(null);
  
  const [enrollMode, setEnrollMode] = useState("in-person");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/courses").then(res => res.json()).then(setDbCourses).catch(() => {});
    fetch("/api/celi").then(res => res.json()).then(setDbCeliTests).catch(() => {});
  }, []);

  const handleEnrollCourseClick = (course: any) => {
    if (!student) {
      openAuthModal();
      return;
    }
    setEnrollCourse(course);
    setErrorMsg("");
  };

  const handleEnrollCeliClick = (test: any) => {
    if (!student) {
      openAuthModal();
      return;
    }
    setEnrollCeli(test);
    setErrorMsg("");
  };

  const submitCourseEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: enrollCourse.id, mode: enrollMode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setEnrollCourse(null);
      router.push("/profile");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to enroll");
    }
    setIsSubmitting(false);
  };

  const submitCeliEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/celi/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId: enrollCeli.id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setEnrollCeli(null);
      router.push("/profile");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to inscribe");
    }
    setIsSubmitting(false);
  };

  const [waitlistCourse, setWaitlistCourse] = useState<any>(null);

  const handleWaitlistClick = (course: any) => {
    if (!student) {
      openAuthModal();
      return;
    }
    setWaitlistCourse(course);
    setErrorMsg("");
  };

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/courses/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: waitlistCourse.id, mode: enrollMode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setWaitlistCourse(null);
      alert("You have successfully joined the waitlist!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to join waitlist");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pt-20 relative">
      {/* Course Enrollment Modal */}
      <AnimatePresence>
        {enrollCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative p-8">
              <button onClick={() => setEnrollCourse(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Enroll in {enrollCourse.title}</h3>
              <p className="text-sm text-slate-500 mb-6">Select your preferred learning mode.</p>
              
              {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{errorMsg}</div>}

              <form onSubmit={submitCourseEnrollment} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Learning Mode</label>
                  <select value={enrollMode} onChange={e => setEnrollMode(e.target.value)} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-italy-green/20">
                    <option value="in-person">In-Person at our center</option>
                    <option value="online">Online (Zoom/Meet)</option>
                  </select>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-italy-green text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-700 flex justify-center">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Enrollment"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CELI Enrollment Modal */}
      <AnimatePresence>
        {enrollCeli && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative p-8">
              <button onClick={() => setEnrollCeli(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Inscribe for CELI</h3>
              <p className="text-sm text-slate-500 mb-6">Test Date: {enrollCeli.date}</p>
              
              {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{errorMsg}</div>}

              <form onSubmit={submitCeliEnrollment} className="space-y-4">
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-italy-red text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 flex justify-center">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Inscription"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {waitlistCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative p-8">
              <button onClick={() => setWaitlistCourse(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Join Waitlist</h3>
              <p className="text-sm text-slate-500 mb-6">{waitlistCourse.title} is currently full. Join the waitlist to be notified if a spot opens up.</p>
              
              {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{errorMsg}</div>}

              <form onSubmit={submitWaitlist} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Preferred Learning Mode</label>
                  <select value={enrollMode} onChange={e => setEnrollMode(e.target.value)} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-italy-green/20">
                    <option value="in-person">In-Person at our center</option>
                    <option value="online">Online (Zoom/Meet)</option>
                  </select>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl shadow-lg hover:bg-slate-800 flex justify-center">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join Waitlist"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative py-20 md:py-28 hero-gradient overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm mb-6">
            <BookOpen className="w-4 h-4 text-italy-green" />
            <span className="text-sm font-medium text-slate-600">{t("courses.programs")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">{t("courses.ourCourses")}</h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">{t("courses.desc")}</p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("courses.coursePrograms")} subtitle={t("courses.courseProgramsSub")} />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {dbCourses.map((course, i) => {
              const staticData = staticCoursesData[course.level] || staticCoursesData["A1"];
              
              return (
                <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`relative rounded-2xl border ${staticData.borderColor} ${staticData.bgColor} p-6 md:p-8 hover:shadow-xl transition-shadow`}>
                  {staticData.popular && (
                    <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-italy-green to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg">MOST POPULAR</div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${staticData.color} shadow-lg mb-4`}>
                        <span className="text-white font-black text-xl">{course.level}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{staticData.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600"><Clock className="w-4 h-4 text-slate-400" />{staticData.duration}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600"><BookOpen className="w-4 h-4 text-slate-400" />{staticData.hours}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600"><Monitor className="w-4 h-4 text-slate-400" />Online & In-Person</div>
                    <div className="flex items-center gap-2 text-sm text-slate-600"><Users className="w-4 h-4 text-slate-400" />Small Groups</div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {staticData.features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-italy-green flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                    <div>
                      <span className="text-xs text-slate-400">Starting from</span>
                      <div className="text-lg font-bold text-slate-900">{staticData.price}</div>
                    </div>
                    {course.isOpen === 1 ? (
                      <button onClick={() => handleEnrollCourseClick(course)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                        Enroll Now <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleWaitlistClick(course)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-300 transition-colors">
                        Join Waitlist
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CELI Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading title={t("courses.celiCert")} subtitle={t("courses.celiCertSub")} align="left" />
              <div className="space-y-6">
                {celiInfo.map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-italy-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-italy-gold to-amber-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">CELI Exam Sessions</h3>
                    <p className="text-xs text-slate-500">Upcoming Test Dates</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {dbCeliTests.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">No upcoming tests available at the moment.</p>
                  ) : (
                    dbCeliTests.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-800">{test.date}</p>
                          <p className="text-xs text-slate-500">CELI Certification</p>
                        </div>
                        {test.isOpen === 1 ? (
                          <button onClick={() => handleEnrollCeliClick(test)} className="px-4 py-2 bg-italy-red text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                            Inscribe Now
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 bg-slate-200 text-slate-500 text-xs font-semibold rounded-lg">Closed</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Options */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("courses.flexibleSchedule")} subtitle={t("courses.flexibleScheduleSub")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleOptions.map((option, i) => (
              <div key={option.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-6 h-6 text-italy-green" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{option.title}</h3>
                <p className="text-sm text-italy-green font-semibold mb-1">{option.time}</p>
                <p className="text-xs text-slate-500">{option.days}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
