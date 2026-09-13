import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { formatLongDate, nightsBetween } from "@/lib/calendar";
import type { HostInquiry } from "@/lib/inquiry-email";

const GRAPH_VERSION = "v21.0";
const DEFAULT_TEMPLATE = "svoj_smestaj_host_inquiry";
const DEFAULT_LANG = "sr";

function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

function templateText(value: string, fallback = "-") {
  const compact = value.replace(/\s+/g, " ").trim();
  if (!compact) return fallback;
  return compact.slice(0, 500);
}

function needsInquiryBody(template: string) {
  return template !== "hello_world";
}

export function isWhatsAppConfigured() {
  return Boolean(env("WHATSAPP_TOKEN") && env("WHATSAPP_PHONE_NUMBER_ID") && env("HOST_WHATSAPP"));
}

export async function sendHostInquiryWhatsApp(inquiry: HostInquiry) {
  const token = env("WHATSAPP_TOKEN");
  const phoneNumberId = env("WHATSAPP_PHONE_NUMBER_ID");
  const to = env("HOST_WHATSAPP").replace(/\D/g, "");
  const template = env("WHATSAPP_TEMPLATE_NAME") || DEFAULT_TEMPLATE;
  const language = env("WHATSAPP_TEMPLATE_LANG") || DEFAULT_LANG;

  if (!token || !phoneNumberId || !to) return;

  const payload: {
    messaging_product: "whatsapp";
    to: string;
    type: "template";
    template: {
      name: string;
      language: { code: string };
      components?: Array<{
        type: "body";
        parameters: Array<{ type: "text"; text: string }>;
      }>;
    };
  } = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: template,
      language: { code: language },
    },
  };

  if (needsInquiryBody(template)) {
    const checkIn = `${formatLongDate(inquiry.checkIn, copy.calendar.months)} (${site.checkIn})`;
    const checkOut = `${formatLongDate(inquiry.checkOut, copy.calendar.months)} (${site.checkOut})`;
    payload.template.components = [
      {
        type: "body",
        parameters: [
          site.name,
          inquiry.name,
          inquiry.phone,
          checkIn,
          checkOut,
          String(nightsBetween(inquiry.checkIn, inquiry.checkOut)),
          String(inquiry.guests),
          inquiry.message,
        ].map((value) => ({ type: "text" as const, text: templateText(value) })),
      },
    ];
  }

  const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`whatsapp_${response.status} ${detail.slice(0, 400)}`);
  }
}
