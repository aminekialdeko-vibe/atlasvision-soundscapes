import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Language = "fr" | "en" | "es";

export const translations = {
  fr,
  en,
  es,
} as const;

export type Translations = typeof en;

export const languageNames: Record<Language, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
};

export const defaultLanguage: Language = "fr";
