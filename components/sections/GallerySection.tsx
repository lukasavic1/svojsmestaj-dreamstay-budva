"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Pause, Play, Sun, Sunrise, Sunset } from "lucide-react";
import { copy } from "@/data/copy";
import { gallery } from "@/data/media";
import type { Photo, PhotoPeriod } from "@/types/photo";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { Section, SectionHead } from "@/components/ui/Section";
import { easeOutExpo } from "@/lib/motion";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";

const AUTOPLAY_MS = 4000;

type FilterId = "all" | PhotoPeriod;

const PERIOD_TINT: Record<PhotoPeriod, string> = {
  morning: "#F59E0B",
  day: "#0284C7",
  golden: "#EA580C",
};

const PERIOD_ICON = {
  morning: Sunrise,
  day: Sun,
  golden: Sunset,
} as const;

const MOOD_EMOJI: Record<FilterId, string> = {
  all: "✦",
  morning: "🌅",
  day: "☀️",
  golden: "🌇",
};

const FILTERS: { id: FilterId; label: string; time?: string }[] = [
  { id: "all", label: copy.galleryFilters.all },
  { id: "morning", label: copy.galleryFilters.morning, time: copy.galleryTimes.morning },
  { id: "day", label: copy.galleryFilters.day, time: copy.galleryTimes.day },
  { id: "golden", label: copy.galleryFilters.golden, time: copy.galleryTimes.golden },
];

function periodOf(photo: Photo): PhotoPeriod {
  return photo.period ?? "day";
}

function periodTime(period: PhotoPeriod) {
  return copy.galleryTimes[period];
}

function photoTitle(photo: Photo) {
  return photo.title ?? photo.alt.split("—")[0]?.trim() ?? photo.alt;
}

