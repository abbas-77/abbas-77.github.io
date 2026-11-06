import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";

export function Experience({ text }: { text: Dictionary["experience"] }) {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-5 py-20">
      <SectionHeading title={text.heading} lede={text.lede} />
      <ol className="grid gap-3">
        {text.jobs.map((job) => (
          <li
            key={job.company}
            data-fade
            className="grid gap-1 rounded-xl bg-panel px-6 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <p className="font-bold text-accent">{job.period}</p>
            <div>
              <h3 className="font-bold">{job.company}</h3>
              <p className="text-sm text-muted">{job.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
