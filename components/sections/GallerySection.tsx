"use client";

import { useState } from "react";
import Image from "next/image";
import { copy } from "@/data/copy";
import { gallery } from "@/data/media";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { Section, SectionHead } from "@/components/ui/Section";

export function GallerySection() {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);

  const show = (index: number) => {
    setStart(index);
    setOpen(true);
  };

  return (
    <Section id="galerija">
      <SectionHead eyebrow={copy.gallery.kicker} title={copy.gallery.heading} lead={copy.gallery.lead} />

      <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden">
        {gallery.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => show(i)}
            className="w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] text-left"
            aria-label={copy.gallery.open}
          >
            <span className="relative block aspect-[4/3]">
              <Image src={photo.src} alt={photo.alt} fill sizes="78vw" className="object-cover" />
            </span>
            <p className="bg-white p-4 text-xs font-bold text-muted">{photo.alt}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 hidden auto-rows-[160px] grid-cols-4 gap-4 md:grid lg:auto-rows-[180px]">
        {gallery.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => show(i)}
            className={`relative overflow-hidden rounded-[1.5rem] text-left transition duration-300 hover:-translate-y-1 ${
              i === 0
                ? "col-span-2 row-span-2"
                : i === 3
                  ? "col-span-2"
                  : i === 8
                    ? "col-span-2"
                    : ""
            }`}
            aria-label={copy.gallery.open}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pt-10 pb-3 text-xs font-bold text-white">
              {photo.alt}
            </span>
          </button>
        ))}
      </div>

      <GalleryLightbox
        open={open}
        title={copy.gallery.heading}
        photos={gallery}
        onClose={() => setOpen(false)}
        startIndex={start}
      />
    </Section>
  );
}
