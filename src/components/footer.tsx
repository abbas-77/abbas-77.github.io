import { Socials } from "@/components/socials";
import { contactDetails, type Locale } from "@/content";
import type { Dictionary } from "@/content/types";

type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  credit: string;
  socialsLabel: string;
  page: "home" | "work";
};

export function Footer({ lang, nav, credit, socialsLabel, page }: Props) {
  const href = (id: string) => (page === "home" ? `#${id}` : `/${lang}#${id}`);
  const links = [
    { id: "top", label: nav.home },
    { id: "services", label: nav.services },
    { id: "about", label: nav.about },
    { id: "portfolio", label: nav.portfolio },
    { id: "contact", label: nav.contact },
  ];

  return (
    <footer className="mt-10 bg-panel px-5 py-12 text-center">
      <p dir="ltr" className="logo text-2xl">
        AZIMUTH
      </p>
      <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-muted">
        {links.map((link) => (
          <li key={link.id}>
            <a href={href(link.id)} className="transition-colors hover:text-accent">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Socials label={socialsLabel} />
      </div>
      <div className="mt-5 flex flex-col items-center gap-1 text-muted">
        <a href={`mailto:${contactDetails.email}`} dir="ltr" className="hover:text-accent">
          {contactDetails.email}
        </a>
        <a href={contactDetails.phoneHref} dir="ltr" className="hover:text-accent">
          {contactDetails.phone}
        </a>
      </div>
      <p className="mx-auto mt-6 max-w-xl border-t border-line pt-5 text-sm text-muted">{credit}</p>
    </footer>
  );
}
