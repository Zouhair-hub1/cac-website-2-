/**
 * Central site identity — edit here, propagates everywhere.
 * Avoids hardcoding the club name/links across components.
 */
export const SITE = {
  name: "Club Aero Centrale Casablanca",
  abbr: "CACC",
  get full() {
    return `${this.name} (${this.abbr})`;
  },
  school: "École Centrale Casablanca",
  slogan: "Exploring the sky and beyond",
  domain: "https://aeroclub.centrale-casablanca.ma",
  instagramHandle: "@centrale.aero",
} as const;
