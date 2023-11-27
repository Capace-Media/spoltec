import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import getPage from "@modules/pages/lib/getPage";
import PostsPagination from "components/PostsPagination";

interface BlogProps {
  page: any;
}

const Blog = ({ page }: BlogProps) => {
  return (
    <div>
      <Hero
        title={page?.title}
        subtitle={page?.gqlHeroFields?.underrubrik}
        text={page?.gqlHeroFields?.introduktionstext}
        image={page?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      {/* <div>
        <Blocks blocks={page?.gqlBlocks?.blocks} />
      </div> */}
      <PostsPagination />
    </div>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const data = await getPage("kunskapsbank");

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page: data,
    },
  };
};
