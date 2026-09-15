export const highlights = [
  { id: "terrace", label: "Terasa", target: "prostor", img: "balconySunset" },
  { id: "kitchen", label: "Kuhinja", target: "pogodnosti", img: "kitchenLiving" },
  { id: "bedroom", label: "Soba", target: "prostor", img: "bedroomLight" },
  { id: "beach", label: "Plaža", target: "okolina", img: "diningDaylight" },
] as const;

export const heroStats = [
  { id: "bedroom", value: "1", label: "spavaća soba" },
  { id: "guests", value: "4", label: "gosta" },
  { id: "parking", value: "Parking", label: "uz zgradu" },
  { id: "beach", value: "6–10 min", label: "do Slovenske" },
] as const;

export const spaces = [
  {
    id: "bedroom",
    title: "Spavaća soba",
    text: "Bračni krevet, bež lan i svjetlo od poda do plafona. Pampas u ćošku, tišina kad se vrata zatvore.",
    img: "bedroomLight",
    features: [
      { label: "Bračni krevet", x: 58, y: 58 },
      { label: "Visoko svjetlo", x: 18, y: 28 },
      { label: "Klima u stanu", x: 82, y: 16 },
    ],
  },
  {
    id: "living",
    title: "Dnevni i kuhinja",
    text: "Otvoreni prostor: ugaona sofa, trpezarija za četiri i kuhinja sa rernom, pločom i frižiderom. Kuvate kad hoćete.",
    img: "kitchenLiving",
    features: [
      { label: "Puna kuhinja", x: 22, y: 48 },
      { label: "Trpezarija 4", x: 48, y: 62 },
      { label: "Ugaona sofa", x: 78, y: 70 },
    ],
  },
  {
    id: "balcony",
    title: "Veče na balkonu",
    text: "Terakota, tri stolice i brda koja hvataju zalazak. Ovo je mjesto stana — ne dnevni, ne plaža, nego ovaj prag.",
    img: "balconySunset",
    features: [
      { label: "Sto i stolice", x: 42, y: 62 },
      { label: "Pogled na brdo", x: 68, y: 28 },
      { label: "Zlatni sat", x: 52, y: 16 },
    ],
  },
] as const;

export const moments = [
  {
    id: "beach",
    title: "Slovenska plaža",
    badge: "6–10 min hoda",
    icon: "footprints" as const,
    text: "Najduža gradska plaža. Kupanje i sladoled bez sedanja u auto — ručnik niz naselje i gotovo.",
    img: "budvaBeach",
    size: "feature" as const,
  },
  {
    id: "oldtown",
    title: "Stari grad i zidine",
    badge: "20–25 min hoda",
    icon: "map" as const,
    text: "Kamene ulice, crveni krovovi i šetnja uz more. Nazad liftom, bez lova na parking u centru.",
    img: "budvaOldTown",
    size: "feature" as const,
  },
  {
    id: "cafes",
    title: "Kafići u hladu zidina",
    badge: "Skriveni uglovi",
    icon: "coffee" as const,
    text: "Uske ulice, hlad od kamena i tišina van glavne gužve. Vino ostaje u sjeni zvonika.",
    img: "budvaStreets",
    size: "compact" as const,
  },
  {
    id: "bay",
    title: "Zaliv i šetalište",
    badge: "Uz obalu",
    icon: "sparkles" as const,
    text: "Svjetla grada na mirnom moru. Šetalište, pa kući — parking vas čeka ispred zgrade.",
    img: "budvaNight",
    size: "compact" as const,
  },
] as const;

export const amenityGroups = [
  { id: "inside", label: "Unutra / Soba" },
  { id: "tech", label: "Kuhinja & Tehnika" },
  { id: "outside", label: "Terasa & Pogled" },
  { id: "extra", label: "Dodatno" },
] as const;

