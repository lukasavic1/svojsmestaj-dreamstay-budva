import { copy } from "@/data/copy";

export function CalendarSkeleton() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-white p-4 sm:p-5"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">{copy.calendar.loading}</span>

      <div className="mb-4 flex items-center justify-end gap-1">
        <span className="size-9 border border-sea/10 bg-ink/[0.04]" />
        <span className="size-9 border border-sea/10 bg-ink/[0.04]" />
      </div>

      <div className="mb-4 h-6 w-40 animate-pulse bg-ink/10" />
      <div className="grid grid-cols-7 gap-px bg-sea/8">
        {copy.calendar.days.map((day) => (
          <div
            key={day}
            className="bg-paper pb-2 text-center text-[0.62rem] font-semibold tracking-[0.14em] text-muted/50 uppercase"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }, (_, i) => (
          <div
            key={i}
            className="min-h-10 animate-pulse bg-ink/[0.05] sm:min-h-11"
            style={{ animationDelay: `${(i % 7) * 70}ms` }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
        <span className="relative grid size-10 place-items-center">
          <span className="absolute inset-0 border border-sea/15" />
          <span className="absolute inset-0 animate-spin border border-transparent border-t-terra" />
        </span>
        <p className="mt-3 text-sm font-semibold text-ink">{copy.calendar.loading}</p>
        <p className="mt-1 text-xs tracking-wide text-muted">{copy.calendar.loadingHint}</p>
      </div>
    </div>
  );
}
