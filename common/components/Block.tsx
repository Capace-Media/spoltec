const List = dynamic(() => import("@modules/blocks/components/List"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const Employee = dynamic(() => import("@modules/blocks/components/Employee"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const Blurbs = dynamic(() => import("@modules/blocks/components/Blurbs"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Text = dynamic(() => import("@modules/blocks/components/Text"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const Services = dynamic(() => import("@modules/blocks/components/Services"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const TextImage = dynamic(
  () => import("@modules/blocks/components/TextImage"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
const AvailablePositions = dynamic(
  () => import("@modules/blocks/components/AvailablePositions"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

import dynamic from "next/dynamic";

interface BlockProps {
  block: any;
}

const Block = ({ block }: BlockProps) => {
  switch (block.fieldGroupName) {
    case "Page_Gqlblocks_Blocks_TextBild":
      return <TextImage data={block} />;
    case "Page_Gqlblocks_Blocks_Tjanster":
      return <Services data={block} />;
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
