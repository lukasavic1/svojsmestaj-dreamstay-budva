"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { copy } from "@/data/copy";
import { photos } from "@/data/media";
import { Section } from "@/components/ui/Section";
import { RingPhoto } from "@/components/ui/RingPhoto";
import { fadeInUp, stagger } from "@/lib/motion";

export function AboutSection() {
  return (
    <Section id="o-stanu" className="bg-paper-deep">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <p className="text-[11px] font-bold tracking-[0.18em] text-terra uppercase">{copy.about.kicker}</p>
          <motion.h2 variants={fadeInUp} className="mt-3 font-display text-3xl font-semibold tracking-tight lg:text-4xl">
            {copy.about.heading}
          </motion.h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted lg:text-base">
            {copy.about.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {copy.about.pills.map((pill) => (
              <span key={pill.id} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-ink shadow-sm">
                {pill.label}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-34px_rgba(58,53,47,0.6)]">
            <div className="relative aspect-[4/5]">
              <Image
                src={photos.diningDaylight}
                alt="Trpezarija u jakom dnevnom svjetlu i otvoren balkon"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -left-3 bottom-10 sm:-left-8">
            <RingPhoto src={photos.bedroomLight} alt="Spavaća soba sa pampasom i bež lanom" size="lg" />
          </div>
          <div className="absolute -right-2 top-8 sm:-right-6">
            <RingPhoto src={photos.livingTv} alt="Zid dnevnog boravka sa drvenim lamelama i televizorom" />
          </div>
          <div className="absolute right-8 -bottom-6 sm:right-16">
            <RingPhoto src={photos.kitchen} alt="Kuhinja izbliza sa rernom i sudoperom" size="sm" />
          </div>
        </div>
      </div>
    </Section>
  );
}
