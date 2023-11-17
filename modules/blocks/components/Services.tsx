import services from "@data/static-services.json";
import articles from "data/static-articles.json";
import categories from "data/static-categories.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
interface ServicesProps {
  data: any;
}

const Services = ({ data }: ServicesProps) => {
  const router = useRouter();

  const filterArticles = articles.filter(
    (article) => article.slug === router.query.slug
  );
  const relevantArticles = filterArticles[0]?.gqlArtikel?.artiklar;

  const limit = (string = "", limit = 0) => {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    } else {
      return string;
    }
  };

  const cityArray = [
    "Borås",
    "Göteborg",
    "Halmstad",
    "Helsingborg",
    "Jönköping",
    "Kalmar",
    "Karlskrona",
    "Kristianstad",
    "Malmö",
    "Varberg",
    "Växjö",
  ];

  const matchArray = [];

  services.forEach((service) => {
    cityArray.filter((el) => {
      if (service.title.includes(el)) {
        matchArray.push(service);
      }
    });
  });

  let res = [];

  if (router.query.slug === undefined) {
    res = services.filter((service) => !matchArray.includes(service));
  } else if (router.query.slug.includes("tjanster")) {
    res = matchArray.filter((match) => {
      if (router.query.slug.includes(match.slug)) return true;
    });
  } else if (router.query.slug === "kunskapsbank") {
    res = categories;
  } else if (filterArticles[0].slug === router.query.slug) {
    res = relevantArticles;
  }

  return (
    <div className="text-center section contain">
      <div className="max-w-[700px] mx-auto">
        <h2>{data.rubrik}</h2>
        <p>{data.servicesText}</p>
      </div>
      <div className="grid justify-center grid-cols-1 gap-5 mt-10 lg:grid-cols-3 md:grid-cols-2">
        {res.map((service) => {
          const serviceUri = service?.uri?.replace("/services/", "");
          return (
            <Link
              className="mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-[100%] text-white p-7 bg-brand-blue text-left rounded-xl"
              key={service.slug}
              href={`/${serviceUri}`}
            >
              <Image
                src={
                  service?.gqlHeroFields?.bild?.mediaItemUrl
                    ? service?.gqlHeroFields?.bild?.mediaItemUrl
                    : service?.bild?.mediaItemUrl
                    ? service?.bild?.mediaItemUrl
                    : "https://via.placeholder.com/2560x1707/2C4696/2C4696"
                }
                fill
                style={{
                  objectFit: "cover",
                }}
                className="transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20"
                alt={service.title}
              />
              <div>
                <h3 className="text-xl text-white md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm">
                  {limit(
                    service?.introduktionstext ||
                      service?.gqlHeroFields?.introduktionstext ||
                      service?.underrubrik ||
                      service?.gqlHeroFields?.underrubrik ||
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
          );
        })}
      </div>
    </div>
  );
};

export default Services;
