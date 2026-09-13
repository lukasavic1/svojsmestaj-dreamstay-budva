"use client";

import Image from "next/image";
import { Footprints, Landmark, Sun, Utensils } from "lucide-react";
import { copy } from "@/data/copy";
import { moments } from "@/data/content";
import { photos } from "@/data/media";
import { Section, SectionHead } from "@/components/ui/Section";

const ICONS = {
  beach: Footprints,
  golden: Sun,
  breakfast: Utensils,
  oldtown: Landmark,
} as const;

export function MomentsSection() {
  return (
    <Section>
      <SectionHead eyebrow={copy.moments.kicker} title={copy.moments.heading} lead={copy.moments.lead} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {moments.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <article
              key={item.id}
              className={`relative min-h-[220px] overflow-hidden rounded-[2rem] transition duration-300 lg:min-h-[280px] lg:hover:-translate-y-1 ${
                item.span === "wide" ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <Image src={photos[item.img]} alt={item.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-5 lg:p-8">
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper text-terra">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-white lg:text-xl">{item.title}</h3>
                  <span className="rounded-full bg-paper/95 px-2.5 py-0.5 text-[11px] font-bold text-terra">
                    {item.chip}
                  </span>
                </div>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
