"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { copy } from "@/data/copy";
import { spaces } from "@/data/content";
import { photos } from "@/data/media";
import { useSite } from "@/components/providers/SiteProvider";
import { Section, SectionHead } from "@/components/ui/Section";
import { fadeInUp, stagger } from "@/lib/motion";

export function SpacesSection() {
  const { openBooking } = useSite();

  return (
    <Section id="prostor">
      <SectionHead eyebrow={copy.spaces.kicker} title={copy.spaces.heading} lead={copy.spaces.lead} />
      <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {spaces.map((space) => (
          <motion.article
            key={space.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="flex w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_-34px_rgba(58,53,47,0.6)] transition duration-300 md:w-auto md:hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={photos[space.img]}
                alt={space.title}
                fill
                sizes="(min-width: 768px) 33vw, 82vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 lg:p-7">
              <motion.h3 variants={fadeInUp} className="font-display text-xl font-semibold lg:text-2xl">
                {space.title}
              </motion.h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{space.text}</p>
              <ul className="mt-5 grid grid-cols-1 gap-2">
                {space.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-xl bg-paper px-3 py-2.5 text-xs font-semibold text-ink"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openBooking}
                className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-terra text-sm font-bold text-white"
              >
                {copy.booking.fab}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
