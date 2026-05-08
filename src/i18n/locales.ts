export const supportedLocales = ["ru", "en"] as const;

export type AppLocale = (typeof supportedLocales)[number];

export const fallbackLocale: AppLocale = "ru";

export const localeLabels: Record<AppLocale, string> = {
  ru: "Русский",
  en: "English",
};
