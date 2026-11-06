"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/section-heading";
import { contactDetails } from "@/content";
import type { Dictionary } from "@/content/types";

/** The site has no server, so FormSubmit relays messages to this inbox. */
const ENDPOINT = `https://formsubmit.co/ajax/${contactDetails.email}`;

type Status = "idle" | "sending" | "sent" | "failed";

export function Contact({ text }: { text: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "");

    // Bots fill the hidden field; people never see it.
    if (value("_honey")) return;

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          [text.name]: value("name"),
          [text.phone]: value("phone"),
          [text.email]: value("email"),
          [text.details]: value("details"),
          _subject: `${text.subject} ${value("name")}`,
          _template: "table",
          _captcha: "false",
          ...(value("email") && { _replyto: value("email") }),
        }),
      });
      const result = await response.json();
      if (!response.ok || String(result.success) !== "true") throw new Error(result.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-5 py-20">
      <SectionHeading title={text.heading} lede={text.lede} />

      <form onSubmit={send} className="grid gap-4 sm:grid-cols-2">
        <input name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <input data-fade name="name" required autoComplete="name" aria-label={text.name} placeholder={text.name} className="field" />
        <input data-fade name="phone" type="tel" required dir="auto" autoComplete="tel" aria-label={text.phone} placeholder={text.phone} className="field" />
        <input data-fade name="email" type="email" dir="auto" autoComplete="email" aria-label={text.email} placeholder={text.email} className="field sm:col-span-2" />
        <textarea data-fade name="details" required rows={4} aria-label={text.details} placeholder={text.details} className="field sm:col-span-2" />
        <div className="flex items-center justify-end gap-4 sm:col-span-2">
          <p aria-live="polite" className="text-sm text-muted">
            {status === "sent" && text.sent}
            {status === "failed" && (
              <>
                {text.failed}{" "}
                <a href={`mailto:${contactDetails.email}`} dir="ltr" className="text-accent underline">
                  {contactDetails.email}
                </a>
              </>
            )}
          </p>
          <button data-fade type="submit" disabled={status === "sending"} className="btn btn-ghost shrink-0 disabled:opacity-60">
            {status === "sending" ? text.sending : text.send}
          </button>
        </div>
      </form>
    </section>
  );
}
