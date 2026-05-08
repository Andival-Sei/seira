import { useTranslation } from "react-i18next";
import {
  fallbackLocale,
  localeLabels,
  supportedLocales,
  type AppLocale,
} from "@/i18n/locales";

export function LanguageSelect() {
  const { i18n, t } = useTranslation();
  const currentLocale = supportedLocales.includes(i18n.language as AppLocale)
    ? (i18n.language as AppLocale)
    : fallbackLocale;

  return (
    <select
      aria-label={t("language.label")}
      className="h-9 rounded-lg border border-white/10 bg-white/[0.045] px-2.5 text-sm font-medium text-ice/72 outline-none transition duration-300 hover:border-white/18 hover:text-ice focus:border-mint/55"
      onChange={(event) => {
        void i18n.changeLanguage(event.target.value);
      }}
      value={currentLocale}
    >
      {supportedLocales.map((locale) => (
        <option className="bg-graphite text-ice" key={locale} value={locale}>
          {localeLabels[locale]}
        </option>
      ))}
    </select>
  );
}
