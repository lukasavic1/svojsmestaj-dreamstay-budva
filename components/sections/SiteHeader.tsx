"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useSite } from "@/components/providers/SiteProvider";
import { BrandMark } from "@/components/ui/BrandMark";
import { copy } from "@/data/copy";
import { site } from "@/data/site";

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

const NAV = [
  { href: "#prostor", label: copy.nav.spaces },
  { href: "#o-stanu", label: copy.nav.about },
  { href: "#iskustva", label: copy.nav.experiences },
  { href: "#galerija", label: copy.nav.gallery },
  { href: "#pogodnosti", label: copy.nav.amenities },
  { href: "#okolina", label: copy.nav.nearby },
  { href: "#kontakt", label: copy.nav.contact },
] as const;

export function SiteHeader() {
  const { openBooking } = useSite();
  const mounted = useIsClient();
  const stuck = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        stuck ? "glass shadow-[0_12px_40px_-24px_rgba(43,58,65,0.35)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-2.5">
          <BrandMark className="size-10 shrink-0 transition group-hover:scale-105 sm:size-11" />
          <span className="min-w-0">
            <span
              className={`block truncate font-display text-xl leading-none sm:text-2xl ${stuck ? "text-sea" : "text-white"}`}
            >
              {site.name}
            </span>
            <span className={`mt-1 block text-[0.62rem] font-semibold tracking-[0.16em] uppercase ${stuck ? "text-muted" : "text-white/70"}`}>
              Babilonija · Crna Gora
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-5" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition hover:text-terra ${
                stuck ? "text-muted" : "text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={openBooking}
            className="hidden h-11 items-center rounded-full bg-terra px-5 text-[12px] font-semibold tracking-[0.12em] text-white uppercase md:inline-flex hover:bg-terra-deep"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {copy.nav.book}
          </motion.button>
          <button
            type="button"
            className={`inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full xl:hidden ${stuck ? "text-sea" : "text-white"}`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={copy.nav.menu}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {menuOpen ? (
                <motion.div
                  id={menuId}
                  className="fixed inset-0 z-[70] flex flex-col bg-sea text-paper xl:hidden"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 380, damping: 38 }}
                >
                  <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-4">
                    <span className="inline-flex items-center gap-2 font-display text-xl">
                      <BrandMark className="size-10" />
                      {site.name}
                    </span>
                    <button
                      ref={closeRef}
                      type="button"
                      aria-label={copy.nav.close}
                      onClick={closeMenu}
                      className="grid size-11 min-h-11 min-w-11 place-items-center"
                    >
                      <X className="size-6" />
                    </button>
                  </div>
                  <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-6 pt-4">
                    {NAV.map((item, i) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i }}
                        className="flex min-h-11 items-center border-b border-white/10 py-3 font-display text-2xl sm:text-3xl"
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>
                  <div className="shrink-0 px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        openBooking();
                      }}
                      className="inline-flex h-12 min-h-11 w-full items-center justify-center rounded-full bg-terra font-semibold tracking-[0.16em] text-white uppercase"
                    >
                      {copy.nav.book}
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
