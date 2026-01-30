import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { translations, Language, Translations, defaultLanguage } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract language from URL path
  const getLanguageFromPath = (): Language => {
    const pathLang = location.pathname.split("/")[1] as Language;
    if (pathLang && ["fr", "en", "es"].includes(pathLang)) {
      return pathLang;
    }
    return defaultLanguage;
  };

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);

  // Update language when path changes
  useEffect(() => {
    const pathLang = getLanguageFromPath();
    if (pathLang !== language) {
      setLanguageState(pathLang);
    }
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    
    // Get the current path without language prefix
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(fr|en|es)/, "") || "/";
    
    // Navigate to new language path
    navigate(`/${lang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`);
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
