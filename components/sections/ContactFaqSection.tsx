"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { faqs } from "@/data/faq";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { hasHostPhone, hasWhatsApp, telHref, viberHref, whatsappHref } from "@/lib/whatsapp";
import { ViberIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useSite } from "@/components/providers/SiteProvider";
import { Section } from "@/components/ui/Section";

export function ContactFaqSection() {
  const { openBooking } = useSite();
  const address = `${site.location.street}, ${site.location.locality}, ${site.location.city}`;
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <Section id="kontakt">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-sea/8 bg-white p-6 md:p-8">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-terra uppercase">{copy.contact.kicker}</p>
          <h2 className="mt-3 font-display text-2xl text-sea sm:text-4xl">{copy.contact.heading}</h2>
          <p className="mt-2 text-sm text-muted">{copy.contact.lead}</p>
          <p className="mt-6 text-[0.68rem] tracking-[0.18em] text-muted uppercase">{copy.contact.hostsLabel}</p>
          <p className="mt-1 font-display text-3xl">{site.hosts}</p>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-terra" />
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                  {copy.contact.addressLabel}
                </dt>
                <dd className="mt-1">
                  <a href={site.location.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-terra">
                    {address}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-terra" />
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                  {copy.contact.phoneLabel}
                </dt>
                <dd className="mt-1 text-muted">
                  {hasHostPhone() ? (
                    <a href={telHref()} className="font-semibold text-ink hover:text-terra">
                      {site.contact.phoneDisplay}
                    </a>
                  ) : (
                    copy.contact.pending
                  )}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-terra" />
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                  {copy.contact.hoursLabel}
                </dt>
                <dd className="mt-1">
                  {copy.contact.checkInLabel}: {site.checkIn}
                  <br />
                  {copy.contact.checkOutLabel}: {site.checkOut}
                </dd>
              </div>
            </div>
          </dl>

          <button
            type="button"
            onClick={openBooking}
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-terra text-[0.72rem] font-semibold tracking-[0.12em] text-white uppercase"
          >
            {copy.inquiry.cta}
          </button>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {hasHostPhone() ? (
              <a
                href={telHref()}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-sea/15 text-[0.68rem] font-semibold uppercase"
              >
                <Phone className="size-3.5" />
                {copy.contact.callCta}
              </a>
            ) : null}
            {hasWhatsApp() ? (
              <a
                href={whatsappHref()}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-sea/15 text-[0.68rem] font-semibold uppercase"
              >
                <WhatsAppIcon className="size-3.5" />
                {copy.contact.whatsappCta}
              </a>
            ) : null}
            {hasHostPhone() ? (
              <a
                href={viberHref()}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-sea/15 text-[0.68rem] font-semibold uppercase"
              >
                <ViberIcon className="size-3.5" />
                {copy.contact.viberCta}
              </a>
            ) : null}
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-paper-deep p-6 md:p-8">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-terra uppercase">{copy.contact.faqKicker}</p>
          <h2 className="mt-3 font-display text-2xl text-sea sm:text-4xl">{copy.contact.faqHeading}</h2>
          <p className="mt-2 text-sm text-muted">{copy.contact.faqLead}</p>
          <div className="mt-6 divide-y divide-sea/10">
            {faqs.map((faq) => {
              const expanded = open === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : faq.id)}
                    className="flex min-h-11 w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold"
                    aria-expanded={expanded}
                  >
                    {faq.question}
                    <ChevronDown className={`size-4 shrink-0 text-terra transition ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-sm leading-relaxed text-muted">{faq.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
