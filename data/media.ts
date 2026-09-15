import type { Photo } from "@/types/photo";

const img = (name: string) => `/images/apartman/${name}.jpg`;

export const photos = {
  bedroomLight: img("bedroom-light"),
  kitchen: img("kitchen"),
  diningBalcony: img("dining-balcony"),
  diningDaylight: img("dining-balcony-daylight"),
  kitchenLiving: img("kitchen-living"),
  livingTv: img("living-tv-wall"),
  bedroomAngle: img("bedroom-angle"),
  balconySunset: img("balcony-sunset"),
  livingSofaBalcony: img("living-sofa-balcony"),
  livingSofa: img("living-sofa"),
  balconyViewDay: img("balcony-view-day"),
  balconyDaylight: img("balcony-daylight"),
  bathroomWasher: img("bathroom-washer"),
  bathroomSink: img("bathroom-sink"),
  buildingFacade: img("building-facade"),
  buildingEntrance: img("building-entrance"),
  lobbyElevator: img("lobby-elevator"),
  elevator: img("elevator"),
  budvaOldTown: "/images/budva/old-town.jpg",
  budvaBeach: "/images/budva/slovenska.jpg",
  budvaStreets: "/images/budva/streets.jpg",
  budvaNight: "/images/budva/night.jpg",
} as const;

export const media = {
  hero: photos.balconySunset,
  heroSupport: photos.diningDaylight,
  about: {
    mosaic: [photos.diningDaylight, photos.bedroomLight, photos.kitchenLiving, photos.livingTv],
  },
  og: photos.balconySunset,
} as const;

export const gallery: Photo[] = [
  {
    src: photos.bedroomLight,
    alt: "Spavaća soba sa bračnim krevetom, bež posteljinom i pampasom uz stakleni zid",
    title: "Spavaća soba ujutru",
    period: "morning",
    hotspots: [{ label: "Bračni krevet", x: 58, y: 58 }],
  },
  {
    src: photos.kitchen,
    alt: "Kuhinja izbliza — rerna, ploča, sudopera, čajnik i frižider",
    title: "Kuhinja u jutarnjem svjetlu",
    period: "morning",
    hotspots: [{ label: "Ploča i rerna", x: 42, y: 52 }],
  },
  {
    src: photos.diningBalcony,
    alt: "Trpezarijski sto za četiri osobe i izlaz na balkon sa stolom i stolicama",
    title: "Trpezarija prema balkonu",
    period: "morning",
  },
  {
    src: photos.bedroomAngle,
    alt: "Spavaća soba iz drugog ugla — krevet, noćni ormarić i uski ormar",
    title: "Spavaća iz drugog ugla",
    period: "morning",
  },
  {
    src: photos.diningDaylight,
    alt: "Trpezarija u jakom dnevnom svjetlu, otvoren balkon i pogled na brdo",
    title: "Trpezarija po danu",
    span: "tall",
    period: "day",
  },
  {
    src: photos.kitchenLiving,
    alt: "Kuhinja se otvara u dnevni boravak sa TV komodom i parketom",
    title: "Kuhinja i dnevni",
    span: "wide",
    period: "day",
    hotspots: [
      { label: "Puna kuhinja", x: 22, y: 48 },
      { label: "Ugaona sofa", x: 78, y: 70 },
    ],
  },
  {
    src: photos.balconyDaylight,
    alt: "Balkon po danu — crvene stolice, terakota pod i zelena brda",
    title: "Balkon u podne",
    period: "day",
  },
  {
    src: photos.balconyViewDay,
    alt: "Pogled sa balkona na parking, krovove i brdo iznad Budve",
    title: "Pogled na Babiloniju",
    span: "tall",
    period: "day",
  },
  {
    src: photos.bathroomWasher,
    alt: "Kupatilo sa tuš kabinom, lavaboom i mašinom za veš",
    title: "Kupatilo sa veš mašinom",
    period: "day",
  },
  {
    src: photos.bathroomSink,
    alt: "Kupatilo — tuš kabina, ogledalo i umivaonik",
    title: "Kupatilo",
    period: "day",
  },
  {
    src: photos.buildingFacade,
    alt: "Fasada stambene zgrade u Babiloniji, ulaz i parking ispred",
    title: "Fasada zgrade",
    period: "day",
  },
  {
    src: photos.buildingEntrance,
    alt: "Ulaz u zgradu broj 19, Veljka Vlahovića",
    title: "Ulaz 19",
    period: "day",
  },
  {
    src: photos.livingTv,
    alt: "Zid dnevnog boravka sa drvenim lamelama, televizorom i visokim ormarom",
    title: "Zid dnevnog boravka",
    period: "day",
  },
  {
    src: photos.livingSofa,
    alt: "Dnevni boravak — ugaona sofa, tepih i televizor",
    title: "Ugaona sofa",
    period: "day",
    hotspots: [{ label: "Ugaona sofa", x: 46, y: 58 }],
  },
  {
    src: photos.balconySunset,
    alt: "Balkon u zlatnom satu — stolice, sto i brda iznad Babilonije",
    title: "Balkon u zlatnom satu",
    span: "wide",
    period: "golden",
    hotspots: [
      { label: "Sto i stolice", x: 42, y: 62 },
      { label: "Pogled na brdo", x: 68, y: 28 },
    ],
  },
  {
    src: photos.livingSofaBalcony,
    alt: "Ugaona garnitura, sto i trpezarija sa pogledom kroz balkon",
    title: "Sofa prema zalasku",
    span: "wide",
    period: "golden",
    hotspots: [{ label: "Ugaona sofa", x: 48, y: 62 }],
  },
];
