export type Job = {
  company: string;
  period: string;
  summary: string;
};

export type Project = {
  id: "customer" | "services" | "nothing" | "academy" | "alitapet" | "sohasys" | "ctelecom";
  name: string;
  category: string;
  filter: string;
  href: string;
  alt: string;
};

export type Dictionary = {
  dir: "rtl" | "ltr";
  meta: { title: string; workTitle: string; description: string };
  nav: {
    home: string;
    services: string;
    about: string;
    portfolio: string;
    contact: string;
    hire: string;
    otherLanguage: string;
    openMenu: string;
    closeMenu: string;
    primary: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    label: string;
    hire: string;
    cv: string;
    photoAlt: string;
    stats: { value: number; suffix: string; label: string }[];
  };
  services: {
    heading: string;
    lede: string;
    items: { icon: string; title: string; text: string }[];
  };
  about: {
    heading: string;
    lede: string;
    paragraphs: string[];
    cv: string;
    photoAlt: string;
    skills: { mark: string; name: string; level?: number }[];
  };
  experience: { heading: string; lede: string; jobs: Job[] };
  portfolio: {
    heading: string;
    all: string;
    projects: Project[];
    seeAll: string;
    pageHeading: string;
    pageLede: string;
    privateHeading: string;
    privateText: string;
  };
  contact: {
    heading: string;
    lede: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    timeline: string;
    details: string;
    send: string;
    sent: string;
    subject: string;
  };
  footer: { credit: string };
};
