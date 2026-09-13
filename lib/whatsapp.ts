import { site } from "@/data/site";

export type InquiryPayload = {
  name: string;
  phone: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message?: string;
};

export function hasHostPhone() {
  return Boolean(site.contact.whatsappRaw || site.contact.phoneDisplay);
}

export function hasWhatsApp() {
  return Boolean(site.contact.whatsappUrl || site.contact.whatsappRaw);
}

export function whatsappHref(text?: string): string {
  const raw = site.contact.whatsappRaw;
  const base = site.contact.whatsappUrl || (raw ? `https://wa.me/${raw}` : "");
  if (!base) return "";
  if (!text?.trim()) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(text)}`;
}

export function formatInquiryMessage(payload: InquiryPayload): string {
  const lines = [
    "Zdravo, želim da rezervišem boravak u Dream Stay Budva.",
    "",
    `Ime: ${payload.name}`,
    `Telefon: ${payload.phone}`,
  ];

  if (payload.checkIn) lines.push(`Prijava: ${payload.checkIn}`);
  if (payload.checkOut) lines.push(`Odjava: ${payload.checkOut}`);
  if (payload.guests) lines.push(`Gosti: ${payload.guests}`);
  if (payload.message?.trim()) lines.push(`Poruka: ${payload.message.trim()}`);

  return lines.join("\n");
}

export function telHref(): string {
  if (!site.contact.whatsappRaw) return "";
  return `tel:+${site.contact.whatsappRaw}`;
}

export function viberHref(): string {
  if (!site.contact.whatsappRaw) return "";
  return `viber://chat?number=%2B${site.contact.whatsappRaw}`;
}
