"use client";

import Image from "next/image";
import { copy } from "@/data/copy";
import { photos } from "@/data/media";
import { useSite } from "@/components/providers/SiteProvider";
import { Section } from "@/components/ui/Section";

export function FirstGuestsSection() {
  const { openBooking } = useSite();

  return (
    <Section id="boravak">
      <article className="relative overflow-hidden rounded-[2rem] bg-sea text-paper">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Image
            src={photos.balconySunset}
            alt="Balkon u zlatnom satu"
            fill
            sizes="50vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-sea" />
        </div>
        <div className="relative max-w-xl px-6 py-12 lg:px-12 lg:py-16">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-terra uppercase">{copy.firstGuests.kicker}</p>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-4xl lg:text-5xl">{copy.firstGuests.heading}</h2>
          <p className="mt-4 text-sm leading-relaxed text-paper/75 lg:text-base">{copy.firstGuests.lead}</p>
          <span className="mt-6 inline-flex rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold tracking-wide uppercase">
            {copy.firstGuests.badge}
          </span>
          <div>
            <button
              type="button"
              onClick={openBooking}
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-terra px-6 text-sm font-semibold text-white hover:bg-terra-deep"
            >
              {copy.firstGuests.cta}
            </button>
          </div>
        </div>
      </article>
    </Section>
  );
}
