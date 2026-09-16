"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { copy } from "@/data/copy";
import { heroStats, highlights } from "@/data/content";
import { photos } from "@/data/media";
import { useSite } from "@/components/providers/SiteProvider";
import { easeOutExpo } from "@/lib/motion";
import { site } from "@/data/site";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";

function HeroMedia({ preview }: { preview: (typeof highlights)[number]["id"] }) {
  return (
    <>
      {highlights.map((item) => (
        <motion.div
          key={item.img}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: item.id === preview ? 1 : 0 }}
          transition={{ duration: 0.85, ease: easeOutExpo }}
          aria-hidden={item.id !== preview}
          style={{ pointerEvents: "none" }}
        >
          <Image src={photos[item.img]} alt={item.label} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      ))}
    </>
  );
}

function HighlightTabs({
  preview,
  setPreview,
  tone,
}: {
  preview: (typeof highlights)[number]["id"];
  setPreview: (id: (typeof highlights)[number]["id"]) => void;
  tone: "dark" | "light";
}) {
  return (
    <div className="flex gap-2 overflow-x-auto p-1 scrollbar-none">
      {highlights.map((item) => {
        const selected = item.id === preview;
        return (
          <button
            key={item.id}
            type="button"
            onMouseEnter={() => setPreview(item.id)}
            onFocus={() => setPreview(item.id)}
            onClick={() => setPreview(item.id)}
            className={`flex min-h-11 min-w-[7.5rem] shrink-0 items-center gap-3 rounded-full py-2 pr-4 pl-2 text-left transition ${
              tone === "dark"
                ? `glass-dark ${selected ? "ring-1 ring-white/70 ring-inset" : "opacity-80"}`
                : selected
                  ? "bg-sea text-paper"
                  : "bg-paper-deep text-sea"
            }`}
          >
            <span className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image src={photos[item.img]} alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="text-xs font-semibold tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function HeroSection() {
  const { openBooking } = useSite();
  const [preview, setPreview] = useState<(typeof highlights)[number]["id"]>("terrace");
  const heroRef = useRef<HTMLDivElement>(null);

  const stepHero = useCallback((dir: 1 | -1) => {
    setPreview((current) => {
      const index = highlights.findIndex((item) => item.id === current);
      const next = (index + dir + highlights.length) % highlights.length;
      return highlights[next].id;
    });
  }, []);

  const tapHero = useCallback(
    (event: PointerEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      stepHero(event.clientX - rect.left < rect.width / 2 ? -1 : 1);
    },
    [stepHero],
  );

  useSwipeIndex(heroRef, {
    count: highlights.length,
    onSwipe: stepHero,
    threshold: 36,
    onTap: tapHero,
  });

  return (
    <section className="relative isolate overflow-x-hidden bg-paper md:bg-sea md:text-white">
      <div className="md:hidden">
        <div ref={heroRef} className="relative h-[50vh] min-h-[280px] touch-pan-y overflow-hidden bg-sea">
          <HeroMedia preview={preview} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sea/35 to-transparent" />
          <span className="pointer-events-none absolute top-20 left-4 z-10 rounded-full bg-white/20 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
            ✨ {site.name}
          </span>
          <span className="pointer-events-none absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/25 p-1.5 text-white/90">
            <ChevronLeft className="size-5" />
          </span>
          <span className="pointer-events-none absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/25 p-1.5 text-white/90">
            <ChevronRight className="size-5" />
          </span>
          <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-1">
            {highlights.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                onClick={() => setPreview(item.id)}
                className="flex min-h-11 min-w-11 items-center justify-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all ${
                    preview === item.id ? "w-6 bg-white" : "w-2.5 bg-white/45"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="relative z-10 -mt-5 rounded-t-[1.75rem] bg-paper px-4 pt-6 pb-8 text-ink">
          <h1 className="font-display text-[1.85rem] leading-[1.05] tracking-tight text-sea">
            {copy.hero.heading}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.hero.lead}</p>
          <button
            type="button"
            onClick={openBooking}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-terra px-7 text-sm font-semibold text-white"
          >
            {copy.hero.ctaPrimary}
          </button>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {heroStats.map((item) => (
              <span
                key={item.id}
                className="inline-flex min-h-9 items-center rounded-full bg-paper-deep px-3 text-[11px] font-semibold tracking-wide text-sea"
              >
                {item.value}
                <span className="ml-1 font-medium text-muted">{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative hidden min-h-[100dvh] overflow-x-hidden md:block">
        <HeroMedia preview={preview} />
        <div className="absolute inset-0 bg-gradient-to-r from-sea/80 via-sea/45 to-sea/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea/80 via-transparent to-sea/25" />
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-start px-6 pt-28 pb-16 lg:px-8 lg:pt-32 lg:pb-24 xl:justify-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="max-w-2xl"
          >
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="glass-dark rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase">
                {copy.hero.chipWalk} 🌊
              </span>
              <span className="glass-dark rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase">
                {copy.hero.chipBeach} 🌅
              </span>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase">{copy.hero.badge}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.98] tracking-tight lg:text-7xl">{copy.hero.heading}</h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 lg:text-base">{copy.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex min-h-12 items-center rounded-full bg-terra px-7 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(42,106,120,0.85)] transition hover:bg-terra-deep"
              >
                {copy.hero.ctaPrimary}
              </button>
              <a
                href="#prostor"
                className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold"
              >
                {copy.hero.ctaSecondary}
                <ArrowDown className="size-4" />
              </a>
            </div>
          </motion.div>
          <div className="mt-8 lg:mt-12">
            <HighlightTabs preview={preview} setPreview={setPreview} tone="dark" />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-px overflow-hidden rounded-2xl glass-dark">
            {heroStats.map((item) => (
              <div key={item.id} className="px-3 py-3 text-center sm:px-4">
                <div className="font-display text-lg text-white sm:text-xl">{item.value}</div>
                <div className="mt-0.5 text-[10px] tracking-wide text-white/70 uppercase sm:text-[11px]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
