import { useEffect, useMemo, useState } from "react";
import {
  defaultLocale,
  messages,
  normalizeLocale,
  type Locale,
} from "./messages";

const STORAGE_KEY = "travelio-language";
const EVENT_NAME = "travelio:language-change";

export function readLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) return normalizeLocale(stored);

  return normalizeLocale(window.navigator.language);
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, locale);
  window.document.documentElement.lang = locale;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: locale }));
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const nextLocale = readLocale();
    setLocale(nextLocale);
    window.document.documentElement.lang = nextLocale;

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Locale>;
      setLocale(normalizeLocale(customEvent.detail));
    };

    window.addEventListener(EVENT_NAME, handleLanguageChange);
    return () => window.removeEventListener(EVENT_NAME, handleLanguageChange);
  }, []);

  return locale;
}

export function useTranslations() {
  const locale = useLocale();

  const t = useMemo(
    () => (key: string) => messages[locale][key] ?? messages.en[key],
    [locale],
  );

  return { locale, t };
}
