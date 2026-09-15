"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Bus,
  Camera,
  Footprints,
  Map,
  MapPin,
  Navigation,
  type LucideIcon,
} from "lucide-react";
import { copy } from "@/data/copy";
import { nearby, neighborhoodShots } from "@/data/content";
import { photos } from "@/data/media";
import { Section, SectionHead } from "@/components/ui/Section";
import { easeOutExpo } from "@/lib/motion";

const ICONS: Record<(typeof nearby)[number]["icon"], LucideIcon> = {
  footprints: Footprints,
  building: Building2,
  pin: MapPin,
  bus: Bus,
};

export function LocationSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"map" | "photos">("map");
  const [place, setPlace] = useState<(typeof nearby)[number]["id"]>("slovenska");
  const active = nearby.find((item) => item.id === place) ?? nearby[0];
  const ActiveIcon = ICONS[active.icon];
  const mapSrc = `https://www.google.com/maps?q=${active.lat},${active.lng}&hl=sr&z=${active.zoom}&output=embed`;

  const selectPlace = (id: (typeof nearby)[number]["id"]) => {
    setPlace(id);
    setView("map");
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Section id="okolina" className="bg-paper-deep">
      <SectionHead eyebrow={copy.nearby.kicker} title={copy.nearby.heading} lead={copy.nearby.lead} />

      <div id="lokacija" className="mt-8 flex flex-col gap-4 lg:mt-10 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-6">
        <ol className="order-2 grid gap-3 lg:order-1 lg:h-full lg:grid-rows-4 lg:auto-rows-fr">
          {nearby.map((item) => {
            const selected = item.id === place;
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id} className="min-h-0">
                <button
                  type="button"
                  onClick={() => selectPlace(item.id)}
                  onMouseEnter={() => setPlace(item.id)}
                  className={`flex h-full min-h-11 w-full items-center rounded-2xl border border-transparent bg-white px-4 py-4 text-left shadow-sm transition duration-300 hover:shadow-md ${
                    selected ? "border-l-4 border-l-terra shadow-md" : "hover:border-sea/10"
                  }`}
                >
                  <span className="flex w-full items-start gap-3">
                    <span
                      className={`relative mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl ${
                        selected ? "bg-terra text-white" : "bg-paper-deep text-sea"
                      }`}
                    >
                      {selected ? (
                        <span className="absolute inset-0 animate-ping rounded-xl bg-terra/35" aria-hidden />
                      ) : null}
                      <Icon className="relative size-4" strokeWidth={2.1} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-sea">{item.title}</span>
                        <span className="rounded-full bg-paper-deep px-2.5 py-1 text-[11px] font-semibold tracking-wide text-sea uppercase">
                          {item.distance}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted">{item.text}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div
          ref={mapRef}
          className="relative order-1 h-[220px] overflow-hidden rounded-3xl border border-sea/10 bg-white shadow-[0_24px_50px_-32px_rgba(16,40,48,0.35)] sm:h-[320px] lg:order-2 lg:h-auto lg:min-h-[520px]"
        >
          <div className="absolute top-3 right-3 z-20 hidden gap-1 rounded-full bg-white/90 p-1 shadow-md backdrop-blur-md lg:flex">
            {(["map", "photos"] as const).map((item) => {
              const on = view === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setView(item)}
                  className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase transition ${
                    on ? "bg-sea text-paper" : "text-muted hover:text-sea"
                  }`}
                >
                  {item === "map" ? <Map className="size-3.5" /> : <Camera className="size-3.5" />}
                  {item === "map" ? copy.locationToggle.map : copy.locationToggle.photos}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {view === "map" ? (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: easeOutExpo }}
                className="relative h-full lg:absolute lg:inset-0"
              >
                <iframe
                  title={`${active.title} — ${copy.location.heading}`}
                  src={mapSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <span
                  key={`pin-${active.id}`}
                  className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-[28px]"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-terra/40" />
                  <span className="relative grid size-8 animate-bounce place-items-center rounded-full bg-terra text-white shadow-lg">
                    <MapPin className="size-4" fill="currentColor" />
                  </span>
                </span>
                <motion.div
                  key={`place-card-${active.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: easeOutExpo }}
                  className="absolute right-3 bottom-3 left-3 z-10 hidden max-w-sm sm:left-3 lg:block"
                >
                  <div className="flex overflow-hidden rounded-2xl bg-white/95 shadow-lg backdrop-blur-md">
                    <span className="relative h-24 w-24 shrink-0">
                      <Image src={photos[active.img]} alt={active.title} fill sizes="96px" className="object-cover" />
                    </span>
                    <span className="flex min-w-0 flex-col justify-center px-3 py-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-terra uppercase">
                        <ActiveIcon className="size-3.5" />
                        {active.distance}
                      </span>
                      <span className="mt-0.5 truncate font-semibold text-sea">{active.title}</span>
                      <a
                        href={`https://maps.google.com/?q=${active.lat},${active.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-terra"
                      >
                        <Navigation className="size-3" />
                        {copy.location.directions}
                      </a>
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="photos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: easeOutExpo }}
                className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2"
              >
                {neighborhoodShots.map((shot, index) => (
                  <motion.div
                    key={shot.img}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.35, ease: easeOutExpo }}
                    className="relative h-full min-h-0 overflow-hidden rounded-2xl"
                  >
                    <Image src={photos[shot.img]} alt={shot.alt} fill sizes="30vw" className="object-cover" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
