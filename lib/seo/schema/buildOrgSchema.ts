import type {
  DayOfWeek,
  LocalBusiness,
  OpeningHoursSpecification,
  WithContext,
} from "schema-dts";

interface Geo {
  latitude: number;
  longitude: number;
}

interface Location {
  name: string;
  telephone?: string;
  email?: string;
  geo?: Geo;
  address: {
    streetAddress?: string;
    postalCode?: string;
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
}

/** Weekday office hours; emergency line is advertised separately as 24/7. */
const WEEKDAYS: DayOfWeek[] = [
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
];

const OPENING_HOURS: OpeningHoursSpecification[] = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: WEEKDAYS,
    opens: "07:00",
    closes: "16:00",
  },
];

export function buildOrgSchema(input: {
  name: string;
  url: string;
  logoUrl?: string;
  sameAs?: string[];
  legalName?: string;
  alternateName?: string;
  description?: string;
  telephone?: string;
  email?: string;
  foundingDate?: string;
  founders?: string[];
  priceRange?: string;
  geo?: Geo;
  address?: {
    streetAddress?: string;
    postalCode?: string;
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
  locations?: Location[];
}): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.spoltec.se/#organization`,
    name: input.name,
    url: input.url,
    logo: input.logoUrl,
    image: input.logoUrl,
    sameAs: input.sameAs,
    legalName: input.legalName,
    alternateName: input.alternateName,
    description: input.description,
    telephone: input.telephone,
    email: input.email,
    foundingDate: input.foundingDate,
    founder: input.founders?.map((name) => ({ "@type": "Person", name })),
    address: input.address && { "@type": "PostalAddress", ...input.address },
    ...(input.geo && {
      geo: { "@type": "GeoCoordinates" as const, ...input.geo },
    }),
    openingHoursSpecification: OPENING_HOURS,
    ...(input.priceRange && { priceRange: input.priceRange }),
    ...(input.locations && {
      location: input.locations.map((loc) => ({
        "@type": "LocalBusiness" as const,
        name: loc.name,
        telephone: loc.telephone,
        email: loc.email,
        address: { "@type": "PostalAddress" as const, ...loc.address },
        ...(loc.geo && {
          geo: { "@type": "GeoCoordinates" as const, ...loc.geo },
        }),
        openingHoursSpecification: OPENING_HOURS,
      })),
    }),
    areaServed: [
      { "@type": "City", name: "Malmö" },
      { "@type": "City", name: "Eslöv" },
      { "@type": "City", name: "Lund" },
      { "@type": "City", name: "Helsingborg" },
      { "@type": "City", name: "Kristianstad" },
      { "@type": "City", name: "Stockholm" },
      { "@type": "City", name: "Göteborg" },
      { "@type": "City", name: "Uppsala" },
      { "@type": "City", name: "Jönköping" },
      { "@type": "City", name: "Växjö" },
      { "@type": "City", name: "Varberg" },
      { "@type": "City", name: "Borås" },
    ],
    knowsAbout: [
      "Miljövänliga metoder (utan bisfenol och epoxi)",
      "Certifierad provtagning i samarbete med miljöförvaltningar i Skåne",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Certifierad provtagare av miljöförvaltningar i Skåne",
    },
  };
}
