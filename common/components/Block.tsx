import AvailablePositions from '@modules/blocks/components/AvailablePositions';
import Blurbs from '@modules/blocks/components/Blurbs';
import Services from '@modules/blocks/components/Services';
import Text from '@modules/blocks/components/Text';
import TextImage from '@modules/blocks/components/TextImage';

interface BlockProps {
  block: any;
}

const Block = ({ block }: BlockProps) => {
  switch (block.fieldGroupName) {
    case 'Page_Gqlblocks_Blocks_TextBild':
      return <TextImage data={block} />;
    case 'Page_Gqlblocks_Blocks_Tjanster':
      return <Services data={block} />;
    case 'Page_Gqlblocks_Blocks_Text':
      return <Text data={block} />;
    case 'Page_Gqlblocks_Blocks_LedigaTjanster':
      return <AvailablePositions data={block} />;
    case 'GqlService_Gqlblocks_Blocks_Text':
      return <Text data={block} />;
    case 'GqlService_Gqlblocks_Blocks_Blurbs':
      return <Blurbs data={block} />;
    case 'Page_Gqlblocks_Blocks_Blurbs':
      return <Blurbs data={block} />;
    default:
      return <p>{block.fieldGroupName}</p>;
      break;
  }
};

export default Block;
