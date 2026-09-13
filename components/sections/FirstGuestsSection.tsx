"use client";

import { copy } from "@/data/copy";
import { photos } from "@/data/media";
import { useSite } from "@/components/providers/SiteProvider";
import { Section } from "@/components/ui/Section";
import { RingPhoto } from "@/components/ui/RingPhoto";

export function FirstGuestsSection() {
  const { openBooking } = useSite();

  return (
    <Section id="boravak" className="bg-paper-deep">
      <article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-[0_16px_40px_-30px_rgba(58,53,47,0.55)] lg:p-10">
        <p className="text-[11px] font-bold tracking-[0.18em] text-terra uppercase">{copy.firstGuests.kicker}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight lg:text-4xl">{copy.firstGuests.heading}</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted lg:text-base">{copy.firstGuests.lead}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <RingPhoto src={photos.balconySunset} alt="Balkon u zlatnom satu" />
          <div>
            <span className="inline-flex rounded-full bg-sage px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
              {copy.firstGuests.badge}
            </span>
            <p className="mt-2 text-sm font-bold">Dream Stay · Babilonija</p>
          </div>
        </div>
        <button
          type="button"
          onClick={openBooking}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-terra px-6 text-sm font-bold text-white"
        >
          {copy.firstGuests.cta}
        </button>
      </article>
    </Section>
  );
}
