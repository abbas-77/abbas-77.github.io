import Image from "next/image";
import portrait from "@/assets/abbas-azimi-cutout.webp";
import { SectionHeading } from "@/components/section-heading";
import { contactDetails } from "@/content";
import type { Dictionary } from "@/content/types";

export function About({ text }: { text: Dictionary["about"] }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading title={text.heading} lede={text.lede} />

      <div className="grid items-center gap-12 md:grid-cols-2">
        <div data-clip className="relative mx-auto w-full max-w-md pt-10">
          <div className="absolute inset-x-[6%] top-[22%] bottom-0 rounded-t-full rounded-b-2xl bg-panel" />
          <Image
            src={portrait}
            alt={text.photoAlt}
            sizes="(min-width: 768px) 448px, 100vw"
            className="relative w-full grayscale"
          />
        </div>

        <div>
          {text.paragraphs.map((paragraph) => (
            <p key={paragraph} data-fade className="mb-4 max-w-[62ch] text-muted">
              {paragraph}
            </p>
          ))}
          <a data-fade href={contactDetails.cv} download className="btn btn-primary mt-3">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 20h16" />
            </svg>
            {text.cv}
          </a>
        </div>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {text.skills.map((skill) => {
          const level = skill.level ?? 100;
          return (
            <li key={skill.name} className="text-center">
              <div className="relative mx-auto size-24">
                <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
                  <circle cx="50" cy="50" r="44" fill="none" strokeWidth="7" className="stroke-line" />
                  <circle
                    data-ring={level}
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="100"
                    strokeDashoffset={100 - level}
                    className="stroke-accent"
                  />
                </svg>
                <span dir="ltr" className="absolute inset-0 grid place-items-center text-lg font-bold">
                  {skill.mark}
                </span>
              </div>
              {skill.level !== undefined && (
                <p className="mt-2 font-bold text-accent">{skill.level}%</p>
              )}
              <p dir="ltr" className="mt-2 text-muted">
                {skill.name}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
