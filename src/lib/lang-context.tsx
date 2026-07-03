"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "PT";

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>("EN");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // Hydration fix: we still need to avoid rendering the mismatched language immediately
  // But we MUST wrap the children in the Provider so useLang() works
  if (!mounted) {
    return (
      <LangContext.Provider value={{ lang, setLang: handleSetLang }}>
        <div style={{ opacity: 0 }}>{children}</div>
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang }}>
      <div style={{ opacity: 1, transition: "opacity 0.3s ease-in" }}>
        {children}
      </div>
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
};
