"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileCheck,
  Plane,
  GraduationCap,
  Building2,
  IdCard,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  BookOpen,
  Award,
  Calendar,
  MapPin,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const visaRequirements = [
  {
    level: "B2",
    purpose: "Study Visa",
    description: "Required for university enrollment and long-term study programs in Italy. CELI 3 or equivalent certification needed.",
    color: "from-red-500 to-italy-red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    level: "B1",
    purpose: "Nationality",
    description: "Required for Italian citizenship applications. CELI 2 or equivalent certification demonstrates sufficient language integration.",
    color: "from-amber-500 to-italy-gold",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    level: "A1",
    purpose: "Work Visa",
    description: "Basic Italian required for certain work visa categories. Shows foundational communication ability.",
    color: "from-emerald-500 to-italy-green",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
];

const documentSteps = [
  {
    step: "01",
    title: "Language Certificate",
    description: "Obtain your CELI certificate at the required level (B2 for study visa). We prepare you for the exam.",
    icon: Award,
  },
  {
    step: "02",
    title: "University Admission",
    description: "Apply and get accepted to an Italian university. We guide you through the pre-enrollment process.",
    icon: GraduationCap,
  },
  {
    step: "03",
    title: "Financial Proof",
    description: "Prepare bank statements and sponsorship letters showing you can support yourself in Italy.",
    icon: FileCheck,
  },
  {
    step: "04",
    title: "Accommodation",
    description: "Secure housing in Italy. We can help you find student housing or rental agreements.",
    icon: Building2,
  },
  {
    step: "05",
    title: "Health Insurance",
    description: "Obtain valid health insurance coverage for your stay in Italy.",
    icon: AlertCircle,
  },
  {
    step: "06",
    title: "Visa Application",
    description: "Submit your complete application at the Italian embassy with all required documents.",
    icon: IdCard,
  },
];

const services = [
  {
    icon: FileCheck,
    title: "Document Review",
    description: "We review all your documents to ensure they meet Italian embassy requirements.",
  },
  {
    icon: BookOpen,
    title: "University Guidance",
    description: "Help choosing the right university and program based on your profile and goals.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Assistance with booking visa appointments and tracking application status.",
  },
  {
    icon: MapPin,
    title: "Pre-Departure Briefing",
    description: "Orientation session covering life in Italy, culture, and practical tips.",
  },
];

const universities = [
  "University of Bologna",
  "Sapienza University of Rome",
  "Politecnico di Milano",
  "University of Padua",
  "University of Milan",
  "University of Florence",
  "University of Pisa",
  "University of Turin",
];

export default function StudyInItalyPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm mb-6">
              <Plane className="w-4 h-4 text-italy-green" />
              <span className="text-sm font-medium text-slate-600">Your Gateway to Italy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Study in <span className="gradient-text">Italy</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
              Complete assistance for your study journey in Italy. From language certification 
              to visa document preparation, we guide you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Language Requirements */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Language Level Requirements"
            subtitle="Different visa and citizenship applications require different Italian language proficiency levels."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {visaRequirements.map((req, i) => (
              <motion.div
                key={req.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl border ${req.borderColor} ${req.bgColor} p-6 md:p-8 hover:shadow-lg transition-shadow`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${req.color} shadow-lg mb-6`}>
                  <span className="text-white font-black text-2xl">{req.level}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{req.purpose}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{req.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Steps */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Visa Document Process"
            subtitle="Follow these steps to prepare your complete study visa application. We help you with each step."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-italy-green" />
                  </div>
                  <span className="text-3xl font-black text-slate-100">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
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
                title="How We Help You"
                subtitle="Our comprehensive support services make your study in Italy journey smooth and stress-free."
                align="left"
              />

              <div className="space-y-6">
                {services.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-italy-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{service.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
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
            >
              <div className="bg-slate-900 rounded-3xl p-8 md:p-10">
                <h3 className="text-xl font-bold text-white mb-6">Popular Italian Universities</h3>
                <div className="space-y-3">
                  {universities.map((uni, i) => (
                    <motion.div
                      key={uni}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl"
                    >
                      <GraduationCap className="w-5 h-5 text-italy-green flex-shrink-0" />
                      <span className="text-sm text-slate-300">{uni}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-italy-green" />
                    <span className="text-sm font-semibold text-white">100+ Visas Assisted</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    We have successfully helped over 100 students obtain their study visas for Italy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Important Notes</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Start preparing your documents at least 6 months before your intended departure",
                  "CELI exam results take 2-3 months to be issued",
                  "University pre-enrollment typically opens in April-May",
                  "Visa appointments should be booked as early as possible",
                  "Financial proof must cover at least one year of living expenses",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-italy-green flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-italy-green" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Required Documents</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Valid passport (minimum 6 months validity)",
                  "CELI language certificate (B2 for study visa)",
                  "University admission letter (pre-enrollment)",
                  "Bank statements (minimum 6 months)",
                  "Health insurance policy",
                  "Accommodation proof in Italy",
                  "Passport-sized photos",
                  "Visa application form",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-italy-green flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
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
              Start Your Italy Journey Today
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Book a free consultation to discuss your study plans and get personalized guidance on your visa application.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-italy-green to-emerald-600 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl transition-all hover:-translate-y-0.5"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
