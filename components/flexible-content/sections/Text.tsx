import Link from "next/link";
import handleParse from "../../../lib/utils/parse";
import { cn } from "@lib/utils";
import { buttonVariants } from "components/ui/button";
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
    <section className="contain-outer section">
      <div className="max-w-2xl">
        <h2>{data.rubrik}</h2>
        <div className="parsed">{data?.text && handleParse(data.text)}</div>
        {data?.installning === true && data?.knapp?.url !== null ? (
          <Link
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            href={
              data?.knapp?.url?.uri
                ? data?.knapp?.url?.uri
                : `/${data?.knapp?.url?.slug}`
            }
            aria-label={`Läs mer om ${data.rubrik}`}
          >
            {data?.knapp?.text}
            <span className="sr-only">Läs mer om {data.rubrik}</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default Text;
