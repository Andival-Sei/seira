import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";
import { fallbackLocale, supportedLocales, type AppLocale } from "./locales";
import { resources } from "./resources";

function resolveAppLocale(language?: string): AppLocale {
  const languageCode = language?.split("-")[0];
  return supportedLocales.includes(languageCode as AppLocale)
    ? (languageCode as AppLocale)
    : fallbackLocale;
}

function updateDocumentLanguage(language?: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = resolveAppLocale(language);
}

i18n.on("languageChanged", updateDocumentLanguage);

void i18n
  .use(ICU)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: fallbackLocale,
    supportedLngs: [...supportedLocales],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    defaultNS: "common",
    ns: ["common"],
    detection: {
      order: ["navigator", "htmlTag"],
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    updateDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
  });

export { i18n };
