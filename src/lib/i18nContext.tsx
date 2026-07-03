"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, dictionaries } from "./dictionaries";

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => any;
};

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: () => "",
});

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as Language;
    if (savedLang && ["en", "fr", "it"].includes(savedLang)) {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = dictionaries[lang];
    for (const key of keys) {
      if (current[key] === undefined) {
        return path; // Fallback to key path if not found
      }
      current = current[key];
    }
    return current;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);
