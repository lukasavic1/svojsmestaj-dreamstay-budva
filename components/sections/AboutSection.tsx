"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { copy } from "@/data/copy";
import { photos } from "@/data/media";
import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/motion";

export function AboutSection() {
  return (
    <Section id="o-stanu" className="bg-sea text-paper">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-terra uppercase">{copy.about.kicker}</p>
          <h2 className="mt-4 font-display text-2xl leading-[1.08] sm:text-4xl lg:text-5xl">{copy.about.heading}</h2>
          <p className="mt-6 font-display text-xl leading-snug text-paper/85 sm:text-2xl">{copy.about.body[0]}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-paper/70 lg:text-base">
            {copy.about.body.slice(1).map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {copy.about.pills.map((pill) => (
              <span
                key={pill.id}
                className="rounded-full border border-white/20 px-4 py-2.5 text-center text-xs font-semibold tracking-wide uppercase sm:py-2 sm:text-left"
              >
                {pill.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="grid grid-cols-2 gap-3"
        >
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.5rem]">
            <Image
              src={photos.diningDaylight}
              alt="Trpezarija u jakom dnevnom svjetlu i otvoren balkon"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image src={photos.bedroomLight} alt="Spavaća soba sa pampasom i bež lanom" fill sizes="30vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image src={photos.livingTv} alt="Zid dnevnog boravka sa drvenim lamelama" fill sizes="30vw" className="object-cover" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
