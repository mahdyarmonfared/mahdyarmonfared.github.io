import { createContext, useContext, useEffect, useState, useCallback } from "react";

const LangContext = createContext(null);
const LS_KEY = "monfared_lang_v2";

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(LS_KEY);
    if (saved === "fa" || saved === "en") return saved;
    return "en"; // Default to English as requested
  });

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "fa" ? "rtl" : "ltr";
    document.title = lang === "fa"
      ? "مهدیار منفرد — توسعه‌دهنده فرانت‌اند | Mahdyar Monfared"
      : "Mahdyar Monfared — Frontend Developer";
    localStorage.setItem(LS_KEY, lang);
  }, [lang]);

  const setLang = useCallback((nextLang) => {
    setLangState(nextLang);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === "en" ? "fa" : "en"));
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}

