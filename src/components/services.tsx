import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/content/types";

const ICONS: Record<string, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  deploy: (
    <>
      <path d="M12 15V4m0 0-4 4m4-4 4 4" />
      <path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    </>
  ),
  full: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12.5 9 5 9-5M3 17l9 4.5L21 17" />
    </>
  ),
};

export function Services({ text }: { text: Dictionary["services"] }) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading title={text.heading} lede={text.lede} />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
        {text.items.map((item) => (
          <li
            key={item.title}
            data-fade
            className="group rounded-2xl bg-panel px-4 py-7 text-center transition-transform duration-300 hover:-translate-y-1.5 md:px-8"
          >
            <svg
              viewBox="0 0 24 24"
              className="mx-auto size-9 text-accent transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {ICONS[item.icon]}
            </svg>
            <h3 className="mt-3 font-bold text-accent">{item.title}</h3>
            <p className="mt-3 text-sm text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
