import { useLanguage } from "@/i18n/LanguageContext";
import { Language, languageNames } from "@/i18n/translations";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ["fr", "en", "es"];

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
            language === lang
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          aria-label={`Switch to ${lang.toUpperCase()}`}
        >
          {languageNames[lang]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
