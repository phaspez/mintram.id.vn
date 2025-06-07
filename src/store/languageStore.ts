import { create } from "zustand";
import { langOption } from "@/app/[lang]/dictionaries";

interface LanguageState {
  lang: langOption;
  setLang: (lang: langOption) => void;
  initializeLang: (lang: langOption) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
  initializeLang: (lang) => set({ lang }),
}));
