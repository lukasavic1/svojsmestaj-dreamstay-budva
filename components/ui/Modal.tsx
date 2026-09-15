"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
  titleHidden?: boolean;
  wide?: boolean;
};

export function Modal({
  open,
  title,
  onClose,
  children,
  closeLabel,
  titleHidden = false,
  wide = false,
}: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useIsClient();
  const [present, setPresent] = useState(open);
  if (open && !present) setPresent(true);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !present) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-5 ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <motion.button
        type="button"
        aria-label={closeLabel}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        className="absolute inset-0 bg-sea/72 backdrop-blur-[6px]"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <motion.div
        role="dialog"
        aria-modal={open}
        inert={!open ? true : undefined}
        aria-labelledby={titleId}
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 14 }}
        transition={{ duration: 0.22, ease: easeOutExpo }}
        className={`relative z-10 flex max-h-[92dvh] w-full min-h-0 flex-col overflow-hidden rounded-t-[1.6rem] bg-paper shadow-[0_40px_80px_-28px_rgba(16,40,48,0.55)] sm:rounded-[1.6rem] ${
          wide ? "sm:max-w-5xl" : "sm:max-w-lg"
        }`}
      >
        <h2 id={titleId} className={`px-5 pt-5 font-display text-2xl text-ink ${titleHidden ? "sr-only" : "pr-16"}`}>
          {title}
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-3 right-3 z-30 grid size-10 place-items-center rounded-full bg-sea text-paper transition hover:bg-terra"
        >
          <X className="size-4" strokeWidth={2.2} />
        </button>
        <div data-modal-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
