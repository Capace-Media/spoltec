import Blocks from "@common/components/Blocks";
import Hero from "@common/sections/Hero";
import WP from "@lib/wp/wp";
import getPost from "@modules/pages/lib/getPost";

interface ArticlePostProps {
  post: any;
}

const ArticlePost = ({ post }: ArticlePostProps) => {
  return (
    <div key={post.title}>
      <Hero
        title={post?.title}
        subtitle={post?.gqlHeroFields?.underrubrik}
        text={post?.gqlHeroFields?.introduktionstext}
        image={post?.gqlHeroFields?.bild?.mediaItemUrl}
      />
      <div id="content" className="w-full h-10 md:h-0"></div>
      <div>
        <Blocks blocks={post?.gqlBlocks?.blocks} />
      </div>
    </div>
  );
};

export default ArticlePost;

export const GET_POSTS = `
query GET_POSTS {
  posts(first: 10) {
    nodes {
      slug
    }
  }
}
`;

export const getStaticPaths = async () => {
  const { data } = await WP(GET_POSTS);

  const postPaths: { params: { article: string } }[] = [];

  // Populate postPaths
  data.posts.nodes.forEach((post) => {
    if (typeof post.slug === "string") {
      // Ensure slug is a string
      postPaths.push({ params: { article: post.slug } });
    }
  });

  return { paths: postPaths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const data = await getPost(context?.params?.article);

  return {
    props: {
      post: data,
    },
  };
};