export const amenities = [
  {
    id: "wifi",
    icon: "wifi" as const,
    group: "tech" as const,
    title: "Wi-Fi",
    body: "Internet u stanu, za mape, pozive i kišno popodne.",
  },
  {
    id: "ac",
    icon: "snowflake" as const,
    group: "tech" as const,
    title: "Klima",
    body: "Hladite prostor poslije plaže. Jedinica je u dnevnom boravku.",
  },
  {
    id: "terrace",
    icon: "sun" as const,
    group: "outside" as const,
    title: "Balkon pod brdima",
    body: "Sto i stolice napolju, pogled na brda iznad Babilonije.",
  },
  {
    id: "kitchen",
    icon: "utensils" as const,
    group: "tech" as const,
    title: "Opremljena kuhinja",
    body: "Ploča, rerna, frižider, čajnik — kuvate kao kod kuće.",
  },
  {
    id: "laundry",
    icon: "washing" as const,
    group: "inside" as const,
    title: "Mašina za veš",
    body: "U kupatilu, uz tuš. Praktično za duži boravak.",
  },
  {
    id: "shower",
    icon: "shower" as const,
    group: "inside" as const,
    title: "Tuš kabina",
    body: "Kupatilo sa tušem, lavaboom i bojlerom.",
  },
  {
    id: "tv",
    icon: "tv" as const,
    group: "tech" as const,
    title: "Moderan TV",
    body: "Dnevni boravak, zid sa drvenim lamelama.",
  },
  {
    id: "parking",
    icon: "car" as const,
    group: "extra" as const,
    title: "Parking",
    body: "Parking uz zgradu. U sezoni javite se unaprijed za detalje.",
  },
  {
    id: "elevator",
    icon: "elevator" as const,
    group: "extra" as const,
    title: "Lift u zgradi",
    body: "Ulaz broj 19 — lift od prizemlja, bez nošenja kola uz stepenice.",
  },
  {
    id: "pets",
    icon: "paw" as const,
    group: "extra" as const,
    title: "Kućni ljubimci",
    body: "Ljubimci su dozvoljeni. Najavite u upitu.",
  },
  {
    id: "nonsmoking",
    icon: "wind" as const,
    group: "inside" as const,
    title: "Pušenje samo napolju",
    body: "U stanu se ne puši. Terasa ostaje za kafu i veče.",
  },
] as const;

export const distances = [
  {
    id: "beach",
    icon: "waves" as const,
    title: "Slovenska plaža",
    value: "6–10 min",
    minutes: 8,
  },
  {
    id: "center",
    icon: "map" as const,
    title: "Centar Budve",
    value: "0,9 km",
    minutes: 12,
  },
  {
    id: "oldtown",
    icon: "landmark" as const,
    title: "Stari grad",
    value: "20–25 min",
    minutes: 22,
  },
  {
    id: "tivat",
    icon: "plane" as const,
    title: "Aerodrom Tivat",
    value: "23 km",
    minutes: 35,
  },
] as const;

export const nearby = [
  {
    id: "slovenska",
    title: "Slovenska plaža",
    distance: "6–10 min hoda",
    minutes: 8,
    text: "Najduža gradska plaža. Hodom, bez auta — ručnik niz naselje i gotovo.",
    img: "budvaBeach" as const,
    icon: "footprints" as const,
    lat: 42.2878,
    lng: 18.8432,
    zoom: 15,
  },
  {
    id: "babilonija",
    title: "Babilonija",
    distance: "Tu ste",
    minutes: 0,
    text: "Miran stambeni blok. Parking ispred zgrade, autobus na 200 metara.",
    img: "buildingFacade" as const,
    icon: "building" as const,
    lat: 42.29421,
    lng: 18.845092,
    zoom: 16,
  },
  {
    id: "oldtown",
    title: "Stari grad",
    distance: "20–25 min hoda",
    minutes: 22,
    text: "Istorijski centar: zidine, kamen i večernje šetnje uz more.",
    img: "budvaOldTown" as const,
    icon: "pin" as const,
    lat: 42.2778,
    lng: 18.8375,
    zoom: 16,
  },
  {
    id: "transit",
    title: "Autobus i Tivat",
    distance: "200 m · 23 km",
    minutes: 12,
    text: "Gradski autobus u naselju. Aerodrom Tivat oko 23 km.",
    img: "buildingEntrance" as const,
    icon: "bus" as const,
    lat: 42.29421,
    lng: 18.845092,
    zoom: 14,
  },
] as const;

export const neighborhoodShots = [
  { img: "buildingFacade" as const, alt: "Fasada zgrade u Babiloniji" },
  { img: "buildingEntrance" as const, alt: "Ulaz broj 19" },
  { img: "balconyViewDay" as const, alt: "Pogled iz stana na naselje" },
  { img: "lobbyElevator" as const, alt: "Lift u zgradi" },
];

export const inquiryPerks = [
  "6–10 minuta do Slovenske plaže",
  "Kuhinja, klima i mašina za veš",
  "Terasa pod brdima",
  "Lift i parking uz zgradu",
  "Kućni ljubimci dobrodošli",
] as const;
