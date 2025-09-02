import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

const { GRAPHQL_ENDPOINT, GRAPHQL_USER, GRAPHQL_PASS } = process.env;

if (!GRAPHQL_ENDPOINT || !GRAPHQL_USER || !GRAPHQL_PASS) {
  throw new Error(
    "Missing required env vars: GRAPHQL_ENDPOINT, GRAPHQL_USER, GRAPHQL_PASS"
  );
}

const token = Buffer.from(`${GRAPHQL_USER}:${GRAPHQL_PASS}`).toString("base64");

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

async function fetchWithTimeout(
  input: string,
  init: RequestInit = {},
  timeoutMs = 30000
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function WP<T>(query: string): Promise<T> {
  const response = await fetchWithTimeout(GRAPHQL_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `GraphQL HTTP error: ${response.status} ${response.statusText}\n${text}`
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    const messages = json.errors.map((e) => e.message).join("; ");
    throw new Error(`GraphQL response errors: ${messages}`);
  }

  if (!json.data) {
    throw new Error("GraphQL response missing data");
  }

  return json.data;
}

const SERVICES_QUERY = `
  query getServices {
    gqlAllService(first: 50) {
      edges {
        node {
          title
          slug
          uri
          gqlHeroFields {
            underrubrik
            introduktionstext
            bild { mediaItemUrl }
          }
        }
      }
    }
  }
`;

const POSITIONS_QUERY = `
  query getAllPositions {
    gqlAllEmployment {
      edges {
        node {
          title
          slug
          uri
          gqlPositionFields {
            bild { mediaItemUrl }
            underrubrik
          }
        }
      }
    }
  }
`;

const CATEGORIES_QUERY = `
  query GET_CATEGORIES {
    page(id: "/kunskapsbank", idType: URI) {
      id
      title
      uri
      slug
      gqlKategori {
        kategorier {
          uri
          title
          slug
          underrubrik
          introduktionstext
          bild { mediaItemUrl }
        }
      }
    }
  }
`;

const pluckNodes = (edges?: Array<{ node: any }>) =>
  edges?.map(({ node }) => node) ?? [];

const outPath = (file: string) => path.resolve(process.cwd(), "data", file);

async function prebuild() {
  const [servicesData, positionsData, categoriesData] = await Promise.all([
    WP<any>(SERVICES_QUERY),
    WP<any>(POSITIONS_QUERY),
    WP<any>(CATEGORIES_QUERY),
  ]);

  const services = pluckNodes(servicesData?.gqlAllService?.edges);
  const positions = pluckNodes(positionsData?.gqlAllEmployment?.edges);
  const categories = categoriesData?.page?.gqlKategori?.kategorier ?? [];

  await fs.mkdir(path.resolve(process.cwd(), "data"), { recursive: true });

  await Promise.all([
    fs.writeFile(
      outPath("static-services.json"),
      JSON.stringify(services, null, 2)
    ),
    fs.writeFile(
      outPath("static-positions.json"),
      JSON.stringify(positions, null, 2)
    ),
    fs.writeFile(
      outPath("static-categories.json"),
      JSON.stringify(categories, null, 2)
    ),
  ]);

  console.log(
    `Wrote: services(${services.length}), positions(${positions.length}), categories(${categories.length})`
  );
}

prebuild().catch((err) => {
  console.error(err);
  process.exit(1);
});
