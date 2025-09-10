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
    <section
      className="contain-outer section"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="flex flex-col items-center justify-center px-3 md:px-20 bg-section">
        <header className="mb-10">
          <div itemProp="name">{handleParse(data?.text)}</div>
        </header>

        <div className="w-full mb-10">
          <ul className="lg:columns-3 md:columns-2 columns-1 gap-7" role="list">
            {data?.punkter?.map((li: any, index: number) => {
              return (
                <li
                  key={li?.text || index}
                  className="flex mb-10 space-x-4 break-inside-avoid"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <div className="mt-[5px]" aria-hidden="true">
                    <Arrow />
                  </div>
                  <div itemProp="name" className="parsed">
                    {handleParse(li?.text)}
                  </div>
                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              );
            })}
          </ul>
        </div>
        {data?.avslut && (
          <footer className="parsed">{handleParse(data.avslut)}</footer>
        )}
      </div>
    </section>
  );
};

export default List;
