import Image from 'next/image';
import Link from 'next/link';
interface MainHeroProps {}

const MainHero = ({}: MainHeroProps) => {
  return (
    <div className=' contain-outer'>
      <div className='overflow-hidden mt-5 rounded-xl pt-[150px] bg-section'>
        <div className='grid md:grid-cols-[1fr,2fr] gap-20 contain '>
          <div className='relative flex items-center'>
            <span className='w-[600px] h-[600px] rounded-full absolute -top-1/4 -left-1/2 bg-gradient-to-b from-brand-lightblue to-brand-blue opacity-10' />
            <div className='relative'>
              <h1 className='mb-5'>Vi funktionssäkrar ert avloppssystem</h1>
              <p>
              Spoltec har lång erfarenhet och stor kunskap om underhåll och renovering av alla förekommande avloppssystem. Vi arbetar dessutom med miljövänliga metoder - utan Bisfenol och Epoxi.{' '}
              </p>
              <Link href='/kontakta-oss'>
                <a className='mt-10 btn'>Kontakta oss</a>
              </Link>
            </div>
          </div>
          <figure className='md:-mb-20 aspect-w-16 aspect-h-12'>
            <Image
              src={`/images/spoltec-water-01.png`}
              layout='fill'
              objectFit='contain'
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
