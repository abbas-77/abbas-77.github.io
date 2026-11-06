import type { Metadata, Viewport } from "next";
import { Lato, Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "@/content";
import "../globals.css";

const latin = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const persian = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: { fa: "/fa", en: "/en" } },
  };
}

export const viewport: Viewport = {
  themeColor: "#141414",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={getDictionary(lang).dir}
      className={`${latin.variable} ${persian.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
