"use client";

import { CalendarCheck } from "lucide-react";
import { useSite } from "@/components/providers/SiteProvider";
import { copy } from "@/data/copy";

export function FloatingBookingButton() {
  const { openBooking, bookingOpen } = useSite();

  if (bookingOpen) return null;

  return (
    <div className="pointer-events-none fixed right-6 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 md:hidden">
      <div className="pointer-events-auto relative size-14">
        <span className="absolute inset-0 animate-ping rounded-full bg-terra/25" aria-hidden />
        <button
          type="button"
          onClick={openBooking}
          aria-label={copy.booking.fab}
          className="relative grid size-14 place-items-center rounded-full bg-terra text-white shadow-[0_10px_24px_-8px_rgba(42,106,120,0.7)]"
        >
          <CalendarCheck className="size-6" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
