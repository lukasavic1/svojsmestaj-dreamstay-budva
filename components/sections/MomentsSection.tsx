"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Coffee, Footprints, MapPin, Sparkles, type LucideIcon } from "lucide-react";
import { copy } from "@/data/copy";
import { moments } from "@/data/content";
import { photos } from "@/data/media";
import { Section, SectionHead } from "@/components/ui/Section";

const ICONS: Record<(typeof moments)[number]["icon"], LucideIcon> = {
  footprints: Footprints,
  map: MapPin,
  coffee: Coffee,
  sparkles: Sparkles,
};

type Moment = (typeof moments)[number];

function ExperienceCard({ item, tall }: { item: Moment; tall?: boolean }) {
  const Icon = ICONS[item.icon];

  return (
    <article
      className={`group relative isolate overflow-hidden rounded-[1.75rem] bg-sea ${
        tall ? "min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]" : "min-h-[240px] lg:min-h-[260px]"
      }`}
    >
      <Image
        src={photos[item.img]}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 50vw, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur-md">
        <Icon className="size-3.5" strokeWidth={2.2} />
        {item.badge}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <div className="rounded-2xl bg-sea/80 p-4 shadow-[0_12px_32px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md">
          <h3 className="font-display text-xl leading-tight text-white sm:text-2xl">{item.title}</h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-white/92">{item.text}</p>
        </div>
      </div>
    </article>
  );
}

export function MomentsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const features = moments.filter((item) => item.size === "feature");
  const compact = moments.filter((item) => item.size === "compact");

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 12;
    setPage(Math.round(el.scrollLeft / step));
  }, []);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    const card = el?.firstElementChild as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: index * (card.offsetWidth + 12), behavior: "smooth" });
  };

  return (
    <Section id="iskustva">
      <SectionHead eyebrow={copy.moments.kicker} title={copy.moments.heading} lead={copy.moments.lead} />

      <div className="mt-10 hidden gap-4 lg:grid lg:grid-cols-2">
        {features.map((item) => (
          <ExperienceCard key={item.id} item={item} tall />
        ))}
        {compact.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 lg:hidden">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-none"
        >
          {moments.map((item) => (
            <div key={item.id} className="w-[85vw] shrink-0 snap-center sm:w-[400px]">
              <ExperienceCard item={item} tall />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-2" role="tablist" aria-label={copy.moments.heading}>
          {moments.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={page === index}
              aria-label={item.title}
              onClick={() => goTo(index)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full p-2"
            >
              <span
                className={`block h-2 rounded-full transition ${page === index ? "w-6 bg-sea" : "mx-auto w-2 bg-sea/25"}`}
              />
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[11px] tracking-wide text-muted">{copy.moments.credit}</p>
    </Section>
  );
}
