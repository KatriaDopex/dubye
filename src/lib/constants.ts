export interface Destination {
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  arcColor: string;
  costIndex: string;
  visaEase: number;
  sceneRating: number;
  tagline: string;
}

export const DUBAI: { lat: number; lng: number } = {
  lat: 25.2048,
  lng: 55.2708,
};

export const DESTINATIONS: Destination[] = [
  {
    city: "Bangkok",
    country: "Thailand",
    flag: "\u{1F1F9}\u{1F1ED}",
    lat: 13.7563,
    lng: 100.5018,
    arcColor: "#ff6b9d",
    costIndex: "$1,400/mo",
    visaEase: 4,
    sceneRating: 5,
    tagline: "Infinite optionality. The city that never asks questions.",
  },
  {
    city: "Hong Kong",
    country: "Hong Kong SAR",
    flag: "\u{1F1ED}\u{1F1F0}",
    lat: 22.3193,
    lng: 114.1694,
    arcColor: "#ef4444",
    costIndex: "$3,200/mo",
    visaEase: 3,
    sceneRating: 5,
    tagline: "The comeback kid. Finance capital with a chip on its shoulder.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    lat: 1.3521,
    lng: 103.8198,
    arcColor: "#10b981",
    costIndex: "$3,500/mo",
    visaEase: 3,
    sceneRating: 4,
    tagline: "Dubai's mirror image. Regulated, rich, ruthlessly efficient.",
  },
  {
    city: "Bali",
    country: "Indonesia",
    flag: "\u{1F1EE}\u{1F1E9}",
    lat: -8.3405,
    lng: 115.092,
    arcColor: "#00ffcc",
    costIndex: "$1,200/mo",
    visaEase: 4,
    sceneRating: 5,
    tagline: "The OG escape. Spiritual on the surface, ruthless underneath.",
  },
];

// Phuket coordinates for Bangkok → Phuket secondary arc
export const PHUKET = { lat: 7.8804, lng: 98.3923 };

export const STATS = [
  { value: 840, label: "Clients relocated", prefix: "", suffix: "+" },
  { value: 4, label: "Destination cities", prefix: "", suffix: "" },
  { value: 98, label: "Client satisfaction", prefix: "", suffix: "%" },
  { value: 14, label: "Avg. days to relocate", prefix: "", suffix: "" },
];
