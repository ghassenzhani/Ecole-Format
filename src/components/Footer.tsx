"use client";

import { useTranslation } from "@/lib/i18nContext";

import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const footerLinks = {
  school: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Study in Italy", href: "/study-in-italy" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  courses: [
    { label: "A1 - Beginner", href: "/courses" },
    { label: "A2 - Elementary", href: "/courses" },
    { label: "B1 - Intermediate", href: "/courses" },
    { label: "B2 - Upper Intermediate", href: "/courses" },
    { label: "CELI Exam Prep", href: "/courses" },
  ],
  services: [
    { label: "Study Visa Assistance", href: "/study-in-italy" },
    { label: "Document Preparation", href: "/study-in-italy" },
    { label: "Online Courses", href: "/courses" },
    { label: "In-Person Classes", href: "/courses" },
  ],
};

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-italy-green to-italy-red flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">FORMAT</span>
                <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
                  Italian School
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-italy-green" />
                <span>Tunisia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-italy-green" />
                <span>+216 XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-italy-green" />
                <span>contact@format-italian.tn</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">School</h4>
            <ul className="space-y-2.5">
              {footerLinks.school.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Courses</h4>
            <ul className="space-y-2.5">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Format Italian School. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/ecoleformat/?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-italy-green transition-colors"
            >
              <FacebookIcon className="w-4 h-4 text-white" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-italy-red transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
