"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AvailabilityPayload, YearMonth } from "@/types/calendar";
import {
  asMonthIndex,
  compareIso,
  daysInMonth,
  isDayBooked,
  isInRange,
  isRangeEndpoint,
  mondayOffset,
  nightsBetween,
  rangeHasBookedNight,
  shiftMonth,
  toIsoDate,
  todayIso,
} from "@/lib/calendar";
import { copy } from "@/data/copy";
import { site } from "@/data/site";

type Props = {
  availability: AvailabilityPayload;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
};

function MonthGrid({
  year,
  month,
  availability,
  checkIn,
  checkOut,
  today,
  labelledBy,
  onPick,
}: {
  year: number;
  month: number;
  availability: AvailabilityPayload;
  checkIn: string | null;
  checkOut: string | null;
  today: string;
  labelledBy: string;
  onPick: (iso: string, booked: boolean) => void;
}) {
  const totalDays = daysInMonth(year, month);
  const offset = mondayOffset(year, month);
  const trailing = 42 - offset - totalDays;

  return (
    <div>
      <h3 id={labelledBy} className="mb-4 font-display text-xl tracking-tight text-ink">
        {copy.calendar.months[month]} {year}.
      </h3>
      <div className="grid grid-cols-7 gap-px bg-sea/8" role="grid" aria-labelledby={labelledBy}>
        {copy.calendar.days.map((d, i) => (
          <div
            className="bg-paper pb-2 text-center text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase"
            role="columnheader"
            key={`${labelledBy}-${d}-${i}`}
          >
            {d}
          </div>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`${labelledBy}-e-${i}`} className="min-h-10 bg-paper sm:min-h-11" />
        ))}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const iso = toIsoDate(year, month, day);
          const booked = isDayBooked(availability.booked, year, month, day);
          const past = compareIso(iso, today) < 0;
          const disabled = booked || past;
          const inRange = isInRange(iso, checkIn, checkOut);
          const endpoint = isRangeEndpoint(iso, checkIn, checkOut);

          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              disabled={disabled}
              aria-label={`${day}. ${copy.calendar.months[month]} — ${
                booked ? copy.calendar.busy : copy.calendar.free
              }`}
              onClick={() => onPick(iso, booked)}
              className={`grid min-h-10 w-full place-items-center rounded-lg text-sm font-medium transition sm:min-h-11 ${
                booked
                  ? "cursor-not-allowed bg-paper-deep text-muted/45 line-through"
                  : past
                    ? "cursor-not-allowed bg-paper text-muted/30"
                    : endpoint
                      ? "bg-sea text-paper"
                      : inRange
                        ? "bg-terra/15 text-sea"
                        : "bg-paper text-ink hover:bg-terra/10"
              }`}
            >
              {day}
            </button>
          );
        })}
        {Array.from({ length: Math.max(0, trailing) }, (_, i) => (
          <div key={`${labelledBy}-t-${i}`} className="min-h-10 bg-paper sm:min-h-11" />
        ))}
      </div>
    </div>
  );
}

export function RangeCalendar({ availability, checkIn, checkOut, onChange }: Props) {
  const [cursor, setCursor] = useState<YearMonth>(availability.first);
  const [error, setError] = useState<string | null>(null);
  const today = todayIso();

  useEffect(() => {
    setCursor(availability.first);
    setError(null);
  }, [availability.unitId, availability.first.year, availability.first.month]);

  const nextMonth = shiftMonth(cursor, 1);
  const atFirst =
    asMonthIndex(cursor.year, cursor.month) <= asMonthIndex(availability.first.year, availability.first.month);
  const atLast =
    asMonthIndex(cursor.year, cursor.month) >= asMonthIndex(availability.last.year, availability.last.month);
  const showSecond =
    asMonthIndex(nextMonth.year, nextMonth.month) <= asMonthIndex(availability.last.year, availability.last.month);

  const hint = useMemo(() => {
    if (error) return error;
    if (!checkIn) return copy.calendar.selectCheckIn;
    if (!checkOut) return copy.calendar.selectCheckOut;
    return copy.calendar.rangeSet;
  }, [checkIn, checkOut, error]);

  const pick = (iso: string, booked: boolean) => {
    if (booked || compareIso(iso, today) < 0) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (compareIso(iso, checkIn) <= 0) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (rangeHasBookedNight(availability.booked, checkIn, iso)) {
      setError(copy.calendar.rangeBlocked);
      return;
    }

    if (nightsBetween(checkIn, iso) < site.minNights) {
      setError(copy.calendar.minStay);
      return;
    }

    onChange(checkIn, iso);
    setError(null);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p
          className={`min-h-[2.5rem] flex-1 px-0 py-1 text-sm font-medium ${
            error ? "text-red-800" : "text-muted"
          }`}
          role={error ? "alert" : undefined}
        >
          {hint}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setCursor(shiftMonth(cursor, -1))}
            disabled={atFirst}
            aria-label={copy.calendar.prevMonth}
            className="grid size-9 place-items-center rounded-full border border-sea/12 text-sea disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(shiftMonth(cursor, 1))}
            disabled={atLast}
            aria-label={copy.calendar.nextMonth}
            className="grid size-9 place-items-center rounded-full border border-sea/12 text-sea disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <MonthGrid
          year={cursor.year}
          month={cursor.month}
          availability={availability}
          checkIn={checkIn}
          checkOut={checkOut}
          today={today}
          labelledBy="range-cal-month-a"
          onPick={pick}
        />
        {showSecond ? (
          <div className="hidden lg:block">
            <MonthGrid
              year={nextMonth.year}
              month={nextMonth.month}
              availability={availability}
              checkIn={checkIn}
              checkOut={checkOut}
              today={today}
              labelledBy="range-cal-month-b"
              onPick={pick}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 border border-sea/15 bg-paper" aria-hidden="true" />
          {copy.calendar.free}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 bg-paper-deep" aria-hidden="true" />
          {copy.calendar.busy}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 bg-sea" aria-hidden="true" />
          {copy.calendar.selected}
        </span>
      </div>

      <div className="mt-3 min-h-5">
        {checkIn || checkOut ? (
          <button
            type="button"
            className="text-xs font-semibold tracking-wide text-terra uppercase underline-offset-2 hover:underline"
            onClick={() => {
              onChange(null, null);
              setError(null);
            }}
          >
            {copy.calendar.clearDates}
          </button>
        ) : null}
      </div>
    </div>
  );
}
