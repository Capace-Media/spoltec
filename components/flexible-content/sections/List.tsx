import handleParse from "@lib/utils/parse";
import { Arrow } from "../../icons";

interface ListProps {
  data: {
    fieldGroupName: string;
    text: string;
    punkter: Array<{
      text: string;
    }>;
    avslut: string;
  };
}

const List = ({ data }: ListProps) => {
  return (
    <section className="contain-outer section">
      <div className="flex flex-col items-center justify-center px-3 md:px-20 bg-section">
        <div className="parsed pb-10">{handleParse(data?.text)}</div>

        <div className="w-full mb-10">
          <ul className="lg:columns-3 md:columns-2 columns-1 gap-7" role="list">
            {data?.punkter?.map((li: any, index: number) => {
              return (
                <li
                  key={li?.text || index}
                  className="flex mb-10 space-x-4 break-inside-avoid"
                >
                  <div className="mt-[5px]">
                    <Arrow />
                  </div>
                  <div className="parsed">{handleParse(li?.text)}</div>
                </li>
              );
            })}
          </ul>
        </div>
        {data?.avslut && (
          <div className="parsed">{handleParse(data.avslut)}</div>
        )}
      </div>
    </section>
  );
};

export default List;
