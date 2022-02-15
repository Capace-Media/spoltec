import CTABGIMAGE from '../../../public/images/spoltec-cta-bg.jpg';
import Image from 'next/image';
import Link from 'next/link';

interface CallToActionProps {}

const CallToAction = ({}: CallToActionProps) => {
  return (
    <div className='relative mt-10 rounded-xl contain-outer md:mt-20'>
      <div className='overflow-hidden bg-black bg-section'>
        <Image
          src={CTABGIMAGE}
          layout='fill'
          objectFit='cover'
          objectPosition='top'
          className='opacity-40'
        />
        <div className='contain'>
          <div className='text-center flex flex-col justify-center h-[500px] text-white h96 contain max-w-[700px]'>
            <div>
              <h2 className='text-white'>Undvik obehagliga överraskningar</h2>
              <h3 className='mb-4 text-white'>Tecka ett serviceavtal idag</h3>
              <p>
                At lab ipsae esed quibusa consenda dem de prestiore eatus eum
                quatio. Aquas aut quatur atist fugitam atio. At lab ipsae esed
                quibusa consenda dem e prestiore eatus eum quatio.
              </p>
              <Link href='/serviceavtal'>
                <a className='px-10 mt-10 bg-transparent border-2 border-white hover:text-brand-blue hover:bg-white btn'>
                  Läs mer
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
