import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, useGSAP);

/** Media query that every decorative animation is gated behind. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { Flip, gsap, ScrollTrigger, SplitText, useGSAP };
