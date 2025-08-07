import { Seo } from "./page";

export interface PostImage {
  mediaItemUrl: string;
  altText?: string;
}

export interface PostHeroFields {
  underrubrik?: string;
  introduktionstext?: string;
  bild?: PostImage;
}

export interface Post {
  title: string;
  slug: string;
  uri: string;
  id: string;
  seo: Seo;
  gqlHeroFields?: PostHeroFields;
  gqlBlocks?: {
    blocks: PostBlock[];
  };
}

export interface GetPostQueryData {
  post: Post | null;
}

export type PostBlock =
  | PostBlurbsBlock
  | PostPersonalBlock
  | PostListaBlock
  | PostTextBildBlock
  | PostTjansterBlock
  | PostTextBlock
  | PostLedigaTjansterBlock;

export interface PostBlurbsBlock {
  fieldGroupName: "Post_Gqlblocks_Blocks_Blurbs";
  blurbText: string;
  installningar?: {
    bakgrund?: string;
  };
  blurbs?: Array<{
    rubrik?: string;
    text?: string;
    underrubrik?: string;
    bild?: {
      mediaItemUrl: string;
      altText?: string;
    };
  }>;
}

export interface PostPersonalBlock {
  fieldGroupName: "Post_Gqlblocks_Blocks_Personal";
  anstalld?: Array<{
    bild?: {
      altText?: string;
      id: string;
      mediaItemUrl: string;
    };
    namn?: string;
    titel?: string;
    telefon?: string;
    email?: string;
  }>;
}

export interface PostListaBlock {
  fieldGroupName: "Post_Gqlblocks_Blocks_Lista";
  text?: string;
  punkter?: Array<{
    text?: string;
  }>;
  avslut?: string;
}

export interface PostTextBildBlock {
  fieldGroupName: "Post_Gqlblocks_Blocks_TextBild";
  installningar?: {
    bakgrund?: string;
  };
  textBody?: {
    rubrik?: string;
    text?: string;
    knapp?: {
      url?: string;
      text?: string;
    };
  };
  bilder?: Array<{
    mediaItemUrl: string;
    altText?: string;
  }>;
}

export interface PostTjansterBlock {
  fieldGroupName: "Post_Gqlblocks_Blocks_Tjanster";
  rubrik?: string;
  serviceText?: string;
}

export interface PostTextBlock {
  fieldGroupName: "Post_Gqlblocks_Blocks_Text";
  rubrik?: string;
  text?: string;
  installning?: string;
  knapp?: {
    text?: string;
    url?: {
      id: string;
      slug: string;
    };
  };
}

export interface PostLedigaTjansterBlock {
  fieldGroupName: "Post_Gqlblocks_Blocks_LedigaTjanster";
  rubrik?: string;
  jobsText?: string;
}

export interface GetPostsQueryData {
  posts: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: {
      node: Omit<Post, "seo" | "gqlBlocks">;
    }[];
  } | null;
}
