"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { copy } from "@/data/copy";
import { spaces } from "@/data/content";
import { photos } from "@/data/media";
import { Section, SectionHead } from "@/components/ui/Section";

const accordionEase = "cubic-bezier(0.22, 1, 0.36, 1)";

export function SpacesSection() {
  const [active, setActive] = useState<(typeof spaces)[number]["id"]>("bedroom");
  const [hotspot, setHotspot] = useState<string | null>(null);

  return (
    <Section id="prostor">
      <SectionHead eyebrow={copy.spaces.kicker} title={copy.spaces.heading} lead={copy.spaces.lead} />

      <div className="mt-10 hidden h-[min(72vh,640px)] gap-3 lg:flex">
        {spaces.map((space) => {
          const expanded = space.id === active;
          return (
            <motion.button
              key={space.id}
              type="button"
              layout
              onClick={() => {
                setActive(space.id);
                setHotspot(null);
              }}
              onMouseEnter={() => {
                setActive(space.id);
                setHotspot(null);
              }}
              className={`relative min-w-0 overflow-hidden rounded-[1.75rem] text-left ${expanded ? "flex-[2.4]" : "flex-[0.85]"}`}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={photos[space.img]}
                alt={space.title}
                fill
                sizes="50vw"
                className={`object-cover transition duration-700 ${expanded ? "scale-100" : "scale-105"}`}
              />
              <div
                className={`absolute inset-0 transition ${
                  expanded ? "bg-gradient-to-t from-sea/80 via-sea/10 to-transparent" : "bg-sea/45"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                <h3 className={`font-display text-white ${expanded ? "text-3xl" : "text-lg"}`}>
                  {space.title}
                </h3>
                {expanded ? (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                    <p className="max-w-md text-sm leading-relaxed text-white/85">{space.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {space.features.map((feature) => (
                        <span
                          key={feature.label}
                          onMouseEnter={() => setHotspot(feature.label)}
                          onMouseLeave={() => setHotspot(null)}
                          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${
                            hotspot === feature.label ? "bg-terra text-white" : "glass-dark text-white"
                          }`}
                        >
                          {feature.label}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </div>
              {expanded
                ? space.features.map((feature) => (
                    <span
                      key={feature.label}
                      className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition ${
                        hotspot === feature.label ? "scale-150 bg-terra" : "bg-white/80"
                      }`}
                      style={{ left: `${feature.x}%`, top: `${feature.y}%` }}
                    />
                  ))
                : null}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-3 lg:hidden">
        {spaces.map((space) => {
          const expanded = space.id === active;
          return (
            <div key={space.id} className="overflow-hidden rounded-[1.5rem]">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setActive(space.id)}
                className="w-full text-left"
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={photos[space.img]}
                    alt={space.title}
                    fill
                    sizes="100vw"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      expanded ? "scale-100" : "scale-105"
                    }`}
                  />
                  <span
                    className={`absolute inset-0 transition-colors duration-700 ${
                      expanded ? "bg-sea/20" : "bg-sea/50"
                    }`}
                  />
                  <span className="absolute bottom-4 left-4 font-display text-2xl text-white">{space.title}</span>
                </span>
              </button>
              <div
                className="grid"
                style={{
                  gridTemplateRows: expanded ? "1fr" : "0fr",
                  transition: `grid-template-rows 0.7s ${accordionEase}`,
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    className="bg-paper-deep px-4 py-4"
                    style={{
                      opacity: expanded ? 1 : 0,
                      transform: expanded ? "translateY(0)" : "translateY(-6px)",
                      transition: expanded
                        ? `opacity 0.5s ${accordionEase} 0.12s, transform 0.5s ${accordionEase} 0.12s`
                        : `opacity 0.28s ${accordionEase}, transform 0.28s ${accordionEase}`,
                    }}
                  >
                    <p className="text-sm leading-relaxed text-muted">{space.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {space.features.map((feature) => (
                        <span
                          key={feature.label}
                          className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold"
                        >
                          {feature.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
