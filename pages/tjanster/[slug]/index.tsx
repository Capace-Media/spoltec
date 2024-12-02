import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import ServiceHero from "@common/sections/service-hero";

import WP from "@lib/wp/wp";
import getService from "@modules/services/lib/getService";

export const isCustomPageSlug = (slug: string) => {
  const pagesToExclude: string[] = [];
  return pagesToExclude.includes(slug);
};

export const GET_PAGES = `
query GET_PAGES {
    gqlAllService(first: 100, where: {parent: "0"}) {
    nodes {
      slug
    }
  }
}
`;

export const getStaticPaths = async () => {
  const { data } = await WP(GET_PAGES);

  const pagePaths: any[] = [];

  data?.gqlAllService?.nodes &&
    data?.gqlAllService?.nodes?.map((page: any) => {
      if (!isCustomPageSlug(page?.slug)) {
        pagePaths.push({ params: { slug: page?.slug } });
      }
    });

  const paths = [...pagePaths];

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const uri = `/services/${context.params.slug}`;

  const page = await getService(uri);

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
    <div key={page?.title}>
      <ServiceHero
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
