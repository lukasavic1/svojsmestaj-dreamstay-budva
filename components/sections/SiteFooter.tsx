"use client";

import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { BrandMark } from "@/components/ui/BrandMark";
import { site } from "@/data/site";
import { copy } from "@/data/copy";
import { hasHostPhone, hasWhatsApp, telHref, whatsappHref } from "@/lib/whatsapp";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sea text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 font-display text-2xl">
            <BrandMark className="size-10" />
            {site.name}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">{copy.footer.tagline}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold tracking-wide text-terra uppercase">{copy.footer.stay}</h3>
          <p className="mt-3 text-sm text-paper/70">
            {copy.footer.checkIn} {site.checkIn} · {copy.footer.checkOut} {site.checkOut}
          </p>
          <p className="mt-2 text-sm text-paper/70">Min. boravak: {site.minNights} noćenja</p>
          <a
            href={site.location.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-start gap-2 text-sm hover:text-terra"
          >
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {site.location.street}, {site.location.locality}
          </a>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold tracking-wide text-terra uppercase">{copy.footer.contact}</h3>
          {hasHostPhone() ? (
            <a href={telHref()} className="mt-3 flex items-center gap-2 text-sm hover:text-terra">
              <Phone className="size-4" />
              {site.contact.phoneDisplay}
            </a>
          ) : (
            <p className="mt-3 text-sm text-paper/70">{copy.contact.pending}</p>
          )}
          {hasWhatsApp() ? (
            <a href={whatsappHref()} className="mt-2 block text-sm text-paper/70 hover:text-terra">
              WhatsApp
            </a>
          ) : null}
          {site.social.instagram ? (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="mt-4 inline-flex size-11 items-center justify-center rounded-full border border-white/20 hover:border-terra"
            >
              <InstagramIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-paper/45 sm:px-6">
        © {year} {site.legalName}. {copy.footer.rights}
      </div>
    </footer>
  );
}
