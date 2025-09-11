import type {
  FaqBlock,
  HowToBlock,
  PostHighlightsBlock,
  ProsAndConsBlock,
  TextBildBlock,
  TjansterBlock,
  TjansterHighlightsBlock,
} from "@lib/types/page";
import {
  TextImage,
  Video,
  Services,
  Text,
  Blurbs,
  List,
  Employee,
  AvailablePositions,
  Contact,
  CallToAction,
  FAQ,
  ProsAndCons,
  HowTo,
  ServiceHighlights,
  BlogPosts,
} from "./sections";

import type { Block as BlockType } from "@lib/types/page";
import type {
  ServiceBlock,
  ServiceFaqBlock,
  ServiceHowToBlock,
  ServicePostHighlightsBlock,
  ServiceProsAndConsBlock,
} from "@lib/types/service";
import type { PostBlock } from "@lib/types/post";

interface BlockProps {
  block: any;
  textImageOrdinal: number | undefined;
}

const Block = ({ block, textImageOrdinal }: BlockProps) => {
  switch (block.fieldGroupName) {
    case "Page_Gqlblocks_Blocks_TextBild":
      return (
        <TextImage data={block as TextBildBlock} ordinal={textImageOrdinal} />
      );
    case "Page_Gqlblocks_Blocks_PostHighligths":
      return <BlogPosts data={block as PostHighlightsBlock} />;
    case "GqlService_Gqlblocks_Blocks_PostHighligths":
      return <BlogPosts data={block as ServicePostHighlightsBlock} />;
    case "GqlService_Gqlblocks_Blocks_Faq":
      return <FAQ data={block as ServiceFaqBlock} />;
    case "GqlService_Gqlblocks_Blocks_HowTo":
      return <HowTo data={block as ServiceHowToBlock} />;
    case "GqlService_Gqlblocks_Blocks_ProsAndCons":
      return <ProsAndCons data={block as ServiceProsAndConsBlock} />;
    case "Page_Gqlblocks_Blocks_TjansterHighlights":
      return <ServiceHighlights data={block as TjansterHighlightsBlock} />;
    case "Page_Gqlblocks_Blocks_Faq":
      return <FAQ data={block as FaqBlock} />;
    case "Page_Gqlblocks_Blocks_HowTo":
      return <HowTo data={block as HowToBlock} />;
    case "Page_Gqlblocks_Blocks_ProsAndCons":
      return <ProsAndCons data={block as ProsAndConsBlock} />;

    case "GqlService_Gqlblocks_Blocks_Video":
      return <Video data={block} />;
    case "GqlService_Gqlblocks_Blocks_TextBild":
      return (
        <TextImage data={block as TextBildBlock} ordinal={textImageOrdinal} />
      );
    case "Page_Gqlblocks_Blocks_Tjanster":
      return <Services data={block as TjansterBlock} />;
    case "Page_Gqlblocks_Blocks_Text":
      return <Text data={block} />;
    case "Page_Gqlblocks_Blocks_LedigaTjanster":
      return <AvailablePositions data={block} />;
    case "Post_Gqlblocks_Blocks_TextBild":
      return <TextImage data={block} ordinal={textImageOrdinal} />;
    case "Post_Gqlblocks_Blocks_Tjanster":
      return <Services data={block} />;
    case "Post_Gqlblocks_Blocks_Text":
      return <Text data={block} />;
    case "Post_Gqlblocks_Blocks_LedigaTjanster":
      return <AvailablePositions data={block} />;
    case "GqlService_Gqlblocks_Blocks_Text":
      return <Text data={block} />;
    case "GqlService_Gqlblocks_Blocks_Blurbs":
      return <Blurbs data={block} />;
    case "Page_Gqlblocks_Blocks_Blurbs":
      return <Blurbs data={block} />;
    case "Page_Gqlblocks_Blocks_Lista":
      return <List data={block} />;
    case "Page_Gqlblocks_Blocks_Personal":
      return <Employee data={block} />;
    case "Post_Gqlblocks_Blocks_Blurbs":
      return <Blurbs data={block} />;
    case "Post_Gqlblocks_Blocks_Lista":
      return <List data={block} />;
    case "Post_Gqlblocks_Blocks_Personal":
      return <Employee data={block} />;
    case "GqlService_Gqlblocks_Blocks_Lista":
      return <List data={block} />;
    default:
      return <p>{block.fieldGroupName}</p>;
  }
};

const Blocks = ({
  blocks,
}: {
  blocks: BlockType[] | ServiceBlock[] | PostBlock[];
}) => {
  const isTextImage = (fg: string) =>
    fg === "Page_Gqlblocks_Blocks_TextBild" ||
    fg === "GqlService_Gqlblocks_Blocks_TextBild" ||
    fg === "Post_Gqlblocks_Blocks_TextBild";

  let textImageCounter = 0;

  return (
    <>
      {blocks?.map((block, i) => {
        const ordinal = isTextImage(block.fieldGroupName)
          ? ++textImageCounter
          : undefined;
        return (
          <Block
            key={block.fieldGroupName + i}
            block={block}
            textImageOrdinal={ordinal}
          />
        );
      })}
    </>
  );
};

export default Blocks;
