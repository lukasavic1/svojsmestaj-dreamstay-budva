export type PhotoPeriod = "morning" | "day" | "golden";

export type PhotoHotspot = {
  label: string;
  x: number;
  y: number;
};

export type Photo = {
  src: string;
  alt: string;
  title?: string;
  span?: "wide" | "tall" | "normal";
  period?: PhotoPeriod;
  hotspots?: PhotoHotspot[];
};
