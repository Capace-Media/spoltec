export interface SeoBreadcrumb {
  text: string;
  url: string;
}

export interface SeoOpengraphImage {
  sourceUrl: string;
}

export interface SeoTwitterImage {
  sourceUrl: string;
}

export interface SeoSchema {
  raw: string;
}

export interface Seo {
  canonical: string | null;
  breadcrumbs: SeoBreadcrumb[] | null;
  metaDesc: string | null;
  metaRobotsNoindex: string | null;
  metaRobotsNofollow: string | null;
  opengraphAuthor: string | null;
  opengraphDescription: string | null;
  opengraphTitle: string | null;
  title: string | null;
  schema: SeoSchema | null;
  opengraphImage: SeoOpengraphImage | null;
  opengraphSiteName: string | null;
  opengraphPublishedTime: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: SeoTwitterImage | null;
}

export interface PageImage {
  mediaItemUrl: string;
  altText: string;
}

export interface GqlHeroFields {
  underrubrik: string | null;
  introduktionstext: string | null;
  bild: PageImage | null;
}

// ... existing code ...

// Individual block type interfaces
export interface BlurbsBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_Blurbs";
  blurbText: string;
  installningar: {
    bakgrund: string;
  };
  blurbs: Array<{
    rubrik: string;
    text: string;
    underrubrik: string;
    bild: {
      mediaItemUrl: string;
      altText: string;
    };
  }>;
}

export interface PersonalBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_Personal";
  anstalld: {
    bild: {
      altText: string;
      id: string;
      mediaItemUrl: string;
    };
    namn: string;
    titel: string;
    telefon: string;
    email: string;
  };
}

export interface ListaBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_Lista";
  text: string;
  punkter: Array<{
    text: string;
  }>;
  avslut: string;
}

export interface TextBildBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_TextBild";
  installningar: {
    bakgrund: string;
  };
  textBody: {
    rubrik: string;
    text: string;
    knapp: {
      url: string;
      text: string;
    };
  };
  bilder: Array<{
    mediaItemUrl: string;
    altText: string;
  }>;
}

export interface TjansterBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_Tjanster";
  rubrik: string;
  serviceText: string;
}

export interface TextBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_Text";
  rubrik: string;
  text: string;
  installning: string;
  knapp: {
    text: string;
    url: {
      id: string;
      uri?: string; // For Page type
      slug?: string; // For GqlService type
    };
  };
}

export interface LedigaTjansterBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_LedigaTjanster";
  rubrik: string;
  jobsText: string;
}

// Union type for all possible blocks
export type Block =
  | BlurbsBlock
  | PersonalBlock
  | ListaBlock
  | TextBildBlock
  | TjansterBlock
  | TextBlock
  | LedigaTjansterBlock;

export interface GqlBlocks {
  blocks: Block[];
}

// ... existing code ...

export interface Page {
  title: string;
  slug: string;
  uri: string;
  id: string;
  seo?: Seo;
  gqlBlocks?: GqlBlocks; // Dynamic block structure that varies based on content
  gqlHeroFields: GqlHeroFields | null;
}

export interface GetPageQueryData {
  page: Page | null;
}
