import handleParse from '@lib/utils/parse';
import Image from 'next/image';

interface BlurbsProps {
  data: any;
}

const Blurbs = ({ data }: BlurbsProps) => {
  return (
    <section className='contain-outer'>
      <div
        className={`${data.installningar.bakgrund ? 'bg-section' : 'section'}`}
      >
        <div className='contain'>
          <div>
            <div className='max-w-[85%] mx-auto text-center'>
              {/* <h2>{data.blurbText.rubrik}</h2>
              <p>{data.blurbText.body}</p> */}
              {handleParse(data.blurbText)}
            </div>
            <div
              className={`grid  gap-5 mt-20 md:gap-10 ${
                data.blurbs.length <= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
              }`}
            >
              {data.blurbs.map((blurb: any) => (
                <div key={data.rubrik || data.underrubrik || data.text}>
                  {blurb.bild && (
                    <figure className='block w-10 h-10 mb-5 md:w-14 md:h-14'>
                      <Image
                        src={blurb.bild.mediaItemUrl}
                        layout='fill'
                        objectFit='contain'
                      />
                    </figure>
                  )}
                  {blurb.rubrik && (
                    <h3
                      className={`text-lg ${
                        blurb.bild ? 'text-brand-blue' : 'text-brand-orange'
                      }`}
                    >
                      {blurb.rubrik}
                    </h3>
                  )}
                  {blurb.underrubrik && (
                    <h4 className='mb-3'>{blurb.underrubrik}</h4>
                  )}
                  {/* <p className='text-sm'>{blurb.text}</p> */}
                  {handleParse(blurb.text)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blurbs;
