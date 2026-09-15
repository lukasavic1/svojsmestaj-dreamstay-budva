import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  tight = false,
  children,
}: {
  id?: string;
  className?: string;
  tight?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-4 sm:px-6 lg:px-8 ${tight ? "py-8 lg:py-10" : "py-12 lg:py-16"} ${className}`}
    >
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
      <p className="text-[11px] font-semibold tracking-[0.22em] text-terra uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl leading-[1.08] tracking-tight text-sea sm:text-4xl lg:text-5xl">{title}</h2>
      {lead ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted lg:text-base">{lead}</p> : null}
    </div>
  );
}
