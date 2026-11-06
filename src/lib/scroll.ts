import type Lenis from "lenis";

const HEADER_OFFSET = -88;

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTarget(target: HTMLElement) {
  if (lenis) lenis.scrollTo(target, { duration: 1.2, offset: HEADER_OFFSET });
  else target.scrollIntoView();
}
