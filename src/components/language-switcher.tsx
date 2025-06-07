"use client";

import { useLanguageStore } from "@/store/languageStore";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { langOption } from "@/app/[lang]/dictionaries";
import { useEffect } from "react";

const languages = {
  en: "English",
  vi: "Tiếng Việt",
  jp: "日本語",
} as const;

export function LanguageSwitcher({ langProp }: { langProp: langOption }) {
  useEffect(() => {
    useLanguageStore.getState().initializeLang(langProp);
  }, [langProp]);

  const { lang, setLang } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLang: langOption) => {
    setLang(newLang);
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const newPath = pathname.replace(/^\/[^\/]+/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {languages[lang]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as langOption)}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
