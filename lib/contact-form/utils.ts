export const LOCATION_MAP: { [key: string]: string } = {
  boras: "Borås",
  goteborg: "Göteborg",
  malmo: "Malmö",
  helsingborg: "Helsingborg",
  kalmar: "Kalmar",
  karlskrona: "Karlskrona",
  kristianstad: "Kristianstad",
  halmstad: "Halmstad",
  varberg: "Varberg",
  vaxjo: "Växjö",
  jonkoping: "Jönköping",
};

// Add service mapping
export const SERVICE_MAP: { [key: string]: string } = {
  avloppsspolning: "Avloppsspolning",
  relining: "Relining",
  oljeavskiljare: "Oljeavskiljare",
  rorinspektion: "Rörinspektion",
  kanaltatning: "Kanaltätning",
  kvicksilversanering: "Kvicksilversanering",
};

// Pre-compile regex outside component
export const LOCATION_REGEX =
  /-(boras|goteborg|malmo|helsingborg|kalmar|karlskrona|kristianstad|halmstad|varberg|vaxjo|jonkoping)$/;

// Add service regex - matches service at the beginning of slug
export const SERVICE_REGEX =
  /^(avloppsspolning|relining|oljeavskiljare|rorinspektion|kanaltatning|kvicksilversanering)/;

// Move function outside component to avoid recreation
export const getReadableLocation = (slug: string): string | null => {
  const match = slug.match(LOCATION_REGEX);
  if (match) {
    return LOCATION_MAP[match[1] as keyof typeof LOCATION_MAP] || null;
  }
  return null;
};

// Add service extraction function
export const getReadableService = (slug: string): string | null => {
  const match = slug.match(SERVICE_REGEX);
  if (match) {
    return SERVICE_MAP[match[1] as keyof typeof SERVICE_MAP] || null;
  }
  return null;
};
