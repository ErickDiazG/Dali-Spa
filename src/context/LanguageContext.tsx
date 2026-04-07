import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type TranslationKey } from "../locales";

export type Language = "es" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("dali_lang") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("dali_lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    // If not mounted yet (SSR phase in Astro), render the default 'es' language
    const languageData = translations[mounted ? lang : "es"];
    
    const keys = key.split(".");
    let value: any = languageData;
    
    for (const k of keys) {
      if (value === undefined) return key as string;
      value = value[k];
    }
    
    return (value as string) || (key as string);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
