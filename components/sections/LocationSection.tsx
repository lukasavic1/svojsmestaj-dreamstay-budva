"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { copy } from "@/data/copy";
import { distances } from "@/data/content";
import { photos } from "@/data/media";
import { site } from "@/data/site";
import { Section, SectionHead } from "@/components/ui/Section";

export function LocationSection() {
  return (
    <Section id="lokacija">
      <SectionHead eyebrow={copy.location.kicker} title={copy.location.heading} lead={copy.location.lead} />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
          <iframe
            title={copy.location.heading}
            src={site.location.mapsEmbed}
            className="h-[280px] w-full border-0 lg:h-full lg:min-h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="grid gap-4">
          <div className="relative min-h-[200px] overflow-hidden rounded-[2rem]">
            <Image
              src={photos.buildingEntrance}
              alt="Ulaz u zgradu broj 19, Veljka Vlahovića"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/25" />
            <p className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-xs font-bold">
              {copy.location.pin}
            </p>
          </div>
          <ul className="grid gap-3">
            {distances.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-white px-5 py-4 text-sm shadow-sm"
              >
                <span className="inline-flex min-w-0 items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-sage" />
                  <span className="truncate font-semibold">{item.title}</span>
                </span>
                <span className="shrink-0 font-bold text-terra">{item.value}</span>
              </li>
            ))}
          </ul>
          <a
            href={site.location.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-terra text-sm font-bold text-terra"
          >
            {copy.location.directions}
          </a>
        </div>
      </div>
    </Section>
  );
}
