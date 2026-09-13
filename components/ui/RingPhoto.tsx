import Image from "next/image";

export function RingPhoto({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "sm" ? "h-16 w-16" : size === "lg" ? "h-28 w-28 lg:h-32 lg:w-32" : "h-24 w-24 lg:h-28 lg:w-28";
  const pad = size === "sm" ? "p-[2px]" : "p-[3px]";
  const ring = size === "sm" ? "ring-2" : "ring-4";

  return (
    <span
      className={`relative ${dim} shrink-0 overflow-hidden rounded-full ${pad}`}
      style={{ background: "linear-gradient(135deg, #C4703F, #7C8B6F)" }}
    >
      <span className={`relative block h-full w-full overflow-hidden rounded-full ${ring} ring-paper`}>
        <Image src={src} alt={alt} fill sizes="128px" className="object-cover" />
      </span>
    </span>
  );
}
