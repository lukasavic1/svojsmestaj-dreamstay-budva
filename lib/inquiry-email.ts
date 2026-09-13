import { copy } from "@/data/copy";
import { site } from "@/data/site";
import { siteConfig } from "@/config/site";
import { formatLongDate, nightsBetween } from "@/lib/calendar";

export type HostInquiry = {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function inquiryPeriodLabel(checkIn: string, checkOut: string) {
  return `${formatLongDate(checkIn, copy.calendar.months)} — ${formatLongDate(checkOut, copy.calendar.months)}`;
}

export function hostInquirySubject(inquiry: HostInquiry) {
  return `Novi upit · ${site.name} · ${inquiryPeriodLabel(inquiry.checkIn, inquiry.checkOut)}`;
}

export function hostInquiryText(inquiry: HostInquiry) {
  const nights = nightsBetween(inquiry.checkIn, inquiry.checkOut);
  const lines = [
    `Potencijalna rezervacija — ${site.legalName}`,
    "",
    "Ovo još nije potvrđena rezervacija. Kontaktirajte gosta i potvrdite termine.",
    "",
    `Gost: ${inquiry.name}`,
    `Telefon: ${inquiry.phone}`,
    `Gosti: ${inquiry.guests}`,
    `Prijava: ${formatLongDate(inquiry.checkIn, copy.calendar.months)} (${site.checkIn})`,
    `Odjava: ${formatLongDate(inquiry.checkOut, copy.calendar.months)} (${site.checkOut})`,
    `Noćenja: ${nights}`,
  ];
  if (inquiry.message) {
    lines.push("", `Poruka: ${inquiry.message}`);
  }
  lines.push("", siteConfig.url);
  return lines.join("\n");
}

export function hostInquiryHtml(inquiry: HostInquiry) {
  const nights = nightsBetween(inquiry.checkIn, inquiry.checkOut);
  const period = inquiryPeriodLabel(inquiry.checkIn, inquiry.checkOut);
  const phone = escapeHtml(inquiry.phone);
  const phoneHref = digits(inquiry.phone);
  const tel = phoneHref ? `tel:+${phoneHref.replace(/^00/, "")}` : "";
  const wa = phoneHref ? `https://wa.me/${phoneHref.replace(/^00/, "")}` : "";

  const detail = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0 4px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8A8175;">${label}</td>
    </tr>
    <tr>
      <td style="padding:0 0 12px;border-bottom:1px solid #E8E2D6;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;color:#3A352F;font-weight:600;">${value}</td>
    </tr>`;

  const callButton = tel
    ? `<tr>
        <td class="btn-call" align="center" bgcolor="#C4703F" style="background-color:#C4703F;border-radius:14px;">
          <a href="${tel}" style="display:block;padding:16px 12px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;color:#F7F4EF;text-decoration:none;">Pozovi gosta</a>
        </td>
      </tr>
      <tr><td style="height:12px;font-size:0;line-height:0;">&nbsp;</td></tr>`
    : "";

  const waButton = wa
    ? `<tr>
        <td class="btn-wa" align="center" bgcolor="#F7F4EF" style="background-color:#F7F4EF;border-radius:14px;border:2px solid #7C8B6F;">
          <a href="${wa}" style="display:block;padding:16px 12px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;color:#3A352F;text-decoration:none;">WhatsApp</a>
        </td>
      </tr>`
    : "";

  const note = inquiry.message
    ? `<tr>
        <td style="padding:18px 24px 6px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#C4703F;">Poruka gosta</td>
      </tr>
      <tr>
        <td style="padding:0 24px 20px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#3A352F;">${escapeHtml(inquiry.message).replace(/\n/g, "<br/>")}</td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="sr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>${escapeHtml(hostInquirySubject(inquiry))}</title>
  <style type="text/css">
    :root { color-scheme: light; supported-color-schemes: light; }
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #F1EBE1 !important; }
      .email-card { background-color: #F7F4EF !important; }
      .email-header { background-color: #3A352F !important; }
      .email-footer { background-color: #F1EBE1 !important; }
      .email-ink { color: #3A352F !important; }
      .email-cream { color: #F7F4EF !important; }
      .email-terra { color: #C4703F !important; }
      .email-muted { color: #6B6255 !important; }
      .email-label { color: #8A8175 !important; }
      .btn-call { background-color: #C4703F !important; }
      .btn-call a { color: #F7F4EF !important; }
      .btn-wa { background-color: #F7F4EF !important; border-color: #7C8B6F !important; }
      .btn-wa a { color: #3A352F !important; }
    }
  </style>
</head>
<body class="email-bg" bgcolor="#F1EBE1" style="margin:0;padding:0;background-color:#F1EBE1;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-bg" bgcolor="#F1EBE1" style="background-color:#F1EBE1;padding:24px 8px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-card" bgcolor="#F7F4EF" style="max-width:560px;background-color:#F7F4EF;border:1px solid #E4DDD0;">
          <tr>
            <td class="email-header" bgcolor="#3A352F" style="background-color:#3A352F;padding:24px;">
              <p class="email-terra" style="margin:0 0 10px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C4703F;">Svoj Smještaj · Budva</p>
              <h1 class="email-cream" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;font-weight:500;color:#F7F4EF;">Novi upit za boravak</h1>
              <p class="email-terra" style="margin:12px 0 0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#C4703F;">Potencijalna rezervacija</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#C4703F" style="height:4px;background-color:#C4703F;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td bgcolor="#F7F4EF" style="padding:24px 24px 8px;background-color:#F7F4EF;">
              <p class="email-muted" style="margin:0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#6B6255;">
                Gost je poslao upit preko sajta. <strong class="email-ink" style="color:#3A352F;">Termin nije automatski zauzet</strong> — javite se gostu i potvrdite dostupnost.
              </p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#F7F4EF" style="padding:16px 24px 8px;background-color:#F7F4EF;">
              <p class="email-terra" style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#C4703F;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(site.legalName)}</p>
              <p class="email-ink" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.35;color:#3A352F;">${escapeHtml(period)}</p>
              <p class="email-label" style="margin:8px 0 0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#8A8175;">${nights} ${nights === 1 ? "noćenje" : "noćenja"} · prijava ${site.checkIn} · odjava ${site.checkOut}</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#F7F4EF" style="padding:8px 24px 8px;background-color:#F7F4EF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detail("Gost", escapeHtml(inquiry.name))}
                ${detail("Telefon", phone)}
                ${detail("Broj gostiju", String(inquiry.guests))}
                ${detail("Prijava", escapeHtml(formatLongDate(inquiry.checkIn, copy.calendar.months)))}
                ${detail("Odjava", escapeHtml(formatLongDate(inquiry.checkOut, copy.calendar.months)))}
              </table>
            </td>
          </tr>
          ${note}
          <tr>
            <td bgcolor="#F7F4EF" style="padding:8px 24px 24px;background-color:#F7F4EF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${callButton}
                ${waButton}
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-footer" bgcolor="#F1EBE1" style="padding:16px 24px;background-color:#F1EBE1;border-top:1px solid #E4DDD0;">
              <p class="email-label" style="margin:0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8A8175;">
                ${escapeHtml(site.location.street)} · ${escapeHtml(site.location.locality)} · ${escapeHtml(site.location.city)}<br/>
                <a class="email-ink" href="${siteConfig.url}" style="color:#3A352F;">${siteConfig.url.replace(/^https:\/\//, "")}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
