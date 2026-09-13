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
    src: photos.balconySunset,
    alt: "Balkon u zlatnom satu — stolice, sto i brda iznad Babilonije",
    span: "wide",
  },
  {
    src: photos.diningDaylight,
    alt: "Trpezarija u jakom dnevnom svjetlu, otvoren balkon i pogled na brdo",
    span: "tall",
  },
  {
    src: photos.bedroomLight,
    alt: "Spavaća soba sa bračnim krevetom, bež posteljinom i pampasom uz stakleni zid",
  },
  {
    src: photos.kitchenLiving,
    alt: "Kuhinja se otvara u dnevni boravak sa TV komodom i parketom",
    span: "wide",
  },
  {
    src: photos.livingTv,
    alt: "Zid dnevnog boravka sa drvenim lamelama, televizorom i visokim ormarom",
  },
  {
    src: photos.kitchen,
    alt: "Kuhinja izbliza — rerna, ploča, sudopera, čajnik i frižider",
  },
  {
    src: photos.diningBalcony,
    alt: "Trpezarijski sto za četiri osobe i izlaz na balkon sa sjedištem",
  },
  {
    src: photos.bedroomAngle,
    alt: "Spavaća soba iz drugog ugla — krevet, noćni ormarić i uski ormar",
  },
  {
    src: photos.livingSofaBalcony,
    alt: "Ugaona garnitura, sto i trpezarija sa pogledom kroz balkon",
    span: "wide",
  },
  {
    src: photos.livingSofa,
    alt: "Dnevni boravak — ugaona sofa, tepih i televizor",
  },
  {
    src: photos.balconyDaylight,
    alt: "Balkon po danu — crvene stolice, terakota pod i zelena brda",
  },
  {
    src: photos.balconyViewDay,
    alt: "Pogled sa balkona na parking, krovove i brdo iznad Budve",
    span: "tall",
  },
  {
    src: photos.bathroomWasher,
    alt: "Kupatilo sa tuš kabinom, lavaboom i mašinom za veš",
  },
  {
    src: photos.bathroomSink,
    alt: "Kupatilo — tuš kabina, ogledalo i umivaonik",
  },
  {
    src: photos.buildingFacade,
    alt: "Fasada stambene zgrade u Babiloniji, ulaz i parking ispred",
  },
  {
    src: photos.buildingEntrance,
    alt: "Ulaz u zgradu broj 19, Veljka Vlahovića",
  },
];
