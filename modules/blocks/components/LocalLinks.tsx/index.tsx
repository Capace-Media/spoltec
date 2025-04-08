/* import Link from "next/link";
import pages from "../../../../data/local-links.json";

const LocalLinks = () => {
  return (
    <section className="contain-outer">
      <menu className="flex gap-8 justify-center items-center flex-wrap border-b-[1px] py-10">
        {pages?.nodes &&
          pages.nodes.map((page) => {
            return (
              <li key={page?.id}>
                <Link className=" py-2 md:hover:underline" href={page?.uri}>
                  {page?.title}
                </Link>
              </li>
            );
          })}
      </menu>
    </section>
  );
};

export default LocalLinks;*/