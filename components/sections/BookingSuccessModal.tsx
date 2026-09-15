"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import { site } from "@/data/site";
import { copy } from "@/data/copy";
import { hasHostPhone, hasWhatsApp, telHref, whatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { easeOutExpo } from "@/lib/motion";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export type BookingReceipt = {
  apartmentName: string;
  period: string;
  guests: number;
  whatsappText?: string;
};

type Props = {
  open: boolean;
  receipt: BookingReceipt | null;
  onClose: () => void;
};

export function BookingSuccessModal({ open, receipt, onClose }: Props) {
  const mounted = useIsClient();
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label={copy.booking.close}
            className="absolute inset-0 bg-sea/78 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.32, ease: easeOutExpo }}
            className="relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-[1.6rem] bg-paper shadow-[0_40px_80px_-28px_rgba(16,40,48,0.55)] sm:max-w-lg sm:rounded-[1.6rem]"
          >
            <div className="bg-sea px-6 py-8 text-paper">
              <span className="grid size-11 place-items-center rounded-full bg-terra">
                <Check className="size-5 stroke-[2.4]" />
              </span>
              <h3 id="booking-success-title" className="mt-5 font-display text-3xl leading-none tracking-tight">
                {copy.booking.successTitle}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/75">{copy.booking.successBody}</p>
            </div>

            {receipt ? (
              <div className="divide-y divide-sea/8 border-y border-sea/8 bg-white px-6 py-2 text-sm">
                <p className="flex justify-between gap-4 py-3">
                  <span className="text-muted">{copy.booking.apartment}</span>
                  <span className="font-semibold text-ink">{receipt.apartmentName}</span>
                </p>
                <p className="flex justify-between gap-4 py-3">
                  <span className="text-muted">{copy.booking.summaryPeriod}</span>
                  <span className="text-right font-semibold text-ink">{receipt.period}</span>
                </p>
                <p className="flex justify-between gap-4 py-3">
                  <span className="text-muted">{copy.booking.summaryGuests}</span>
                  <span className="font-semibold text-ink">{receipt.guests}</span>
                </p>
              </div>
            ) : null}

            <div className="px-6 py-5">
              {hasHostPhone() ? (
                <a
                  href={telHref()}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sea text-[0.68rem] font-semibold tracking-[0.14em] text-paper uppercase hover:bg-terra"
                >
                  <Phone className="size-4" />
                  {copy.booking.successCall}
                  {site.contact.phoneDisplay ? ` · ${site.contact.phoneDisplay}` : ""}
                </a>
              ) : null}
              {hasWhatsApp() ? (
                <a
                  href={whatsappHref(receipt?.whatsappText)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-sea/20 text-[0.68rem] font-semibold tracking-[0.14em] text-sea uppercase hover:bg-paper-deep"
                >
                  <WhatsAppIcon className="size-4" />
                  {copy.booking.successWhatsapp}
                </a>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="mt-2 inline-flex h-12 w-full items-center justify-center text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase hover:text-sea"
              >
                {copy.booking.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
