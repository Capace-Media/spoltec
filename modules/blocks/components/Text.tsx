import parse from "html-react-parser";
import Link from "next/link";
import handleParse from "../../../lib/utils/parse";
interface TextProps {
  data: {
    fieldGroupName: string;
    rubrik: string;
    text: string;
    installning: any;
    knapp: {
      text: string | null;
      url: any;
    };
  };
}

const Text = ({ data }: TextProps) => {
  return (
    <section className="contain section nth-child">
      <div className="max-w-2xl">
        <h2>{data.rubrik}</h2>
        <div className="parsed">{data?.text && handleParse(data.text)}</div>

        {data?.installning === true && data?.knapp?.url !== null ? (
          <Link
            href={
              data?.knapp?.url?.uri
                ? data?.knapp?.url?.uri
                : `/${data?.knapp?.url?.slug}`
            }
          >
            <a className="inline-block mt-10 btn bg-brand-orange">
              {data?.knapp?.text}
            </a>
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default Text;
