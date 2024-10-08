import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";

import WP from "@lib/wp/wp";
import getPage from "@modules/pages/lib/getPage";

export const isCustomPageSlug = (slug: string) => {
  const pagesToExclude = [
    "hem",
    "akut-hjalp",
    "kontakta-oss",
    "avloppsspolning",
    "kvicksilversanering",
    "oljeavskiljare",
    "provtagning-av-vatten",
    "relining",
    "rorinspektion",
    "boras",
    "goteborg",
    "halmstad",
    "helsingborg",
    "jonkoping",
    "kalmar",
    "karlskrona",
    "kristianstad",
    "malmo",
    "undefined",
    "varberg",
    "vaxjo",
    "kunskapsbank",
    "tjanster",
  ];
  return pagesToExclude.includes(slug);
};

export const GET_PAGES = `
query GET_PAGES {
  pages(first: 100) {
    nodes {
      slug
    }
  }
}
`;

export const getStaticPaths = async () => {
  const { data } = await WP(GET_PAGES);

  const pagePaths: { params: { slug: string } }[] = data.pages.nodes
    .filter(
      (page: any) =>
        !isCustomPageSlug(page.slug) && typeof page.slug === "string"
    )
    .map((page: any) => ({ params: { slug: page.slug } }));

  return { paths: pagePaths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const page = await getPage(context.params.slug);

  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page,
    },
  };
};

interface PageProps {
  page: any;
}

const Page = ({ page }: PageProps) => {
  return (
    <div key={page.title}>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div id="content" className="w-full h-10 md:h-0"></div>
      <div>
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </div>
    </div>
  );
};

export default Page;
