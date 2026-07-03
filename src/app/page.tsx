"use client";

import { useTranslation } from "@/lib/i18nContext";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Globe,
  Award,
  FileCheck,
  ArrowRight,
  Users,
  Monitor,
  MapPin,
  Star,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const features = [
  {
    icon: BookOpen,
    title: "Italian Courses",
    description: "Face-to-face and online Italian courses from A1 to B2 levels with experienced teachers.",
    href: "/courses",
    color: "from-emerald-500 to-italy-green",
  },
  {
    icon: Award,
    title: "CELI Exam Center",
    description: "Official CELI examination center accredited by the University of Perugia.",
    href: "/courses",
    color: "from-amber-500 to-italy-gold",
  },
  {
    icon: FileCheck,
    title: "Study in Italy",
    description: "Complete assistance with study visa documents and university applications.",
    href: "/study-in-italy",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Globe,
    title: "Online & In-Person",
    description: "Flexible learning options with both online classes and in-person sessions.",
    href: "/courses",
    color: "from-violet-500 to-purple-600",
  },
];

const levels = [
  {
    level: "A1",
    name: "Beginner",
    description: "Basic Italian for everyday situations. Required for work visa applications.",
    visa: "Work Visa",
    color: "bg-emerald-50 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    level: "A2",
    name: "Elementary",
    description: "Understand and communicate in routine tasks and familiar topics.",
    visa: null,
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    level: "B1",
    name: "Intermediate",
    description: "Deal with most situations while traveling. Required for Italian nationality.",
    visa: "Nationality",
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    level: "B2",
    name: "Upper Intermediate",
    description: "Interact with native speakers fluently. Required for study visa applications.",
    visa: "Study Visa",
    color: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-700",
  },
];

const testimonials = [
  {
    name: "Ahmed Ben",
    role: "Student - B2 Level",
    text: "Format helped me achieve my B2 certification in just 8 months. The teachers are incredibly patient and the CELI prep course was exactly what I needed for my study visa.",
    rating: 5,
  },
  {
    name: "Sara Khelifi",
    role: "Student - B1 Level",
    text: "I needed B1 for my Italian nationality application. The structured program and mock exams at Format gave me the confidence to pass on my first attempt.",
    rating: 5,
  },
  {
    name: "Karim Mzali",
    role: "Student - A1 Level",
    text: "Great experience learning Italian online! The flexible schedule allowed me to study while working. Perfect for my work visa requirements.",
    rating: 5,
  },
];

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "95%", label: "CELI Pass Rate" },
  { value: "10+", label: "Years Experience" },
  { value: "100+", label: "Visas Assisted" },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-100/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-italy-green animate-pulse" />
                <span className="text-sm font-medium text-slate-600">{t("hero.accredited")}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                {t("hero.title1")}{" "}
                <span className="gradient-text">{t("hero.title2")}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl">
                {t("hero.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-italy-green to-emerald-600 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
                >
                  {t("hero.consultation")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  {t("hero.explore")}
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-200/60">
                <div key="students">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t("hero.stats.students")}</div>
                </div>
                <div key="passRate">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900">95%</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t("hero.stats.passRate")}</div>
                </div>
                <div key="experience">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900">10+</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t("hero.stats.experience")}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-italy-green to-emerald-600 flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">FORMAT</h3>
                      <p className="text-xs text-slate-500">Italian Language School</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle2, text: "CELI Exam Preparation", color: "text-emerald-600" },
                      { icon: CheckCircle2, text: "University of Perugia Accredited", color: "text-emerald-600" },
                      { icon: CheckCircle2, text: "Study Visa Document Help", color: "text-emerald-600" },
                      { icon: CheckCircle2, text: "Online & In-Person Classes", color: "text-emerald-600" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-sm font-medium text-slate-700">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center"
                          >
                            <Users className="w-4 h-4 text-slate-500" />
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-slate-500">500+ happy students</span>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-italy-gold" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">95% Pass Rate</div>
                      <div className="text-[10px] text-slate-500">CELI Exams</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Online & Offline</div>
                      <div className="text-[10px] text-slate-500">Flexible Learning</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Offer"
            subtitle="Comprehensive Italian language education and support services to help you achieve your goals in Italy."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={feature.href} className="block group">
                  <div className="h-full bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-medium text-italy-green opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Levels Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Course Levels"
            subtitle="From beginner to advanced, we have the right course for your Italian language journey and visa requirements."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((level, i) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl border p-6 ${level.color} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-slate-900">{level.level}</span>
                  {level.visa && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${level.badgeColor}`}>
                      {level.visa}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{level.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Why Choose Format?"
                subtitle="We are committed to your success with experienced teachers, proven methods, and comprehensive support."
                align="left"
              />

              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: "Experienced Teachers",
                    text: "Our teaching staff includes certified Italian teachers and native speakers with years of experience.",
                  },
                  {
                    icon: Award,
                    title: "Official CELI Center",
                    text: "Accredited by the University of Perugia, we are an official CELI examination center in Tunisia.",
                  },
                  {
                    icon: FileCheck,
                    title: "Visa Document Support",
                    text: "We help you prepare all necessary documents for your study in Italy visa application.",
                  },
                  {
                    icon: Monitor,
                    title: "Flexible Learning",
                    text: "Choose between face-to-face classes at our center or online sessions from the comfort of your home.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-italy-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-slate-100 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-6 text-center shadow-sm"
                    >
                      <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Student Success Stories"
            subtitle="Hear from our students who achieved their Italian language goals with Format."
            light
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-italy-gold fill-italy-gold" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-italy-green to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 overflow-hidden"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-italy-green/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-italy-red/10 rounded-full blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Italian Journey?
              </h2>
              <p className="text-slate-300 mb-8">
                Book your free consultation today and take the first step towards mastering Italian 
                and achieving your goals in Italy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-italy-green to-emerald-600 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl transition-all hover:-translate-y-0.5"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  View Courses
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
