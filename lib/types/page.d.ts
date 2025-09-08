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
  focuskw: string | null;
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
  usp: { text: string }[];
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
  fieldGroupName:
    | "Page_Gqlblocks_Blocks_Tjanster"
    | "GqlService_Gqlblocks_Blocks_Tjanster"
    | "Post_Gqlblocks_Blocks_Tjanster";
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

export interface FaqBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_Faq";
  intro: {
    title: string;
    text: string;
  };
  faqs: Array<{
    q: string;
    a: string;
  }>;
}

export interface HowToBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_HowTo";
  intro: {
    text: string;
    title: string;
  };
  listItem: Array<{
    text: string;
    title: string;
  }>;
}

export interface TjansterHighlightsBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_TjansterHighlights";
  intro: {
    title: string;
    text: string;
  };
  services: Array<{
    id: string;
    title: string;
    slug: string;
    gqlHeroFields: {
      introduktionstext: string | null;
      bild: PageImage | null;
    };
  }>;
}

export interface ProsAndConsBlock {
  fieldGroupName: "Page_Gqlblocks_Blocks_ProsAndCons";
  intro: {
    text: string;
    title: string;
  };
  table: {
    caption: string;
    tbody: Array<{
      td1: string;
      td2: { text: string; truefalse: boolean };
      td3: { text: string; truefalse: boolean };
    }>;
    thead: {
      th1: string;
      th2: string;
      th3: string;
    };
  };
}

// Union type for all possible blocks
// Union type for all possible blocks
export type Block =
  | BlurbsBlock
  | PersonalBlock
  | ListaBlock
  | TextBildBlock
  | TjansterBlock
  | TextBlock
  | LedigaTjansterBlock
  | FaqBlock
  | TjansterHighlightsBlock
  | HowToBlock
  | ProsAndConsBlock;

export interface GqlBlocks {
  blocks: Block[];
}

export interface PageSchema {
  schema: {
    json: string;
  };
}

export interface Page {
  title: string;
  slug: string;
  uri: string;
  id: string;
  seo?: Seo;
  gqlBlocks?: GqlBlocks; // Dynamic block structure that varies based on content
  gqlHeroFields: GqlHeroFields | null;
  pageSchema: PageSchema | null;
}

export interface GetPageQueryData {
  page: Page | null;
}
