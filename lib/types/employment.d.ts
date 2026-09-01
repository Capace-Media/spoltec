import { Seo } from "./page";
import { PostImage } from "./post";

export interface PositionFields {
  underrubrik?: string;
  bild?: PostImage | null;
}

/** A block on a job opening. Shapes mirror the page/post blocks, only the
 * `fieldGroupName` prefix differs (`GqlEmployment_Gqlblocks_Blocks_*`). */
export interface PositionBlock {
  fieldGroupName: string;
  [key: string]: any;
}

export interface PositionListItem {
  id: string;
  title: string;
  slug: string;
  uri: string;
  date?: string;
  gqlPositionFields?: PositionFields;
}

export interface Position extends PositionListItem {
  dateGmt?: string;
  modifiedGmt?: string;
  seo: Seo;
  gqlBlocks?: {
    blocks: PositionBlock[];
  };
}

export interface GetPositionQueryData {
  gqlEmployment: Position | null;
}

export interface GetPositionsQueryData {
  gqlAllEmployment: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: {
      node: PositionListItem;
    }[];
  } | null;
}
