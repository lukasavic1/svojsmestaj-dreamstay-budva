# Dream Stay Budva

Sajt apartmana **Dream Stay Budva** (Babilonija) — Next.js App Router, sr-Latn.
Vizuelni jezik je porodica Luna Camp (toplo krem, terakota, kadulja), motor rezervacije je isti kao kod Forest View.

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Šta urediti prije produkcije

| Šta | Fajl |
| --- | --- |
| Ime brenda | `config.ts` (`BUSINESS_NAME`) |
| Javni URL i OG slika | `config/site.ts` |
| Adresa, geo, kapacitet, prijava/odjava | `data/site.ts` |
| Telefon / WhatsApp / email / Instagram | `data/site.ts` → `contact` i `social` (sada prazni placeholderi) |
| Tekstovi UI | `data/copy.ts` |
| Pogodnosti, udaljenosti, trenuci | `data/content.ts` |
| FAQ | `data/faq.ts` |
| Fotografije | `data/media.ts` + `public/images/apartman/` |
| Kalendar, email, WhatsApp hostu, rate limit | `.env.local` (kopiraj `.env.example`) |

Ne commituj `.env.local`. Cijena se ne unosi na sajt — gosti šalju upit, domaćin potvrđuje.

## Okruženje (`.env.local`)

- `CALENDAR_ICS_URL` — tajni iCal iz Google Calendar-a
- `RESEND_API_KEY`, `RESEND_FROM`, `HOST_EMAIL` — email o upitu
- `WHATSAPP_*`, `HOST_WHATSAPP` — opciono obavještenje domaćinu
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — rate limit na `/api/inquiry`
