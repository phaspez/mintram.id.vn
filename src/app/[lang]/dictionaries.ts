import "server-only";

export type langOption = "en" | "vi";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  vi: () => import("./dictionaries/vi.json").then((module) => module.default),
  jp: () => import("./dictionaries/jp.json").then((module) => module.default),
};

export const getDictionary = async (locale: langOption) =>
  dictionaries[locale]();
