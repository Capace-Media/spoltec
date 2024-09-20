import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";

import WP from "@lib/wp/wp";
import getService from "@modules/services/lib/getService";

export const isCustomPageSlug = (slug: string) => {
  const pagesToExclude: string[] = [];
  return pagesToExclude?.includes(slug);
};

export const GET_PAGES = `
query GET_PAGES {
    gqlAllService(first: 100, where: {parent: "0"}) {
    nodes {
      slug
      children {
        nodes {
          slug
        }
      }
    }
  }
}
`;

export const getStaticPaths = async () => {
  const { data } = await WP(GET_PAGES);

  const pagePaths: any[] = [];

  data?.gqlAllService?.nodes &&
    data?.gqlAllService?.nodes?.map((page: any) => {
      page?.children?.nodes &&
        page?.children?.nodes.map((child: any) => {
          pagePaths.push({ params: { slug: page.slug, id: child.slug } });
        });
    });

  const paths = [...pagePaths];

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const uri = `/services/${context.params.slug}/${context.params.id}`;
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
    <div>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div>
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </div>
    </div>
  );
};

export default Page;
