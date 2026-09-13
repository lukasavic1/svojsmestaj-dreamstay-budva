export const highlights = [
  { id: "terrace", label: "Terasa", target: "prostor", img: "balconySunset" },
  { id: "kitchen", label: "Kuhinja", target: "pogodnosti", img: "kitchen" },
  { id: "bedroom", label: "Soba", target: "prostor", img: "bedroomLight" },
  { id: "beach", label: "Plaža", target: "okolina", img: "diningDaylight" },
] as const;

export const heroStats = [
  { id: "bedroom", value: "1", label: "spavaća soba" },
  { id: "guests", value: "4", label: "gosta" },
  { id: "beach", value: "6–10 min", label: "do Slovenske" },
  { id: "center", value: "0,9 km", label: "centar Budve" },
] as const;

export const spaces = [
  {
    id: "bedroom",
    title: "Spavaća soba",
    text: "Bračni krevet, bež lan i svjetlo od poda do plafona. Pampas u ćošku, tišina kad se vrata zatvore.",
    img: "bedroomLight",
    features: ["Bračni krevet", "Visoko svjetlo", "Klima u stanu"],
  },
  {
    id: "living",
    title: "Dnevni i kuhinja",
    text: "Otvoreni prostor: ugaona sofa, trpezarija za četiri i kuhinja sa rernom, pločom i frižiderom. Kuvate kad hoćete.",
    img: "kitchenLiving",
    features: ["Ugaona sofa", "Trpezarija 4", "Puna kuhinja"],
  },
  {
    id: "balcony",
    title: "Veče na balkonu",
    text: "Terakota, tri stolice i brda koja hvataju zalazak. Ovo je mjesto stana — ne dnevni, ne plaža, nego ovaj prag.",
    img: "balconySunset",
    features: ["Sjedište napolju", "Pogled na brdo", "Zlatni sat"],
  },
] as const;

export const moments = [
  {
    id: "beach",
    title: "Šest minuta do Slovenske",
    chip: "6–10 min",
    text: "Lagani hod niz naselje. Ručnik, sladoled, pa nazad kući prije vrucine.",
    img: "diningDaylight",
    span: "wide",
  },
  {
    id: "golden",
    title: "Zalazak sa balkona",
    chip: "veče",
    text: "Brda pocrvene, fasada uhvati terakotu. Vino ostaje na stolu.",
    img: "balconySunset",
    span: "normal",
  },
  {
    id: "breakfast",
    title: "Doručak koji sami napravite",
    chip: "kuhinja",
    text: "Rerna, čajnik, frižider. Pekara je u šetnji — jaja i hleb ostaju vaši.",
    img: "kitchen",
    span: "normal",
  },
  {
    id: "oldtown",
    title: "Stari grad uveče",
    chip: "20–25 min",
    text: "Hod do zidina kad se spusti vrućina. Nazad liftom, bez potrage za parkingom u centru.",
    img: "livingSofaBalcony",
    span: "wide",
  },
] as const;

export const amenities = [
  {
    id: "wifi",
    icon: "wifi" as const,
    title: "Wi-Fi",
    body: "Internet u stanu, za mape, pozive i kišno popodne.",
  },
  {
    id: "ac",
    icon: "snowflake" as const,
    title: "Klima",
    body: "Hladite prostor poslije plaže. Jedinica je u dnevnom boravku.",
  },
  {
    id: "terrace",
    icon: "sun" as const,
    title: "Terasa sa sjedištem",
    body: "Sto i stolice napolju, pogled na brda iznad Babilonije.",
  },
  {
    id: "kitchen",
    icon: "utensils" as const,
    title: "Opremljena kuhinja",
    body: "Ploča, rerna, frižider, čajnik — kuvate kao kod kuće.",
  },
  {
    id: "laundry",
    icon: "washing" as const,
    title: "Mašina za veš",
    body: "U kupatilu, uz tuš. Praktično za duži boravak.",
  },
  {
    id: "shower",
    icon: "shower" as const,
    title: "Tuš kabina",
    body: "Kupatilo sa tušem, lavaboom i bojlerom.",
  },
  {
    id: "tv",
    icon: "tv" as const,
    title: "TV sa ravnim ekranom",
    body: "Dnevni boravak, zid sa drvenim lamelama.",
  },
  {
    id: "parking",
    icon: "car" as const,
    title: "Parking",
    body: "Parking uz zgradu. U sezoni javite se unaprijed za detalje.",
  },
  {
    id: "elevator",
    icon: "elevator" as const,
    title: "Lift u zgradi",
    body: "Ulaz broj 19 — lift od prizemlja, bez nošenja kola uz stepenice.",
  },
  {
    id: "pets",
    icon: "paw" as const,
    title: "Kućni ljubimci",
    body: "Ljubimci su dozvoljeni. Najavite u upitu.",
  },
  {
    id: "nonsmoking",
    icon: "wind" as const,
    title: "Nenapušen stan",
    body: "Pušenje u stanu nije dozvoljeno. Terasa je napolju.",
  },
] as const;

export const distances = [
  {
    id: "beach",
    icon: "waves" as const,
    title: "Slovenska plaža",
    value: "6–10 min hoda",
  },
  {
    id: "center",
    icon: "map" as const,
    title: "Centar Budve",
    value: "~0,9 km",
  },
  {
    id: "oldtown",
    icon: "landmark" as const,
    title: "Stari grad",
    value: "20–25 min hoda",
  },
  {
    id: "bus",
    icon: "bus" as const,
    title: "Autobus Slavija",
    value: "~200 m",
  },
  {
    id: "tivat",
    icon: "plane" as const,
    title: "Aerodrom Tivat",
    value: "~23 km",
  },
] as const;

export const nearby = [
  {
    id: "slovenska",
    title: "Slovenska plaža",
    distance: "6–10 min",
    text: "Najduža gradska plaža. Hodate, ne vozite. Ujutru prije gužve, uveče uz šetalište.",
  },
  {
    id: "babilonija",
    title: "Babilonija",
    distance: "tu ste",
    text: "Stambeno naselje iza obale: parking, drveće, manje špica nego na samoj Slovenskoj.",
  },
  {
    id: "oldtown",
    title: "Stari grad",
    distance: "20–25 min",
    text: "Zidine, kamen i večernja šetnja. Taksi ako ne želite hod poslije kasne večere.",
  },
  {
    id: "slavija",
    title: "Stanica Slavija",
    distance: "200 m",
    text: "Autobus pred vratima. Tivat je ~23 km — za dolazak avionom, ne za svakodnevni hod.",
  },
] as const;

export const inquiryPerks = [
  "6–10 minuta do Slovenske plaže",
  "Kuhinja, klima i mašina za veš",
  "Terasa pod brdima",
  "Lift i parking uz zgradu",
  "Kućni ljubimci dobrodošli",
] as const;
