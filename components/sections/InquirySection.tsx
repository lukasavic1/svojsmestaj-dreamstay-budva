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
    <Section id="upit">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm lg:p-8">
          <p className="text-[11px] font-bold tracking-[0.18em] text-terra uppercase">{copy.inquiry.kicker}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight lg:text-3xl">{copy.inquiry.heading}</h2>
          <p className="mt-2 text-sm text-muted">{copy.inquiry.lead}</p>
          <button
            type="button"
            onClick={openBooking}
            className="mt-8 flex min-h-12 w-full items-center justify-center rounded-full bg-terra text-sm font-bold text-white sm:w-auto sm:px-10"
          >
            {copy.inquiry.cta}
          </button>
        </div>
        <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-[11px] font-bold tracking-wide text-muted uppercase">{copy.inquiry.fromLabel}</p>
          <p className="font-display text-3xl font-semibold text-terra">{copy.inquiry.fromValue}</p>
          <p className="text-sm text-muted">{copy.inquiry.fromHint}</p>
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {inquiryPerks.map((label) => (
              <li key={label} className="flex gap-2">
                <span className="text-sage">✓</span>
                {label}
              </li>
            ))}
          </ul>
          {hasWhatsApp() ? (
            <a
              href={whatsappHref()}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-terra text-sm font-bold text-white"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {copy.contact.whatsappCta}
            </a>
          ) : (
            <button
              type="button"
              onClick={openBooking}
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-terra text-sm font-bold text-white"
            >
              {copy.inquiry.cta}
            </button>
          )}
          {hasHostPhone() ? (
            <a
              href={telHref()}
              className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-terra text-sm font-bold text-terra"
            >
              <Phone className="h-4 w-4" /> {copy.contact.callCta}
            </a>
          ) : (
            <p className="mt-3 text-xs leading-relaxed text-muted">{copy.contact.pending}</p>
          )}
        </aside>
      </div>
    </Section>
  );
}
