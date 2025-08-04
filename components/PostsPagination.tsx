// components/PostsPagination.js

import Image from "next/image";
import { useEffect, useState } from "react";

import Link from "next/link";

const PostsPagination = () => {
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);

  const fetchData = async (
    after = null,
    before = null,
    first = 20,
    last = null
  ) => {
    try {
      const response = await fetch(
        `/api/posts?after=${after}&before=${before}&first=${first}&last=${last}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setPosts(data.edges);
      setPageInfo(data.pageInfo);
    } catch (error) {
      console.error("Fetching error: ", error);
      // Handle the error appropriately
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const limit = (string = "", limit = 0) => {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    } else {
      return string;
    }
  };

  return (
    <div className="text-center section contain">
      <div className="max-w-[700px] mx-auto">
        <h2>Artiklar</h2>
      </div>
      <ul className="grid justify-center grid-cols-1 gap-5 mt-10 lg:grid-cols-3 md:grid-cols-2">
        {posts?.length < 1 &&
          posts.map((post: any) => (
            <Link
              className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-full text-white p-7 bg-brand-blue text-left rounded-xl"
              key={post.node.id}
              href={`/kunskapsbank/${post?.node.slug}`}
            >
              <Image
                src={
                  post?.node?.gqlHeroFields?.bild?.mediaItemUrl
                    ? post?.node?.gqlHeroFields?.bild?.mediaItemUrl
                    : post?.node?.bild?.mediaItemUrl
                    ? post?.node?.bild?.mediaItemUrl
                    : "https://via.placeholder.com/2560x1707/2C4696/2C4696"
                }
                fill
                style={{
                  objectFit: "cover",
                }}
                className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
                alt={post.title}
              />
              <div>
                <h3 className="text-xl text-white md:text-2xl">
                  {post.node.title}
                </h3>
                <p className="mt-3 text-sm">
                  {limit(
                    post?.node?.introduktionstext ||
                      post?.node?.gqlHeroFields?.introduktionstext ||
                      post?.node?.underrubrik ||
                      post?.node?.gqlHeroFields?.underrubrik ||
                      "",
                    140
                  )}
                </p>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <p>Läs mer</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                </svg>
              </div>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default PostsPagination;
