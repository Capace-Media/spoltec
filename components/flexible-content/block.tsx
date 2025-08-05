import { TextBildBlock, TjansterBlock } from "@lib/types/page";
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
} from "./sections";

import { Block as BlockType } from "@lib/types/page";
import { ServiceBlock } from "@lib/types/service";
import { PostBlock } from "@lib/types/post";

interface BlockProps {
  block: any;
}

const Block = ({ block }: BlockProps) => {
  switch (block.fieldGroupName) {
    case "Page_Gqlblocks_Blocks_TextBild":
      return <TextImage data={block as TextBildBlock} />;
    case "GqlService_Gqlblocks_Blocks_Video":
      return <Video data={block} />;
    case "GqlService_Gqlblocks_Blocks_TextBild":
      return <TextImage data={block as TextBildBlock} />;
    case "Page_Gqlblocks_Blocks_Tjanster":
      return <Services data={block as TjansterBlock} />;
    case "Page_Gqlblocks_Blocks_Text":
      return <Text data={block} />;
    case "Page_Gqlblocks_Blocks_LedigaTjanster":
      return <AvailablePositions data={block} />;
    case "Post_Gqlblocks_Blocks_TextBild":
      return <TextImage data={block} />;
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
  return (
    <>
      {blocks?.map((block, i) => {
        console.log(block);
        return <Block key={block.fieldGroupName + i} block={block} />;
      })}
    </>
  );
};

export default Blocks;
