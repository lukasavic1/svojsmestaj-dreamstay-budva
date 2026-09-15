"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { MessageSquare, Phone, User, Users } from "lucide-react";
import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { photos } from "@/data/media";
import { emptyAvailability } from "@/lib/availability";
import { formatLongDate, nightsBetween, rangeHasBookedNight } from "@/lib/calendar";
import { formatInquiryMessage } from "@/lib/whatsapp";
import { RangeCalendar } from "@/components/ui/RangeCalendar";
import { CalendarSkeleton } from "@/components/ui/CalendarSkeleton";
import type { AvailabilityPayload } from "@/types/calendar";
import type { BookingReceipt } from "./BookingSuccessModal";

const fieldClass =
  "h-12 w-full rounded-xl border border-sea/12 bg-white py-3 pr-4 pl-11 text-sm text-ink outline-none transition focus:border-terra focus:ring-2 focus:ring-terra/20";

const btnPrimary =
  "inline-flex h-12 w-full items-center justify-center rounded-xl bg-sea px-3 text-[0.68rem] font-semibold tracking-[0.16em] text-paper uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35 hover:bg-terra";

const btnGhost =
  "inline-flex h-12 w-full items-center justify-center rounded-xl border border-sea/20 px-3 text-[0.68rem] font-semibold tracking-[0.16em] text-sea uppercase transition hover:bg-paper-deep";

type Props = {
  onSubmitted: (receipt: BookingReceipt) => void;
  onCancel: () => void;
};

type Step = 1 | 2;

