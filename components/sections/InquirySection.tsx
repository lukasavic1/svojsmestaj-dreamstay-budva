"use client";

import { Phone } from "lucide-react";
import { copy } from "@/data/copy";
import { inquiryPerks } from "@/data/content";
import { useSite } from "@/components/providers/SiteProvider";
import { hasHostPhone, hasWhatsApp, telHref, whatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { Section } from "@/components/ui/Section";

export function InquirySection() {
  const { openBooking } = useSite();

  return (
    <Section id="upit" className="bg-paper-deep">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_50px_-32px_rgba(43,58,65,0.28)] lg:grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-6 lg:p-10">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-terra uppercase">{copy.inquiry.kicker}</p>
          <h2 className="mt-3 font-display text-2xl leading-tight text-sea sm:text-4xl">{copy.inquiry.heading}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{copy.inquiry.lead}</p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {inquiryPerks.map((label) => (
              <li key={label} className="flex gap-2">
                <span className="text-terra">✓</span>
                {label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openBooking}
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-terra px-8 text-sm font-semibold text-white hover:bg-terra-deep"
          >
            {copy.inquiry.cta}
          </button>
        </div>
        <aside className="flex flex-col justify-between bg-sea p-6 text-paper lg:p-10">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-paper/55 uppercase">{copy.inquiry.fromLabel}</p>
            <p className="mt-2 font-display text-3xl sm:text-4xl">{copy.inquiry.fromValue}</p>
            <p className="mt-2 text-sm text-paper/70">{copy.inquiry.fromHint}</p>
          </div>
          <div className="mt-8 space-y-2">
            {hasWhatsApp() ? (
              <a
                href={whatsappHref()}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-terra text-sm font-semibold"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {copy.contact.whatsappCta}
              </a>
            ) : null}
            {hasHostPhone() ? (
              <a
                href={telHref()}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" /> {copy.contact.callCta}
              </a>
            ) : (
              <p className="text-xs leading-relaxed text-paper/65">{copy.contact.pending}</p>
            )}
          </div>
        </aside>
      </div>
    </Section>
  );
}
