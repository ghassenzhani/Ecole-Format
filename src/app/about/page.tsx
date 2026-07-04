"use client";

import { useTranslation } from "@/lib/i18nContext";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  Users,
  Target,
  Heart,
  Globe,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  BookOpen,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const values = [
  {
    icon: Heart,
    title: "Passion for Teaching",
    description: "We believe that learning Italian should be an enjoyable and enriching experience. Our teachers bring passion to every lesson.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Your success is our success. We focus on practical outcomes, whether it is passing CELI exams or achieving visa requirements.",
  },
  {
    icon: Users,
    title: "Student Centered",
    description: "Every student is unique. We adapt our teaching methods to match your learning style, pace, and goals.",
  },
  {
    icon: Globe,
    title: "Cultural Immersion",
    description: "Language and culture go hand in hand. We integrate Italian culture, history, and traditions into our curriculum.",
  },
];

const milestones = [
  {
    year: "2014",
    title: "School Founded",
    description: "Format Italian School was established in Tunisia with a mission to make Italian language education accessible.",
  },
  {
    year: "2016",
    title: "CELI Accreditation",
    description: "Became an official CELI examination center accredited by the University of Perugia.",
  },
  {
    year: "2018",
    title: "Online Programs",
    description: "Launched online Italian courses to reach students across Tunisia and beyond.",
  },
  {
    year: "2021",
    title: "Visa Services",
    description: "Expanded services to include comprehensive study visa document preparation and university guidance.",
  },
  {
    year: "2024",
    title: "500+ Students",
    description: "Celebrated training over 500 students with a 95% CELI exam pass rate.",
  },
];

const team = [
  {
    name: "Maria Rossi",
    role: "Academic Director",
    description: "Native Italian speaker with 15+ years of teaching experience and CELI examiner certification.",
  },
  {
    name: "Ahmed Ben Ali",
    role: "Head of Visa Services",
    description: "Expert in Italian immigration procedures with 8+ years of experience helping students obtain visas.",
  },
  {
    name: "Sofia Bianchi",
    role: "Senior Instructor",
    description: "Specialized in B1-B2 level preparation with a focus on CELI exam strategies and techniques.",
  },
  {
    name: "Karim Trabelsi",
    role: "Student Advisor",
    description: "Dedicated to helping students choose the right courses and navigate their Italian journey.",
  },
];

const stats = [
  { value: "10+", label: "Years of Excellence", icon: Calendar },
  { value: "500+", label: "Students Trained", icon: Users },
  { value: "95%", label: "CELI Pass Rate", icon: Award },
  { value: "100+", label: "Visas Assisted", icon: CheckCircle2 },
];

export default function AboutPage() {
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
              <Heart className="w-4 h-4 text-italy-red" />
              <span className="text-sm font-medium text-slate-600">{t("about.ourStory")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t("about.aboutFormat")}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
              {t("about.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-italy-green" />
                </div>
                <div className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t("about.ourMission")}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                At Format, we believe that language is the key to unlocking new opportunities. Our mission is to provide 
                high-quality Italian language education that empowers our students to achieve their personal, academic, 
                and professional goals in Italy.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                Founded with a passion for Italian culture and education, we have grown to become one of Tunisia&apos;s 
                most trusted Italian language schools. Our accreditation by the University of Perugia as an official 
                CELI examination center is a testament to our commitment to excellence.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Beyond language teaching, we are dedicated to supporting our students through every step of their 
                Italian journey, from the first lesson to securing their study visa and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-slate-100 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-4">
                  {values.map((value, i) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-5 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">
                        <value.icon className="w-5 h-5 text-italy-green" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{value.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("about.ourJourney")}
            subtitle={t("about.journeySub")}
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm inline-block">
                      <span className="text-sm font-bold text-italy-green">{milestone.year}</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-4 h-4 rounded-full bg-italy-green border-4 border-white shadow-md flex-shrink-0 z-10" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("about.meetTeam")}
            subtitle={t("about.teamSub")}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-italy-green to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-xs font-semibold text-italy-green mb-3">{member.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="section-padding bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
                <Award className="w-4 h-4 text-italy-gold" />
                <span className="text-sm font-medium text-slate-300">Official Accreditation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t("about.accredited")}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                {t("about.accreditedSub")}
              </p>
              <p className="text-slate-300 leading-relaxed mb-8">
                The CELI (Certificato di Conoscenza della Lingua Italiana) is recognized by the Italian Ministry 
                of Education and is accepted by universities, employers, and government institutions worldwide.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Official CELI Center",
                  "International Recognition",
                  "Ministry Approved",
                  "University Accepted",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 bg-white/10 text-slate-300 text-sm font-medium rounded-full border border-white/20"
                  >
                    <CheckCircle2 className="w-4 h-4 inline mr-1.5 text-italy-green" />
                    {badge}
                  </span>
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
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-italy-gold to-amber-500 flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">CELI Certification</h3>
                    <p className="text-sm text-slate-400">University of Perugia</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Exam Levels", value: "CELI 1 to CELI 5 (A2 to C2)" },
                    { label: "Recognition", value: "Italian Ministry of Education" },
                    { label: "Validity", value: "No expiration date" },
                    { label: "Usage", value: "University, Work, Citizenship" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-italy-green/20 rounded-xl border border-italy-green/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-italy-gold fill-italy-gold" />
                    <span className="text-sm font-bold text-white">95% Student Pass Rate</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Our dedicated preparation program ensures students are fully ready for their CELI exams.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("about.joinFamily")}
            </h2>
            <p className="text-slate-500 mb-8 max-w-xl mx-auto">
              {t("about.joinSub")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-italy-green to-emerald-600 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl transition-all hover:-translate-y-0.5"
            >
              {t("about.getInTouch")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
