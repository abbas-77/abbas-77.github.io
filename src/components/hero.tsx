"use client";

import Image from "next/image";
import { useRef } from "react";
import portrait from "@/assets/abbas-azimi-cutout.webp";
import { Socials } from "@/components/socials";
import { contactDetails, type Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

type Props = { lang: Locale; text: Dictionary["hero"] };

export function Hero({ lang, text }: Props) {
  const root = useRef<HTMLElement>(null);
  const number = new Intl.NumberFormat(lang, { useGrouping: false });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo("[data-disc]", { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1 }, 0)
          .fromTo("[data-portrait]", { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 0.15)
          .fromTo(
            "[data-intro]",
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09 },
            0.2,
          );

        const toX = gsap.quickTo("[data-portrait]", "x", { duration: 0.8, ease: "power3" });
        const toY = gsap.quickTo("[data-disc]", "y", { duration: 1.1, ease: "power3" });
        const onMove = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const offsetX = event.clientX / window.innerWidth - 0.5;
          const offsetY = event.clientY / window.innerHeight - 0.5;
          toX(offsetX * -22);
          toY(offsetY * 18);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative mx-auto grid max-w-6xl items-center gap-10 overflow-x-clip px-5 pt-8 pb-16 md:min-h-[calc(100svh-5rem)] md:grid-cols-2 md:pt-4"
    >
      <div aria-hidden className="hero-glow pointer-events-none absolute start-0 top-0 aspect-square w-full max-w-[32rem]" />

      <div className="relative text-center md:text-start">
        <p data-intro className="pre text-muted">
          {text.greeting}
        </p>
        <p data-intro className="pre text-xl font-bold text-text/80">
          {text.name}
        </p>
        <h1
          data-intro
          className="pre role mt-2 text-[clamp(2.25rem,5.2vw,3.5rem)] leading-snug font-bold"
        >
          {text.role}
        </h1>
        <div data-intro className="pre mt-5 flex justify-center md:justify-start">
          <Socials label={text.label} />
        </div>
        <div data-intro className="pre mt-8 flex justify-center gap-4 md:justify-start">
          <a href="#contact" className="btn btn-primary">
            {text.hire}
          </a>
          <a href={contactDetails.cv} download className="btn btn-ghost">
            {text.cv}
          </a>
        </div>

        <dl
          data-intro
          className="pre mt-10 grid grid-cols-3 rounded-lg bg-panel px-2 py-4 md:w-fit"
        >
          {text.stats.map((stat) => (
            <div key={stat.label} className="border-line px-3 not-last:border-e md:px-5">
              <dd className="text-lg font-bold text-accent">
                <span data-count={stat.value}>{number.format(stat.value)}</span>
                {stat.suffix}
              </dd>
              <dt className="text-sm font-bold">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mx-auto flex aspect-square w-full max-w-md items-end justify-center md:max-w-lg">
        <div data-disc className="pre absolute inset-[6%] rounded-full bg-panel" />
        <div
          data-portrait
          className="pre relative w-full shrink-0 md:w-[112%] [mask-image:linear-gradient(#000_88%,transparent)]"
        >
          <Image
            src={portrait}
            alt={text.photoAlt}
            loading="eager"
            preload
            sizes="(min-width: 768px) 560px, 100vw"
            className="w-full grayscale"
          />
        </div>
      </div>
    </section>
  );
}
