"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import academy from "@/assets/work/academy.webp";
import alitapet from "@/assets/work/alitapet.webp";
import ctelecom from "@/assets/work/ctelecom.webp";
import customer from "@/assets/work/customer.webp";
import nothing from "@/assets/work/nothing.webp";
import services from "@/assets/work/services.webp";
import sohasys from "@/assets/work/sohasys.webp";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";
import { Flip, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

const SCREENSHOTS = { academy, alitapet, ctelecom, customer, nothing, services, sohasys };

type Props = { text: Dictionary["portfolio"]; title?: string };

export function Portfolio({ text, title = text.heading }: Props) {
  const root = useRef<HTMLElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState(text.all);

  const filters = [text.all, ...new Set(text.projects.map((project) => project.filter))];

  const choose = (next: string) => {
    if (next === filter) return;
    flipState.current = Flip.getState("[data-card]", { props: "opacity" });
    setFilter(next);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        Flip.from(state, {
          duration: 0.6,
          ease: "power3.inOut",
          absolute: true,
          scale: true,
          onEnter: (cards) =>
            gsap.fromTo(cards, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.5 }),
          onLeave: (cards) => gsap.to(cards, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
        });
      });
    },
    { dependencies: [filter], scope: root },
  );

  return (
    <section ref={root} id="portfolio" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading title={title} />

      <div role="group" aria-label={title} className="mb-8 flex flex-wrap justify-center gap-3">
        {filters.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={filter === name}
            onClick={() => choose(name)}
            className={`rounded-md px-5 py-2 text-sm font-bold transition-colors ${
              filter === name ? "bg-accent text-bg" : "bg-panel text-text hover:text-accent"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {text.projects.map((project) => (
          <li
            key={project.id}
            data-card
            className={filter === text.all || filter === project.filter ? "" : "hidden"}
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl bg-panel"
            >
              <div className="overflow-hidden">
                <Image
                  src={SCREENSHOTS[project.id]}
                  alt={project.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                <span className="font-bold group-hover:text-accent">{project.name}</span>
                <span className="text-muted">{project.category}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
