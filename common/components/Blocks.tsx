import { Block as BlockType } from "@lib/types/page";
import Block from "./Block";

const Blocks = ({ blocks }: { blocks: BlockType[] }) => {
  return (
    <>
      {blocks?.map((block, i) => (
        <Block key={block.fieldGroupName + i} block={block} />
      ))}
    </>
  );
};

export default Blocks;