export function BookingForm({ onSubmitted, onCancel }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [availability, setAvailability] = useState<AvailabilityPayload | null>(null);
  const [availabilityError, setAvailabilityError] = useState(false);

  const skippedFirstScroll = useRef(false);

  useEffect(() => {
    let live = true;
    fetch("/api/availability")
      .then(async (res) => {
        if (!res.ok) throw new Error("unavailable");
        return (await res.json()) as AvailabilityPayload;
      })
      .then((data) => {
        if (!live) return;
        setAvailability(data);
        setAvailabilityError(false);
      })
      .catch(() => {
        if (!live) return;
        setAvailability(emptyAvailability());
        setAvailabilityError(true);
      });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!skippedFirstScroll.current) {
      skippedFirstScroll.current = true;
      return;
    }
    const scroller = formRef.current?.closest("[data-modal-scroll]");
    if (scroller instanceof HTMLElement) scroller.scrollTo({ top: 0 });
  }, [step]);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const periodLabel =
    checkIn && checkOut
      ? `${formatLongDate(checkIn, copy.calendar.months)} — ${formatLongDate(checkOut, copy.calendar.months)}`
      : "";

  const canAdvanceDates = Boolean(checkIn && checkOut);
  const canSubmit =
    name.trim().length >= 2 && phone.trim().length >= 6 && guests >= 1 && guests <= site.capacity;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setStep(1);
      return;
    }
    if (!availability || rangeHasBookedNight(availability.booked, checkIn, checkOut)) {
      setError(copy.calendar.rangeBlocked);
      setStep(1);
      return;
    }
    if (!canSubmit || submitting) {
      setStep(2);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          checkIn,
          checkOut,
          guests,
          message: message.trim(),
        }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        if (payload?.error === "range_blocked") {
          setError(copy.calendar.rangeBlocked);
          setStep(1);
          return;
        }
        if (payload?.error === "rate_limited" || response.status === 429) {
          setError(copy.booking.rateLimited);
          return;
        }
        throw new Error("send_failed");
      }
      onSubmitted({
        apartmentName: site.legalName,
        period: periodLabel,
        guests,
        whatsappText: formatInquiryMessage({
          name: name.trim(),
          phone: phone.trim(),
          checkIn,
          checkOut,
          guests,
          message,
        }),
      });
    } catch {
      setError(copy.booking.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const steps: { n: Step; label: string }[] = [
    { n: 1, label: copy.booking.stepDates },
    { n: 2, label: copy.booking.stepGuests },
  ];

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid min-h-full lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="relative min-h-40 overflow-hidden bg-sea text-paper lg:min-h-full">
        <Image
          src={photos.balconySunset}
          alt=""
          fill
          sizes="280px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea via-sea/55 to-sea/20" />
        <div className="relative z-10 flex h-full min-h-40 flex-col justify-end px-5 py-5 lg:min-h-[32rem] lg:px-6 lg:py-8">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-paper/70 uppercase">
            {site.location.locality} · {site.location.city}
          </p>
          <p className="mt-2 font-display text-3xl leading-none tracking-tight">{site.name}</p>
          <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-paper/75">{copy.booking.lead}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-4 text-[11px] tracking-wide uppercase">
            <div>
              <dt className="text-paper/50">{copy.contact.checkInLabel}</dt>
              <dd className="mt-1 font-semibold text-paper">{site.checkIn}</dd>
            </div>
            <div>
              <dt className="text-paper/50">{copy.contact.checkOutLabel}</dt>
              <dd className="mt-1 font-semibold text-paper">{site.checkOut}</dd>
            </div>
          </dl>
        </div>
      </aside>

      <div className="flex min-h-0 flex-col bg-paper">
        <ol className="sticky top-0 z-20 flex items-center gap-3 border-b border-sea/8 bg-paper/95 px-4 py-4 backdrop-blur-md sm:px-7">
          {steps.map((item, index) => {
            const active = step === item.n;
            const done = step > item.n;
            return (
              <li key={item.n} className="flex min-w-0 flex-1 items-center gap-3">
                <button
                  type="button"
                  disabled={item.n > step}
                  onClick={() => item.n < step && setStep(item.n)}
                  className="flex min-w-0 items-center gap-2 text-left disabled:cursor-default"
                >
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full font-display text-xs ${
                      active || done ? "bg-sea text-paper" : "bg-paper-deep text-muted"
                    }`}
                  >
                    0{item.n}
                  </span>
                  <span
                    className={`truncate text-[0.68rem] font-semibold tracking-[0.14em] uppercase ${
                      active ? "text-sea" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
                {index === 0 ? (
                  <span className="hidden h-px flex-1 bg-sea/15 sm:block" aria-hidden>
                    <span
                      className="block h-px bg-terra transition-all"
                      style={{ width: step === 1 ? "35%" : "100%" }}
                    />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="grid flex-1 gap-5 px-4 py-5 sm:px-7 sm:py-6">
          {step === 1 ? (
            <div>
              {availabilityError ? (
                <p className="mb-4 border border-terra/40 bg-terra/8 px-3 py-2 text-sm text-ink" role="status">
                  {copy.calendar.unavailable}
                </p>
              ) : null}
              {availability ? (
                <RangeCalendar
                  availability={availability}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onChange={(start, end) => {
                    setCheckIn(start);
                    setCheckOut(end);
                    setError(null);
                  }}
                />
              ) : (
                <CalendarSkeleton />
              )}
              {checkIn && checkOut ? (
                <div className="mt-5 border-l-2 border-terra bg-white px-4 py-3">
                  <p className="text-sm text-ink">
                    <span className="font-semibold">{copy.booking.selectedRange}:</span> {periodLabel} (
                    {nights} {nights === 1 ? copy.booking.night : copy.booking.nights})
                  </p>
                </div>
              ) : (
                <div className="mt-5 min-h-[4.25rem]" aria-hidden />
              )}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4">
              <div className="border-l-2 border-terra bg-white px-4 py-3 text-sm">
                <p className="font-semibold text-ink">{periodLabel}</p>
                <p className="mt-1 text-muted">
                  {nights} {nights === 1 ? copy.booking.night : copy.booking.nights}
                </p>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                  {copy.booking.name}
                </span>
                <span className="relative block">
                  <User className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-terra" />
                  <input className={fieldClass} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                  {copy.booking.phone}
                </span>
                <span className="relative block">
                  <Phone className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-terra" />
                  <input
                    className={fieldClass}
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                  {copy.booking.guests}
                </span>
                <span className="relative block">
                  <Users className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-terra" />
                  <input
                    className={fieldClass}
                    type="number"
                    min={1}
                    max={site.capacity}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  />
                </span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                  {copy.booking.message}
                </span>
                <span className="relative block">
                  <MessageSquare className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-terra" />
                  <textarea
                    rows={3}
                    placeholder={copy.booking.messageHint}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-sea/12 bg-white py-3 pr-4 pl-11 text-sm text-ink outline-none transition focus:border-terra focus:ring-2 focus:ring-terra/20"
                  />
                </span>
              </label>
            </div>
          ) : null}
        </div>

        <div className="sticky bottom-0 z-20 border-t border-sea/8 bg-paper/95 px-4 py-3 backdrop-blur-md sm:px-7">
          {error ? (
            <p className="mb-3 border border-red-400 bg-red-50 px-3 py-2 text-sm font-medium text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-2">
            {step === 1 ? (
              <>
                <button type="button" onClick={onCancel} className={btnGhost}>
                  {copy.booking.cancel}
                </button>
                <button
                  type="button"
                  onClick={() => canAdvanceDates && setStep(2)}
                  disabled={!canAdvanceDates || !availability}
                  className={btnPrimary}
                >
                  {copy.booking.next}
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setStep(1)} className={btnGhost}>
                  {copy.booking.back}
                </button>
                <button type="submit" disabled={!canSubmit || submitting} className={btnPrimary}>
                  {submitting ? copy.booking.submitting : copy.booking.submit}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
