import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
interface TextImageProps {
  data: any;
}

const TextImage = ({ data }: TextImageProps) => {
  return (
    <div className='contain-outer'>
      <div className={`text-image ${data?.installningar?.bakgrund ? 'bg-section' : 'section'}`}>
        <div className='section-sm contain'>
          <div className='grid gap-20 md:grid-cols-2'>
            <div className='flex items-center'>
              <div>
                <h2>{data.textBody.rubrik}</h2>
                <div className='parsed'>
                  {data.textBody.text && parse(data.textBody.text)}
                </div>
                {data.textBody.knapp.url && (

                  <Link href={data.textBody.knapp.url}>
                    <a className='mt-10 btn'>{data.textBody.knapp.text}</a>
                  </Link>
                )}
              </div>
            </div>
            <div className='grid grid-cols-2 grid-rows-3 gap-3 h-[500px]'>
              {data.bilder.map((image, index) => (
                <div
                  data-image={index}
                  className='relative overflow-hidden rounded-xl'
                >
                  <Image
                    src={image.mediaItemUrl}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImage;
