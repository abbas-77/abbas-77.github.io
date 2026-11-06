"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const SECTIONS = ["top", "services", "about", "portfolio", "contact"] as const;
type Section = (typeof SECTIONS)[number];

type Props = {
  lang: Locale;
  labels: Dictionary["nav"];
  page: "home" | "work";
};

export function Nav({ lang, labels, page }: Props) {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Section>(page === "home" ? "top" : "portfolio");
  const [open, setOpen] = useState(false);

  const text: Record<Section, string> = {
    top: labels.home,
    services: labels.services,
    about: labels.about,
    portfolio: labels.portfolio,
    contact: labels.contact,
  };

  const href = (id: Section) => (page === "home" ? `#${id}` : `/${lang}#${id}`);
  const otherLanguage = `/${lang === "fa" ? "en" : "fa"}${page === "work" ? "/work" : ""}`;

  useGSAP(
    () => {
      if (page !== "home") return;
      const main = header.current!.nextElementSibling as HTMLElement;
      SECTIONS.forEach((id) => {
        ScrollTrigger.create({
          trigger: main.querySelector(`[id="${id}"]`),
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        });
      });
    },
    { scope: header },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (open) {
          gsap.fromTo(
            menu.current!.children,
            { y: 14, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.35, stagger: 0.05, ease: "power3.out" },
          );
        }
      });
      return () => mm.revert();
    },
    { dependencies: [open], scope: header },
  );

  const linkClass = (id: Section) =>
    `transition-colors hover:text-accent ${active === id ? "font-bold text-accent" : "text-muted"}`;

  return (
    <header ref={header} className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:flex md:justify-between">
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? labels.closeMenu : labels.openMenu}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 flex-col items-start justify-center gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-text" />
          <span className="h-0.5 w-4 bg-text" />
          <span className="h-0.5 w-6 bg-text" />
        </button>

        <a href={page === "home" ? "#top" : `/${lang}`} dir="ltr" className="logo text-xl">
          AZIMUTH
        </a>

        <nav aria-label={labels.primary} className="hidden gap-8 md:flex">
          {SECTIONS.map((id) => (
            <a key={id} href={href(id)} className={linkClass(id)}>
              {text[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <a href={otherLanguage} lang={lang === "fa" ? "en" : "fa"} className="hidden text-muted hover:text-accent md:block">
            {labels.otherLanguage}
          </a>
          <a href={href("contact")} className="btn btn-primary px-3 text-sm whitespace-nowrap sm:px-6">
            {labels.hire}
          </a>
        </div>
      </div>

      {open && (
        <div ref={menu} className="flex flex-col gap-1 border-t border-line px-5 py-4 md:hidden">
          {SECTIONS.map((id) => (
            <a key={id} href={href(id)} onClick={() => setOpen(false)} className={`py-2 ${linkClass(id)}`}>
              {text[id]}
            </a>
          ))}
          <a href={otherLanguage} lang={lang === "fa" ? "en" : "fa"} className="py-2 text-muted">
            {labels.otherLanguage}
          </a>
        </div>
      )}
    </header>
  );
}
