export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#102830" />
      <path
        d="M8 27c3.4-6.4 7.8-9.8 12-9.8S28.6 20.6 32 27"
        stroke="#2A6A78"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="14" r="4" fill="#F3F6F8" />
    </svg>
  );
}
