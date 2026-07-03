import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

import { I18nProvider } from "@/lib/i18nContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Format | Italian Language School - Learn Italian in Tunisia",
  description: "Format is a leading Italian language school in Tunisia offering face-to-face and online courses. CELI exam preparation, accredited by University of Perugia. B2 for study visa, B1 for nationality, A1 for work visa.",
  keywords: "Italian language school, learn Italian, CELI exam, study in Italy, Italian courses Tunisia, B2 visa, B1 nationality, A1 work visa",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <I18nProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
