import { Seo } from "./page";

export interface ServiceImage {
  mediaItemUrl: string;
  altText: string;
}

export interface ServiceVideo {
  mediaItemUrl: string;
  mediaDetails: {
    file: string;
    height: number;
    width: number;
  };
  altText: string;
}

export interface ServiceButton {
  url: string;
  text: string;
}

export interface ServiceTextBody {
  rubrik: string;
  text: string;
  knapp: ServiceButton;
}

export interface ServiceBlurb {
  rubrik: string;
  text: string;
  underrubrik: string;
  bild: ServiceImage;
}

export interface ServicePunkt {
  text: string;
}

export interface ServiceInstallningar {
  bakgrund: string;
}

export interface ServiceVideoBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_Video";
  thumbnailurl: ServiceImage;
  video: ServiceVideo;
}

export interface ServiceBlurbsBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_Blurbs";
  blurbText: string;
  installningar: ServiceInstallningar;
  blurbs: ServiceBlurb[];
}

export interface ServiceTextBildBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_TextBild";
  textBody: ServiceTextBody;
  bilder: ServiceImage[];
}

export interface ServiceListaBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_Lista";
  text: string;
  punkter: ServicePunkt[];
  avslut: string;
}

export interface ServiceTjansterBlock {
  fieldGroupName:
    | "Page_Gqlblocks_Blocks_Tjanster"
    | "GqlService_Gqlblocks_Blocks_Tjanster"
    | "Post_Gqlblocks_Blocks_Tjanster";
  rubrik: string;
  serviceText: string;
}

export interface ServiceTextBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_Text";
  rubrik: string;
  text: string;
}

export interface ServiceIntro {
  title: string;
  text: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceFaqBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_Faq";
  intro: ServiceIntro;
  faqs: ServiceFaq[];
}

export interface ServiceListItem {
  text: string;
  title: string;
}

export interface ServiceHowToBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_HowTo";
  intro: ServiceIntro;
  listItem: ServiceListItem[];
}

export interface ServiceTableHeader {
  th1: string;
  th2: string;
  th3: string;
}

export interface ServiceTableBody {
  td1: string;
  td2: string;
  td3: string;
}

export interface ServiceTable {
  caption: string;
  thead: ServiceTableHeader;
  tbody: ServiceTableBody[];
}

export interface ServiceProsAndConsBlock {
  fieldGroupName: "GqlService_Gqlblocks_Blocks_ProsAndCons";
  intro: ServiceIntro;
  table: ServiceTable;
}

export type ServiceBlock =
  | ServiceVideoBlock
  | ServiceBlurbsBlock
  | ServiceTextBildBlock
  | ServiceListaBlock
  | ServiceTjansterBlock
  | ServiceTextBlock
  | ServiceFaqBlock
  | ServiceHowToBlock
  | ServiceProsAndConsBlock;

export interface ServiceBlocks {
  blocks: ServiceBlock[];
}

export interface ServiceHeroFields {
  underrubrik: string;
  introduktionstext: string;
  bild: ServiceImage;
}

export interface Service {
  title: string;
  slug: string;
  seo: Seo;
  gqlBlocks: ServiceBlocks;
  gqlHeroFields: ServiceHeroFields;
}

export interface GetServiceQueryData {
  gqlService: Service | null;
}
