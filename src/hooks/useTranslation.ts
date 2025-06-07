import { useLanguageStore } from "@/store/languageStore";
import { useEffect, useState } from "react";

type TranslationType = {
  [key: string]: string | TranslationType;
};

export function useTranslation() {
  const { lang } = useLanguageStore();
  const [translations, setTranslations] = useState<TranslationType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const dictionary = await import(
          `@/app/[lang]/dictionaries/${lang}.json`
        );
        setTranslations(dictionary.default);
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTranslations();
  }, [lang]);

  const t = (key: string) => {
    if (isLoading) return key;
    if (!translations) return key;

    const keys = key.split(".");
    let value: TranslationType = translations;

    for (const k of keys) {
      if (typeof value === "string" || value[k] === undefined) return key;
      value = value[k] as TranslationType;
    }

    return typeof value === "string" ? value : key;
  };

  return { t, lang, isLoading };
}
