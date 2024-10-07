import dynamic from "next/dynamic";

export const componentsMap: any = {
  Tjanster: dynamic(() => import("./sections/services"), {
    ssr: false,
  }),
  TextBild: dynamic(() => import("./sections/text-image"), {
    ssr: true,
  }),
  Text: dynamic(() => import("./sections/text"), {
    ssr: true,
  }),
};

// export const extractComponentKey = (fieldGroupName: string): string => {
//   return fieldGroupName?.split("Page_Gqlblocks_Blocks_").pop() || "";
// };

export const extractComponentKey = (fieldGroupName: string): string => {
  const prefixes = ["Page_Gqlblocks_Blocks_", "Post_Gqlblocks_Blocks_"];

  for (const prefix of prefixes) {
    if (fieldGroupName.startsWith(prefix)) {
      return fieldGroupName.substring(prefix.length);
    }
  }

  return "";
};
