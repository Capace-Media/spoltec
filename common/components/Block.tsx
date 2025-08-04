import List from "@modules/blocks/components/List";
import Employee from "@modules/blocks/components/Employee";
import Blurbs from "@modules/blocks/components/Blurbs";
import Text from "@modules/blocks/components/Text";
import Services from "@modules/blocks/components/Services";
import TextImage from "@modules/blocks/components/TextImage";
import AvailablePositions from "@modules/blocks/components/AvailablePositions";
import Video from "@modules/blocks/components/Video";
import { TextBildBlock, TjansterBlock } from "@lib/types/page";

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

export default Block;
