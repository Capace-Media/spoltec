import handleParse from '@lib/utils/parse';
import { Arrow } from "../../../components/icons";
import parse, { domToReact, Element, HTMLReactParserOptions, DOMNode } from 'html-react-parser';

interface ListProps {
  data: any
}

const customParse = (htmlString: string) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (
        domNode.type === 'tag' &&
        domNode.name === 'a' &&
        (domNode as Element).attribs?.href
      ) {
        const el = domNode as Element;
        let href = el.attribs.href;

        if (href.includes('relining-halmstad')) {
          href = '/';
        }

        return (
          <a href={href} className={el.attribs.class}>
            {domToReact(el.children as DOMNode[])}
          </a>
        );
      }

      return undefined;
    }
  };

  return parse(htmlString, options);
};

const List = ({ data }: ListProps) => {
  return (
    <section className='contain-outer'>
      <div className='flex flex-col items-center justify-center px-3 md:px-20 bg-section'>
        <div className='mb-10'>
          {handleParse(data?.text)}
        </div>
        <div className='w-full mb-10'>
          <ul className='lg:columns-3 md:columns-2 columns-1 gap-7'>
            {data?.punkter?.map((li: any) => (
              <li key={li?.text} className='flex mb-10 space-x-4 break-inside-avoid'>
                <div className='mt-[5px]'>
                  <Arrow />
                </div>
                {customParse(li?.text)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {handleParse(data?.avslut)}
        </div>
      </div>
    </section>
  );
};

export default List;
