"use client";

import { useTranslation } from "@/lib/i18nContext";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  Monitor,
  MapPin,
  Award,
  CheckCircle2,
  ArrowRight,
  Star,
  Calendar,
  GraduationCap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const courses = [
  {
    level: "A1",
    name: "Beginner Italian",
    duration: "8 weeks",
    hours: "60 hours",
    mode: "Online & In-Person",
    price: "Starting from 800 TND",
    description: "Learn the basics of Italian language. Greetings, introductions, everyday conversations, and essential vocabulary.",
    features: [
      "Basic grammar and vocabulary",
      "Everyday conversations",
      "Listening comprehension",
      "Reading simple texts",
      "CELI A1 exam preparation",
    ],
    color: "from-emerald-500 to-italy-green",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    level: "A2",
    name: "Elementary Italian",
    duration: "10 weeks",
    hours: "75 hours",
    mode: "Online & In-Person",
    price: "Starting from 950 TND",
    description: "Build on your foundation. Describe routines, express opinions, and handle most everyday situations.",
    features: [
      "Past and future tenses",
      "Describing experiences",
      "Making requests and suggestions",
      "Understanding announcements",
      "CELI A2 exam preparation",
    ],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    level: "B1",
    name: "Intermediate Italian",
    duration: "12 weeks",
    hours: "90 hours",
    mode: "Online & In-Person",
    price: "Starting from 1,100 TND",
    description: "Achieve intermediate fluency. Discuss topics of personal interest, understand main points of clear standard input.",
    features: [
      "Complex sentence structures",
      "Expressing opinions and emotions",
      "Understanding TV programs",
      "Writing detailed texts",
      "CELI B1 exam preparation",
      "Required for Italian nationality",
    ],
    color: "from-amber-500 to-italy-gold",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    popular: true,
  },
  {
    level: "B2",
    name: "Upper Intermediate Italian",
    duration: "14 weeks",
    hours: "105 hours",
    mode: "Online & In-Person",
    price: "Starting from 1,300 TND",
    description: "Interact with native speakers fluently. Understand complex texts, express yourself clearly on various topics.",
    features: [
      "Advanced grammar concepts",
      "Technical discussions",
      "Understanding lectures and speeches",
      "Writing essays and reports",
      "CELI B2 exam preparation",
      "Required for study visa",
    ],
    color: "from-red-500 to-italy-red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    popular: true,
  },
];

const celiInfo = [
  {
    icon: Award,
    title: "Official CELI Center",
    description: "Format is an official CELI examination center accredited by the University of Perugia, Italy.",
  },
  {
    icon: CheckCircle2,
    title: "Recognized Worldwide",
    description: "CELI certificates are recognized internationally and accepted by Italian universities and institutions.",
  },
  {
    icon: Calendar,
    title: "Regular Exam Sessions",
    description: "We organize CELI exam sessions throughout the year. Register early to secure your spot.",
  },
  {
    icon: GraduationCap,
    title: "Exam Preparation",
    description: "Dedicated preparation courses focusing on exam format, practice tests, and strategies for success.",
  },
];

const scheduleOptions = [
  {
    title: "Morning Classes",
    time: "9:00 AM - 12:00 PM",
    days: "Monday - Friday",
    icon: Clock,
  },
  {
    title: "Afternoon Classes",
    time: "2:00 PM - 5:00 PM",
    days: "Monday - Friday",
    icon: Clock,
  },
  {
    title: "Evening Classes",
    time: "6:00 PM - 9:00 PM",
    days: "Monday - Thursday",
    icon: Clock,
  },
  {
    title: "Weekend Classes",
    time: "9:00 AM - 1:00 PM",
    days: "Saturday - Sunday",
    icon: Calendar,
  },
];

export default function CoursesPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-red-100/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm mb-6">
              <BookOpen className="w-4 h-4 text-italy-green" />
              <span className="text-sm font-medium text-slate-600">{t("courses.programs")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t("courses.ourCourses")}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
              {t("courses.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("courses.coursePrograms")}
            subtitle={t("courses.courseProgramsSub")}
          />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl border ${course.borderColor} ${course.bgColor} p-6 md:p-8 hover:shadow-xl transition-shadow`}
              >
                {course.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-italy-green to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} shadow-lg mb-4`}>
                      <span className="text-white font-black text-xl">{course.level}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{course.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">{course.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    {course.hours}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Monitor className="w-4 h-4 text-slate-400" />
                    {course.mode}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    Small Groups
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {course.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-italy-green flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                  <div>
                    <span className="text-xs text-slate-400">Starting from</span>
                    <div className="text-lg font-bold text-slate-900">{course.price}</div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Enroll Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CELI Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title={t("courses.celiCert")}
                subtitle={t("courses.celiCertSub")}
                align="left"
              />

              <div className="space-y-6">
                {celiInfo.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-italy-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-3">CELI Exam Levels</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { level: "CELI 1", equiv: "A2 Level" },
                    { level: "CELI 2", equiv: "B1 Level" },
                    { level: "CELI 3", equiv: "B2 Level" },
                    { level: "CELI 4", equiv: "C1 Level" },
                  ].map((item) => (
                    <div key={item.level} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                      <span className="text-sm font-semibold text-slate-700">{item.level}</span>
                      <span className="text-xs text-slate-500">{item.equiv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-italy-gold to-amber-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">CELI Exam Preparation</h3>
                    <p className="text-xs text-slate-500">University of Perugia</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    "Mock exams with real CELI format",
                    "Speaking practice with native speakers",
                    "Writing correction and feedback",
                    "Listening comprehension training",
                    "Reading strategy workshops",
                    "Personalized study plan",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-italy-green" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-italy-gold fill-italy-gold" />
                    <span className="text-sm font-bold text-slate-900">95% Pass Rate</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Our students consistently achieve excellent results on their CELI exams.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("courses.flexibleSchedule")}
            subtitle={t("courses.flexibleScheduleSub")}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleOptions.map((option, i) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-6 h-6 text-italy-green" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{option.title}</h3>
                <p className="text-sm text-italy-green font-semibold mb-1">{option.time}</p>
                <p className="text-xs text-slate-500">{option.days}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("courses.notSure")}
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              {t("courses.notSureSub")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-italy-green to-emerald-600 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl transition-all hover:-translate-y-0.5"
            >
              {t("courses.bookTest")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
