"use client";

import { Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useSite } from "@/components/providers/SiteProvider";
import { copy } from "@/data/copy";

export function FloatingBookingButton() {
  const { openBooking, bookingOpen } = useSite();

  if (bookingOpen) return null;

  return (
    <motion.button
      type="button"
      onClick={openBooking}
      aria-label={copy.booking.fab}
      className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 inline-flex items-center gap-1.5 rounded-full bg-terra px-4 py-2.5 text-[0.68rem] font-bold tracking-[0.14em] text-white uppercase shadow-[0_16px_40px_-18px_rgba(196,112,63,0.85)] md:hidden"
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-white/50"
        animate={{ scale: [1, 1.35, 1.35], opacity: [0.7, 0, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
      />
      <span className="grid size-6 place-items-center rounded-full bg-white text-terra">
        <Sun className="size-3.5" />
      </span>
      {copy.booking.fab}
    </motion.button>
  );
}
