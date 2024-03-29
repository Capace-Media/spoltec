import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import servicesIndex from "@data/static-services.json";
import WP from "@lib/wp/wp";
import getPage from "@modules/pages/lib/getPage";
import getService from "@modules/services/lib/getService";

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

  const pagePaths = [];

  data?.pages?.nodes &&
    data?.pages?.nodes?.map((page: any) => {
      if (!isCustomPageSlug(page?.slug)) {
        pagePaths.push({ params: { slug: page?.slug } });
      }
    });

  const paths = [...pagePaths];

  return { paths, fallback: "blocking" };
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
