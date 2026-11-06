"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/section-heading";
import { contactDetails } from "@/content";
import type { Dictionary } from "@/content/types";

type Props = { text: Dictionary["contact"]; services: string[] };

/** There is no mail server yet, so sending hands off to the visitor's email app. */
export function Contact({ text, services }: Props) {
  const [sent, setSent] = useState(false);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "");
    const lines = [
      `${text.name}: ${value("name")}`,
      `${text.email}: ${value("email")}`,
      `${text.phone}: ${value("phone")}`,
      `${text.service}: ${value("service")}`,
      `${text.timeline}: ${value("timeline")}`,
      "",
      value("details"),
    ];
    const subject = encodeURIComponent(`${text.subject} ${value("name")}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-5 py-20">
      <SectionHeading title={text.heading} lede={text.lede} />

      <form onSubmit={send} className="grid gap-4 sm:grid-cols-2">
        <input data-fade name="name" required aria-label={text.name} placeholder={text.name} className="field" />
        <input data-fade name="email" type="email" required dir="auto" aria-label={text.email} placeholder={text.email} className="field" />
        <input data-fade name="phone" type="tel" dir="auto" aria-label={text.phone} placeholder={text.phone} className="field" />
        <select data-fade name="service" aria-label={text.service} defaultValue="" className="field">
          <option value="" disabled>
            {text.service}
          </option>
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
        <input data-fade name="timeline" aria-label={text.timeline} placeholder={text.timeline} className="field self-start" />
        <textarea data-fade name="details" required rows={4} aria-label={text.details} placeholder={text.details} className="field" />
        <div className="flex items-center justify-end gap-4 sm:col-span-2">
          <p aria-live="polite" className="text-sm text-muted">
            {sent ? text.sent : ""}
          </p>
          <button data-fade type="submit" className="btn btn-ghost">
            {text.send}
          </button>
        </div>
      </form>
    </section>
  );
}
