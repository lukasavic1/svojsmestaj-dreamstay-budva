"use client";

import Image from "next/image";
import {
  Car,
  PawPrint,
  ShowerHead,
  Snowflake,
  Sun,
  Tv,
  Utensils,
  WashingMachine,
  Wifi,
  Wind,
  ArrowUpDown,
  type LucideIcon,
} from "lucide-react";
import { copy } from "@/data/copy";
import { amenities } from "@/data/content";
import { photos } from "@/data/media";
import { Section, SectionHead } from "@/components/ui/Section";

const ICONS: Record<(typeof amenities)[number]["icon"], LucideIcon> = {
  wifi: Wifi,
  snowflake: Snowflake,
  sun: Sun,
  utensils: Utensils,
  washing: WashingMachine,
  shower: ShowerHead,
  tv: Tv,
  car: Car,
  elevator: ArrowUpDown,
  paw: PawPrint,
  wind: Wind,
};

export function AmenitiesSection() {
  return (
    <Section id="pogodnosti" className="bg-paper-deep">
      <SectionHead eyebrow={copy.amenities.kicker} title={copy.amenities.heading} lead={copy.amenities.lead} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <ul className="grid gap-3 sm:grid-cols-2">
          {amenities.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id} className="flex gap-3 rounded-[1.5rem] bg-white p-4 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-sage">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="grid gap-4">
          <div className="relative min-h-[220px] overflow-hidden rounded-[2rem]">
            <Image
              src={photos.bathroomWasher}
              alt="Kupatilo sa tuš kabinom i mašinom za veš"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-xs font-bold">
              Tuš + mašina za veš
            </span>
          </div>
          <div className="relative min-h-[180px] overflow-hidden rounded-[2rem]">
            <Image
              src={photos.lobbyElevator}
              alt="Ulaz zgrade sa liftom"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-xs font-bold">
              Lift u zgradi · ulaz 19
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
