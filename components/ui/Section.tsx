import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-bold tracking-[0.18em] text-terra uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink lg:text-4xl">{title}</h2>
      {lead ? <p className="mt-3 text-sm leading-relaxed text-muted lg:text-base">{lead}</p> : null}
    </div>
  );
}
