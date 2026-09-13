"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sun } from "lucide-react";
import { copy } from "@/data/copy";
import { heroStats, highlights } from "@/data/content";
import { photos } from "@/data/media";
import { useSite } from "@/components/providers/SiteProvider";
import { RingPhoto } from "@/components/ui/RingPhoto";
import { fadeInUp, stagger } from "@/lib/motion";

export function StoryChips() {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-4 md:hidden">
      {highlights.map((item) => (
        <a key={item.id} href={`#${item.target}`} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
          <RingPhoto src={photos[item.img]} alt={item.label} size="sm" />
          <span className="w-16 truncate text-center text-[10px] font-bold">{item.label}</span>
        </a>
      ))}
    </div>
  );
}

export function HeroSection() {
  const { openBooking } = useSite();

  return (
    <section className="pt-4 md:pt-10 lg:pt-14">
      <StoryChips />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-white uppercase"
          >
            <Sun className="h-3.5 w-3.5" />
            {copy.hero.badge}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
          >
            {copy.hero.heading}
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-4 max-w-md text-sm leading-relaxed text-muted lg:text-base">
            {copy.hero.lead}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-terra px-6 text-sm font-bold text-white"
            >
              {copy.hero.ctaPrimary}
            </button>
            <a
              href="#prostor"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-terra px-5 text-sm font-bold text-terra"
            >
              {copy.hero.ctaSecondary}
              <ArrowDown className="size-4" />
            </a>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-8 hidden grid-cols-4 gap-3 md:grid">
            {highlights.map((item) => (
              <a
                key={item.id}
                href={`#${item.target}`}
                className="group flex flex-col items-center gap-2 transition duration-300 hover:-translate-y-1"
              >
                <RingPhoto src={photos[item.img]} alt={item.label} />
                <span className="text-sm font-bold">{item.label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-28px_rgba(58,53,47,0.55)]">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
              <Image
                src={photos.balconySunset}
                alt="Balkon u zlatnom satu — stolice, sto i brda iznad Babilonije"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-xs font-bold text-ink">
                {copy.hero.chipWalk} · {copy.hero.chipBeach}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-6 left-4 hidden sm:block lg:-left-8">
            <RingPhoto src={photos.bedroomLight} alt="Spavaća soba sa bež posteljinom i pampasom" size="lg" />
          </div>
          <div className="absolute -top-5 right-3 hidden sm:block">
            <RingPhoto
              src={photos.diningDaylight}
              alt="Trpezarija u dnevnom svjetlu sa izlazom na balkon"
              size="md"
            />
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4 lg:mt-16 lg:px-8">
        {heroStats.map((item) => (
          <div
            key={item.id}
            className="rounded-[1.5rem] bg-white p-4 text-center shadow-[0_16px_40px_-30px_rgba(58,53,47,0.55)] lg:p-6"
          >
            <div className="font-display text-xl font-semibold text-ink lg:text-2xl">{item.value}</div>
            <div className="mt-1 truncate text-[11px] text-muted">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
