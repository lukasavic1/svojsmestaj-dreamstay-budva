"use client";

import { MapPin, Phone, Sun } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { BrandMark } from "@/components/ui/BrandMark";
import { site } from "@/data/site";
import { copy } from "@/data/copy";
import { hasHostPhone, hasWhatsApp, telHref, whatsappHref } from "@/lib/whatsapp";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 rounded-[2rem] bg-white p-6 shadow-[0_16px_40px_-30px_rgba(58,53,47,0.55)] md:grid-cols-3 md:p-8">
          <div>
            <div className="inline-flex items-center gap-2 font-display text-xl font-semibold text-terra">
              <BrandMark className="size-10" />
              {site.name}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{copy.footer.tagline}</p>
            {site.contact.email ? (
              <p className="mt-2 text-sm text-muted">{site.contact.email}</p>
            ) : null}
          </div>
          <div>
            <h3 className="text-[11px] font-bold tracking-wide text-terra uppercase">{copy.footer.stay}</h3>
            <p className="mt-3 text-sm text-muted">
              {copy.footer.checkIn} {site.checkIn} · {copy.footer.checkOut} {site.checkOut}
            </p>
            <p className="mt-2 text-sm text-muted">Min. boravak: {site.minNights} noćenja</p>
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-start gap-2 text-sm font-semibold text-ink hover:text-terra"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-sage" />
              {site.location.street}, {site.location.locality}
            </a>
          </div>
          <div>
            <h3 className="text-[11px] font-bold tracking-wide text-terra uppercase">{copy.footer.contact}</h3>
            {hasHostPhone() ? (
              <a href={telHref()} className="mt-3 flex items-center gap-2 text-sm hover:text-terra">
                <Phone className="size-4" />
                {site.contact.phoneDisplay}
              </a>
            ) : (
              <p className="mt-3 text-sm text-muted">{copy.contact.pending}</p>
            )}
            {hasWhatsApp() ? (
              <a href={whatsappHref()} className="mt-2 block text-sm text-muted hover:text-terra">
                WhatsApp
              </a>
            ) : null}
            {site.social.instagram ? (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="mt-4 inline-flex size-11 items-center justify-center rounded-full border border-terra/30 text-terra hover:border-terra"
              >
                <InstagramIcon className="size-4" />
              </a>
            ) : (
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
                <Sun className="size-4 text-terra" />
                {copy.footer.follow}
              </p>
            )}
            <p className="mt-6 text-[11px] text-muted">
              © {year} {site.legalName}. {copy.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
