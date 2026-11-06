"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/section-heading";
import { contactDetails } from "@/content";
import type { Dictionary } from "@/content/types";

/** The site has no server, so sending hands off to the visitor's email app. */
export function Contact({ text }: { text: Dictionary["contact"] }) {
  const [opened, setOpened] = useState(false);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "");
    const lines = [
      `${text.name}: ${value("name")}`,
      `${text.phone}: ${value("phone")}`,
      ...(value("email") ? [`${text.email}: ${value("email")}`] : []),
      "",
      value("details"),
    ];
    const subject = encodeURIComponent(`${text.subject} ${value("name")}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-5 py-20">
      <SectionHeading title={text.heading} lede={text.lede} />

      <form onSubmit={send} className="grid gap-4 sm:grid-cols-2">
        <input data-fade name="name" required autoComplete="name" aria-label={text.name} placeholder={text.name} className="field" />
        <input data-fade name="phone" type="tel" required dir="auto" autoComplete="tel" aria-label={text.phone} placeholder={text.phone} className="field" />
        <input data-fade name="email" type="email" dir="auto" autoComplete="email" aria-label={text.email} placeholder={text.email} className="field sm:col-span-2" />
        <textarea data-fade name="details" required rows={4} aria-label={text.details} placeholder={text.details} className="field sm:col-span-2" />
        <div className="flex items-center justify-end gap-4 sm:col-span-2">
          <p aria-live="polite" className="text-sm text-muted">
            {opened ? text.sent : ""}
          </p>
          <button data-fade type="submit" className="btn btn-ghost shrink-0">
            {text.send}
          </button>
        </div>
      </form>
    </section>
  );
}
