import { FC, Suspense, memo } from "react";
import { componentsMap, extractComponentKey } from "./componentConfig";

interface Section {
  fieldGroupName: string;
}

interface BlocksProps {
  blocks: Section[];
}

const Blocks: FC<BlocksProps> = ({ blocks }) => (
  <>
    {blocks?.map((section, index) => (
      <Block section={section} key={section.fieldGroupName + index} />
    ))}
  </>
);

interface ComponentProps {
  content: Section;
}

interface BlockProps {
  section: Section;
}

const Block: FC<BlockProps> = memo(({ section }) => {
  const componentKey: any = extractComponentKey(section.fieldGroupName);
  const Component: any = componentsMap[componentKey] as
    | FC<ComponentProps>
    | undefined;

  return Component ? (
    <Suspense fallback={<p>Loading...</p>}>
      <Component content={section} />
    </Suspense>
  ) : (
    <p>{section.fieldGroupName}</p>
  );
});
Block.displayName = "Block"; // Add display name

export default Blocks;
