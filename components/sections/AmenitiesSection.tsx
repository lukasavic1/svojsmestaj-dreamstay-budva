"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  Car,
  PawPrint,
  ShowerHead,
  Snowflake,
  Sparkles,
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
import { amenities, amenityGroups } from "@/data/content";
import { Section, SectionHead } from "@/components/ui/Section";
import { easeOutExpo } from "@/lib/motion";

const GROUP_META: Record<
  (typeof amenityGroups)[number]["id"],
  { icon: LucideIcon; short: string }
> = {
  inside: { icon: BedDouble, short: "Soba" },
  tech: { icon: Utensils, short: "Kuhinja" },
  outside: { icon: Sun, short: "Terasa" },
  extra: { icon: Sparkles, short: "Još" },
};

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
  const [group, setGroup] = useState<(typeof amenityGroups)[number]["id"]>("inside");
  const visible = useMemo(
    () => amenities.filter((item) => item.group === group),
    [group],
  );

  return (
    <Section id="pogodnosti" className="bg-paper-deep">
      <SectionHead eyebrow={copy.amenities.kicker} title={copy.amenities.heading} lead={copy.amenities.lead} />
      <div
        className="mt-5 flex rounded-full border border-sea/8 bg-white/70 p-1 shadow-sm backdrop-blur-md md:mt-6"
        role="tablist"
        aria-label={copy.amenities.heading}
      >
        {amenityGroups.map((item) => {
          const active = group === item.id;
          const Icon = GROUP_META[item.id].icon;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setGroup(item.id)}
              className="relative flex min-h-10 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1 text-sea md:min-h-11 md:flex-row md:gap-1.5 md:px-2"
            >
              {active ? (
                <motion.span
                  layoutId="amenity-filter-pill"
                  className="absolute inset-0 rounded-full bg-sea shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <Icon
                className={`relative z-[1] size-3.5 ${active ? "text-paper" : "text-muted"}`}
                strokeWidth={2.1}
              />
              <span
                className={`relative z-[1] text-[9px] font-semibold tracking-wide md:text-[11px] ${
                  active ? "text-paper" : "text-muted"
                }`}
              >
                <span className="lg:hidden">{GROUP_META[item.id].short}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={group}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: easeOutExpo }}
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3"
        >
          {visible.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.id}
                className="group rounded-[1.4rem] border border-transparent bg-white/70 p-5 transition hover:-translate-y-1 hover:rotate-[-0.4deg] hover:border-terra/30 hover:shadow-[0_18px_40px_-28px_rgba(16,40,48,0.28)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep text-terra transition group-hover:bg-terra group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold tracking-wide">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.body}</p>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </Section>
  );
}
