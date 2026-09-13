export const site = {
  name: "Dream Stay Budva",
  legalName: "Dream Stay Budva",
  tagline: "Sunce, balkon i plaža za šest minuta — Babilonija, Budva",
  subTagline:
    "Jednosoban apartman sa otvorenim dnevnim prostorom, kuhinjom i terasom pod brdima. Šetnja do Slovenske plaže, mirnija ulica od špica, sve što treba za samostalan boravak.",
  hosts: "Domaćini Dream Stay",
  // Exact sqm is not on the public listing — leave unset until the host confirms.
  sizeSqm: null as number | null,
  bedrooms: 1,
  bathrooms: 1,
  /**
   * Conservative capacity: photos show 1 dedicated bedroom (double bed) plus a
   * large corner sofa in the living room. Listing aggregators describe 2 beds /
   * a quadruple unit, not a second bedroom. Do not call this a 2-bedroom.
   */
  capacity: 4,
  location: {
    street: "Veljka Vlahovića 19",
    locality: "Babilonija",
    city: "Budva",
    postalCode: "85310",
    country: "Crna Gora",
    countryCode: "ME",
    // Converted from map screenshot 42°17'39.1553"N, 18°50'42.3319"E
    lat: 42.29421,
    lng: 18.845092,
    mapsUrl: "https://maps.google.com/?q=42.29421,18.845092",
    mapsEmbed:
      "https://www.google.com/maps?q=42.29421,18.845092&hl=sr&z=16&output=embed",
  },
  checkIn: "15:00",
  checkOut: "10:00",
  minNights: 2,
  contact: {
    // TODO: host phone / WhatsApp / Viber — never invent. Fill when the host provides them.
    phoneDisplay: "" as string,
    whatsappRaw: "" as string,
    whatsappUrl: "" as string,
    email: "" as string,
  },
  social: {
    // TODO: Instagram URL when the host provides it
    instagram: "" as string,
  },
  seo: {
    title: "Apartman Budva Babilonija | Dream Stay — balkon, kuhinja, 6 min do plaže",
    description:
      "Dream Stay Budva: sunčani apartman u Babiloniji, 6–10 minuta hoda od Slovenske plaže. Jedna spavaća soba, otvoreni dnevni prostor, kuhinja, terasa, parking i lift. Rezervišite direktno kod domaćina.",
  },
} as const;
