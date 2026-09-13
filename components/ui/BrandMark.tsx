export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="14" fill="#C4703F" />
      <circle cx="20" cy="13" r="5" fill="#F7F4EF" />
      <path d="M8 28c3.2-4.4 7.4-6.6 12-6.6S28.8 23.6 32 28" stroke="#F7F4EF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M11 31c2.6-3.2 5.6-4.8 9-4.8s6.4 1.6 9 4.8" stroke="#7C8B6F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
