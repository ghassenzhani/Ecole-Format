"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18nContext";
import { Language } from "@/lib/dictionaries";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useTranslation();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/courses", label: t("nav.courses") },
    { href: "/study-in-italy", label: t("nav.studyInItaly") },
    { href: "/about", label: t("nav.aboutUs") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-italy-green to-italy-red flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-tight">
                FORMAT
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-widest uppercase">
                Italian School
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100/80"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Switcher Desktop */}
            <div className="relative ml-2">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                {lang.toUpperCase()}
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === l.code ? "bg-emerald-50 text-italy-green font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-italy-green to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
            >
              {t("nav.freeConsultation")}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : lang === 'fr' ? 'it' : 'en')}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold text-xs"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-3 bg-gradient-to-r from-italy-green to-emerald-600 text-white text-sm font-semibold rounded-xl text-center shadow-lg"
              >
                {t("nav.freeConsultation")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
