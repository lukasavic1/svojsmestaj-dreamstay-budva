"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import type { Photo } from "@/types/photo";
import { copy } from "@/data/copy";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.5;

type Props = {
  open: boolean;
  title: string;
  photos: Photo[];
  onClose: () => void;
  startIndex?: number;
  onIndexChange?: (index: number) => void;
};

export function GalleryLightbox({
  open,
  title,
  photos,
  onClose,
  startIndex = 0,
  onIndexChange,
}: Props) {
  const mounted = useIsClient();
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = photos.length;

  const wasOpen = useRef(false);

  useEffect(() => {
    if (open && !wasOpen.current) {
      setIndex(startIndex);
      setZoom(ZOOM_MIN);
    }
    wasOpen.current = open;
  }, [open, startIndex]);

  useEffect(() => {
    setZoom(ZOOM_MIN);
  }, [index]);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  const zoomBy = useCallback((dir: 1 | -1) => {
    setZoom((value) => {
      const next = value + dir * ZOOM_STEP;
      return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    });
  }, []);

  useSwipeIndex(stageRef, { count, onSwipe: step });
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    onIndexChange?.(index);
  }, [open, index, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "+" || e.key === "=") zoomBy(1);
      if (e.key === "-" || e.key === "_") zoomBy(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, step, zoomBy]);

  if (!mounted) return null;
  const current = photos[index];

  return createPortal(
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-ink/94 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div>
              <p className="font-display text-lg sm:text-xl">{title}</p>
              <p className="text-xs text-white/60">
                {index + 1} {copy.gallery.of} {count}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => zoomBy(-1)}
                disabled={zoom <= ZOOM_MIN}
                aria-label={copy.gallery.zoomOut}
                className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-35"
              >
                <Minus className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => zoomBy(1)}
                disabled={zoom >= ZOOM_MAX}
                aria-label={copy.gallery.zoomIn}
                className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-35"
              >
                <Plus className="size-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label={copy.gallery.close}
                className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div
            ref={stageRef}
            className={`relative mx-auto min-h-[50vh] w-full max-w-5xl flex-1 px-12 sm:px-16 ${
              zoom > 1 ? "overflow-auto" : "overflow-hidden"
            }`}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: zoom }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
            </motion.div>
            {count > 1 ? (
              <>
                <button
                  type="button"
                  aria-label={copy.gallery.prev}
                  onClick={() => step(-1)}
                  className="absolute top-1/2 left-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 hover:bg-white/30"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label={copy.gallery.next}
                  onClick={() => step(1)}
                  className="absolute top-1/2 right-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 hover:bg-white/30"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            ) : null}
          </div>

          <p className="px-4 pb-2 text-center text-sm text-white/70">{current.alt}</p>

          <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
            {photos.map((photo, i) => (
              <button
                key={`${photo.src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ${
                  i === index ? "ring-terra" : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
