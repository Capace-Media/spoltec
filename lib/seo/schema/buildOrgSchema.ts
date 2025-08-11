import { Organization, WithContext } from "schema-dts";

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
  foundingDate?: string; // YYYY-MM-DD
  founders?: string[]; // Person names
  address?: {
    streetAddress?: string;
    postalCode?: string;
    addressLocality?: string; // City
    addressRegion?: string; // State/Region
    addressCountry?: string; // ISO code or name
  };
}): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
    logo: input.logoUrl,
    sameAs: input.sameAs,
    legalName: input.legalName,
    alternateName: input.alternateName,
    description: input.description,
    telephone: input.telephone,
    email: input.email,
    foundingDate: input.foundingDate,
    founder: input.founders?.map((name) => ({ "@type": "Person", name })),
    address: input.address && { "@type": "PostalAddress", ...input.address },
  };
}
