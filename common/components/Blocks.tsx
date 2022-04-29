import Block from './Block';

interface BlocksProps {
  blocks: any[];
}

const Blocks = ({ blocks }: BlocksProps) => {

  return (
    <>
      {blocks?.map((block, i) => (
        <Block key={block.fieldGroupName + i} block={block} />
      ))}
    </>
  );
};

export default Blocks;