export function GallerySection() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterId>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hotspot, setHotspot] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => gallery.filter((photo) => filter === "all" || photo.period === filter),
    [filter],
  );

  const current = filtered[Math.min(activeIndex, Math.max(filtered.length - 1, 0))];
  const count = filtered.length;
  const tint = current ? PERIOD_TINT[periodOf(current)] : PERIOD_TINT.day;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(media.matches);
      setPlaying(!media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const selectFilter = (id: FilterId) => {
    setFilter(id);
    setActiveIndex(0);
    setHotspot(null);
  };

  useEffect(() => {
    if (!playing || reduceMotion || open || count < 2) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, reduceMotion, open, count, filter, activeIndex]);

  useEffect(() => {
    const scroller = stripRef.current;
    const node = scroller?.querySelector<HTMLElement>(`[data-thumb="${activeIndex}"]`);
    if (!scroller || !node) return;
    if (activeIndex === 0) {
      scroller.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    const left = node.offsetLeft - scroller.clientWidth / 2 + node.clientWidth / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeIndex, filter, reduceMotion]);

  const step = useCallback((dir: 1 | -1) => {
    if (count < 2) return;
    setActiveIndex((i) => (i + dir + count) % count);
  }, [count]);

  useSwipeIndex(stageRef, { count, onSwipe: step });

  if (!current) return null;

  const badge = `${photoTitle(current)} • ${periodTime(periodOf(current))}`;

  return (
    <Section id="galerija">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead eyebrow={copy.gallery.kicker} title={copy.gallery.heading} lead={copy.gallery.lead} />
        <div
          className="flex justify-between gap-1 rounded-full border border-white/50 bg-white/45 p-1 shadow-sm backdrop-blur-xl md:hidden"
          role="tablist"
          aria-label={copy.gallery.heading}
        >
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectFilter(item.id)}
                className="relative flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center rounded-full px-1 py-1 text-sea"
              >
                {active ? (
                  <motion.span
                    layoutId="gallery-mood-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-[1] text-base leading-none">{MOOD_EMOJI[item.id]}</span>
                <span className="relative z-[1] mt-0.5 text-[9px] font-semibold tracking-wide text-muted">
                  {item.time ?? item.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="hidden gap-2 overflow-x-auto pb-1 scrollbar-none md:flex" role="tablist" aria-label={copy.gallery.heading}>
          {FILTERS.map((item) => {
            const active = filter === item.id;
            const color = item.id === "all" ? "var(--sea)" : PERIOD_TINT[item.id];
            const Icon = item.id === "all" ? null : PERIOD_ICON[item.id];
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectFilter(item.id)}
                className="relative min-h-11 shrink-0 overflow-hidden rounded-full px-4 py-2 text-left transition"
                style={{
                  color: active ? "#fff" : "var(--sea)",
                  background: "var(--paper-deep)",
                  boxShadow: active ? `0 10px 24px -12px ${color}` : undefined,
                }}
              >
                {active ? (
                  <motion.span
                    layoutId="gallery-filter-glow"
                    className="absolute inset-0 rounded-full"
                    style={{ background: color }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-[1] flex items-center gap-2">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: active ? "rgba(255,255,255,0.9)" : color }}
                  />
                  {Icon ? <Icon className="size-3.5" strokeWidth={2.2} /> : null}
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    {item.label}
                    {item.time ? <span className="ml-1.5 font-medium opacity-80">{item.time}</span> : null}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="mt-8"
        >
          <div
            ref={stageRef}
            className="relative h-[280px] cursor-pointer overflow-hidden rounded-[1.75rem] bg-sea sm:h-[400px] lg:h-[min(70vh,640px)]"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("button")) return;
              setOpen(true);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: easeOutExpo }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 72rem"
                  className={`object-cover ${reduceMotion ? "" : "ken-burns"}`}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(180deg, rgba(16,40,48,0.18) 0%, transparent 32%, transparent 58%, ${tint}33 100%)`,
              }}
            />

            <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-between gap-3 p-3 sm:p-6">
              <div className="pointer-events-auto flex items-start justify-between gap-2">
                <div className="glass-dark min-w-0 flex-1 rounded-2xl px-3 py-1.5 text-white sm:px-3.5">
                  <p className="text-[11px] font-semibold leading-snug tracking-wide break-words sm:text-sm">
                    {badge}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label={copy.gallery.enlarge}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/28"
                >
                  <Maximize2 className="size-4" strokeWidth={2.2} />
                </button>
              </div>

              <p className="glass-dark w-full rounded-2xl px-3 py-2.5 text-xs leading-relaxed break-words text-white/90 sm:max-w-xl sm:px-4 sm:py-3 sm:text-sm">
                {current.alt}
              </p>
            </div>

            {(current.hotspots ?? []).map((spot) => {
              const active = hotspot === spot.label;
              return (
                <button
                  key={spot.label}
                  type="button"
                  aria-label={spot.label}
                  onMouseEnter={() => setHotspot(spot.label)}
                  onMouseLeave={() => setHotspot(null)}
                  onFocus={() => setHotspot(spot.label)}
                  onBlur={() => setHotspot(null)}
                  className="absolute z-[3] grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <span className="relative grid size-4 place-items-center">
                    <span className="absolute inset-0 rounded-full bg-white/70 animate-ping" />
                    <span
                      className={`relative size-2.5 rounded-full border-2 border-white shadow-md transition ${
                        active ? "scale-125 bg-terra" : "bg-white/90"
                      }`}
                    />
                  </span>
                  <AnimatePresence>
                    {active ? (
                      <motion.span
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 6 }}
                        className="glass-dark absolute top-1/2 left-5 -translate-y-1/2 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-white"
                      >
                        {spot.label}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {!reduceMotion && count > 1 ? (
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-pressed={playing}
                aria-label={playing ? copy.gallery.pause : copy.gallery.play}
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sea text-paper transition hover:bg-terra"
              >
                {playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="size-4" fill="currentColor" />}
              </button>
            ) : null}

            <div
              ref={stripRef}
              className="film-strip scrollbar-none min-w-0 flex-1 overflow-x-auto scroll-smooth"
            >
              <div className="flex w-max gap-2.5 py-2 pr-3 pl-2 sm:gap-3">
              {filtered.map((photo, index) => {
                const active = index === activeIndex;
                const color = PERIOD_TINT[periodOf(photo)];
                return (
                  <motion.button
                    key={photo.src}
                    type="button"
                    data-thumb={index}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ y: -3 }}
                    className="group relative h-14 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-32"
                    style={{
                      outline: active ? `2px solid ${color}` : "1px solid rgba(16,40,48,0.12)",
                      outlineOffset: "-2px",
                      boxShadow: active ? `0 10px 18px -12px ${color}` : undefined,
                    }}
                    aria-current={active}
                    aria-label={photoTitle(photo)}
                  >
                    {active && playing && !open ? (
                      <motion.span
                        key={`${photo.src}-progress`}
                        className="absolute inset-x-0 top-0 z-[2] h-0.5 origin-left"
                        style={{ background: color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      />
                    ) : null}
                    <span className="absolute inset-0">
                      <Image src={photo.src} alt="" fill sizes="128px" className="object-cover" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-sea/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 translate-y-1 px-2 pb-1.5 text-left opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="block truncate text-[10px] font-semibold text-white">{photoTitle(photo)}</span>
                      <span className="text-[9px] text-white/75">{periodTime(periodOf(photo))}</span>
                    </span>
                  </motion.button>
                );
              })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <GalleryLightbox
        open={open}
        title={copy.gallery.heading}
        photos={filtered}
        onClose={() => setOpen(false)}
        startIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />
    </Section>
  );
}
