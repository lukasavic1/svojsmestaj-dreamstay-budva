"use client";

import { Bus, Footprints, MapPin, Mountain } from "lucide-react";
import { copy } from "@/data/copy";
import { nearby } from "@/data/content";
import { photos } from "@/data/media";
import { Section, SectionHead } from "@/components/ui/Section";
import Image from "next/image";

const ICONS = [Footprints, Mountain, MapPin, Bus] as const;

export function NearbySection() {
  return (
    <Section id="okolina" className="bg-paper-deep">
      <SectionHead eyebrow={copy.nearby.kicker} title={copy.nearby.heading} lead={copy.nearby.lead} />
      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[280px] overflow-hidden rounded-[2rem]">
          <Image
            src={photos.balconyViewDay}
            alt="Pogled sa balkona na krovove Babilonije i brdo iznad Budve"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/20" />
          <p className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-xs font-bold">
            Pogled sa terase · Babilonija
          </p>
        </div>
        <ol className="grid gap-3">
          {nearby.map((item, index) => {
            const Icon = ICONS[index] ?? MapPin;
            return (
              <li key={item.id} className="flex items-start gap-4 rounded-[1.5rem] bg-white px-5 py-4 shadow-sm">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-sage">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-bold">{item.title}</h3>
                    <span className="shrink-0 text-sm font-bold text-terra">{item.distance}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
