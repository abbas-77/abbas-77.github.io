"use client";

import Lenis from "lenis";
import { useRef } from "react";
import { MOTION_OK, ScrollTrigger, SplitText, gsap, useGSAP } from "@/lib/gsap";
import { registerLenis, scrollToTarget } from "@/lib/scroll";

/**
 * Runs the smooth scroller and the scroll effects, so sections can stay Server
 * Components and opt in with data attributes:
 *
 *   data-reveal   masked line-by-line rise, for headings
 *   data-fade     rise into place, batched with neighbours
 *   data-clip     wipe open from the bottom
 *   data-ring     draw an SVG ring to its value
 *   data-count    count up to this number
 *
 * Render this right after <main>. Everything stays inside that <main> because
 * Next.js keeps the previous page in the DOM, hidden, after a navigation.
 */
export function MotionRoot() {
  const marker = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const main = marker.current!.previousElementSibling as HTMLElement;
    const findSection = (hash: string) =>
      hash ? main.querySelector<HTMLElement>(`[id="${hash.slice(1)}"]`) : null;

    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const target = link && findSection(link.hash);
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
    };
    document.addEventListener("click", onAnchorClick);

    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({ lerp: 0.1 });
      const raf = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      registerLenis(lenis);

      const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, main);
      const number = new Intl.NumberFormat(document.documentElement.lang, { useGrouping: false });

      all("[data-reveal]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.08,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      const fading = all("[data-fade]");
      gsap.set(fading, { y: 28, autoAlpha: 0 });
      ScrollTrigger.batch(fading, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }),
      });

      all("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(-20% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          },
        );
      });

      all("[data-ring]").forEach((ring) => {
        gsap.fromTo(
          ring,
          { strokeDashoffset: 100 },
          {
            strokeDashoffset: 100 - Number(ring.dataset.ring),
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: { trigger: ring, start: "top 90%", once: true },
          },
        );
      });

      all("[data-count]").forEach((el) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: Number(el.dataset.count),
          duration: 1.4,
          delay: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = number.format(Math.round(counter.value));
          },
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
      });

      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
        const target = findSection(window.location.hash);
        if (target) scrollToTarget(target);
      });

      return () => {
        registerLenis(null);
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => {
      document.removeEventListener("click", onAnchorClick);
      mm.revert();
    };
  });

  return <span ref={marker} hidden />;
}
