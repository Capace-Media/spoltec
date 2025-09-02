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

export type ServiceBlock =
  | ServiceVideoBlock
  | ServiceBlurbsBlock
  | ServiceTextBildBlock
  | ServiceListaBlock
  | ServiceTjansterBlock
  | ServiceTextBlock;

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
