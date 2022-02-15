import Image from 'next/image';
import Link from 'next/link';
import services from '@data/static-services.json';
interface ServicesProps {
  data: any;
}

const Services = ({ data }: ServicesProps) => {
  console.log('Services =>', data);
  return (
    <div className='text-center section contain'>
      <div className='max-w-[700px] mx-auto'>
        <h2>{data.rubrik}</h2>
        <p>{data.servicesText}</p>
      </div>
      <div className='flex flex-wrap justify-center mt-10'>
        {services.map((service) => {
          console.log(service);
          return (
            <Link href={`/${service.slug}`}>
              <a
                key={service.title}
                className='mb-3 group relative h-56 md:h-96 flex overflow-hidden flex-col justify-between mr-3 w-[100%] md:w-[48%]  lg:w-[32%] xl:w-[24%] text-white p-7 bg-brand-blue text-left rounded-xl'
              >
                <Image
                  src={service.gqlHeroFields.bild.mediaItemUrl}
                  layout='fill'
                  objectFit='cover'
                  className='transition-all opacity-0 group-hover:opacity-20'
                />
                <div>
                  <h3 className='text-xl text-white'>{service.title}</h3>
                  <p className='mt-3 text-sm'>
                    {service?.gqlHeroFields?.underrubrik || ''}
                  </p>
                </div>
                <div className='flex items-center justify-end space-x-3'>
                  <p>Läs mer</p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='w-5 h-5 fill-current'
                  >
                    <rect fill='none' height='24' width='24' />
                    <path d='M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z' />
                  </svg>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
