"use client";

import * as Accordion from "@radix-ui/react-accordion";
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

  return (
    <Section id="kontakt" className="bg-paper-deep">
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        <div className="flex h-full min-w-0 flex-col rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <p className="text-[11px] font-bold tracking-[0.18em] text-terra uppercase">{copy.contact.kicker}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight lg:text-3xl">{copy.contact.heading}</h2>
          <p className="mt-2 text-sm text-muted">{copy.contact.lead}</p>
          <p className="mt-6 text-[0.68rem] tracking-[0.18em] text-sage uppercase">{copy.contact.hostsLabel}</p>
          <p className="mt-1 font-display text-2xl">{site.hosts}</p>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-terra" />
              <div className="min-w-0">
                <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                  {copy.contact.addressLabel}
                </dt>
                <dd className="mt-1 text-ink">
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
                <dd className="mt-1">
                  {hasHostPhone() ? (
                    <a href={telHref()} className="font-semibold text-ink hover:text-terra">
                      {site.contact.phoneDisplay}
                    </a>
                  ) : (
                    <span className="text-muted">{copy.contact.pending}</span>
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
                <dd className="mt-1 text-ink">
                  {copy.contact.checkInLabel}: {site.checkIn}
                  <br />
                  {copy.contact.checkOutLabel}: {site.checkOut}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-auto grid grid-cols-1 gap-2 pt-6 sm:grid-cols-3">
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex h-12 items-center justify-center rounded-full bg-terra px-3 text-[0.68rem] font-bold tracking-[0.08em] text-white uppercase sm:col-span-3"
            >
              {copy.inquiry.cta}
            </button>
            {hasHostPhone() ? (
              <a
                href={telHref()}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border-2 border-terra px-2 text-[0.68rem] font-bold text-terra uppercase"
              >
                <Phone className="size-3.5" />
                {copy.contact.callCta}
              </a>
            ) : null}
            {hasWhatsApp() ? (
              <a
                href={whatsappHref()}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border-2 border-terra px-2 text-[0.68rem] font-bold text-terra uppercase"
              >
                <WhatsAppIcon className="size-3.5" />
                {copy.contact.whatsappCta}
              </a>
            ) : null}
            {hasHostPhone() ? (
              <a
                href={viberHref()}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border-2 border-terra px-2 text-[0.68rem] font-bold text-terra uppercase"
              >
                <ViberIcon className="size-3.5" />
                {copy.contact.viberCta}
              </a>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <p className="text-[11px] font-bold tracking-[0.18em] text-terra uppercase">{copy.contact.faqKicker}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight lg:text-3xl">{copy.contact.faqHeading}</h2>
          <p className="mt-2 text-sm text-muted">{copy.contact.faqLead}</p>
          <Accordion.Root type="single" collapsible className="mt-6 divide-y divide-ink/8">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.id} value={faq.id}>
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-bold">
                    {faq.question}
                    <ChevronDown className="size-4 shrink-0 text-terra transition group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden pb-4 text-sm leading-relaxed text-muted data-[state=closed]:animate-none">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </Section>
  );
}
