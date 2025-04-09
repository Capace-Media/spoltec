import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/images/Spoltec-water01.png";
import GoogleReviewsWidget from "components/GoogleReviews";
interface MainHeroProps {}

const MainHero = ({}: MainHeroProps) => {
  return (
    <div className=" contain-outer">
      <div className="overflow-hidden mt-5 rounded-xl pt-[150px] bg-section">
        <div className="grid md:grid-cols-[1fr,2fr] gap-20 contain ">
          <div className="relative flex items-center">
            <span className="w-[600px] h-[600px] rounded-full absolute -top-1/4 -left-1/2 bg-gradient-to-b from-brand-lightblue to-brand-blue opacity-10" />
            <div className="relative">
              <h1 className="mb-5">Vi funktionssäkrar ert avloppssystem</h1>
              <p>
                Spoltec har lång erfarenhet och stor kunskap om underhåll och
                renovering av alla förekommande avloppssystem. Vi arbetar
                dessutom med miljövänliga metoder - utan bisfenol och epoxi.
              </p>
              <Link className="mt-10 btn" href="/kontakta-oss">
                Kontakta oss
              </Link>
            </div>
          </div>
          <figure className="md:-mb-20 aspect-w-16 aspect-h-12">
            <Image
              src={heroImage}
              fill
              style={{
                objectFit: "contain",
              }}
              priority
              alt={`image of splashing water`}
              sizes="(min-width: 1460px) 747px, (min-width: 1220px) calc(42.73vw + 132px), (min-width: 780px) calc(90.71vw - 449px), (min-width: 440px) calc(100vw - 80px), calc(88.33vw - 31px)"
            />
          </figure>
        </div>
        <div className="md:flex md:justify-end md:pr-5 lg:pr-14">
            <GoogleReviewsWidget />
          </div>
      </div>
    </div>
  );
};

export default MainHero;
