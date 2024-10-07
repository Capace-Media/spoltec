import dynamic from "next/dynamic";

export const componentsMap: any = {
  Tjanster: dynamic(() => import("./sections/services"), {
    ssr: false,
  }),
  TextBild: dynamic(() => import("./sections/text-image"), {
    ssr: true,
  }),
};

export const extractComponentKey = (fieldGroupName: string): string => {
  return fieldGroupName?.split("Page_Gqlblocks_Blocks_").pop() || "";
};
