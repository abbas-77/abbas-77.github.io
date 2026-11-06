import { en } from "./en";
import { fa } from "./fa";
import type { Dictionary } from "./types";

export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, Dictionary> = { fa, en };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const contactDetails = {
  email: "abbasazimii@gmail.com",
  github: "https://github.com/abbas-77",
  cv: "/abbas-azimi-cv.pdf",
};
