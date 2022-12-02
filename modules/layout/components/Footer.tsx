import CallToAction from '@modules/blocks/components/Cta';
import Image from 'next/image';
import Link from 'next/link';
import services from '@data/static-services.json';
import footerLinks from '@data/footerlinks.json'
import { useRouter } from 'next/router';
interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const router = useRouter()

  // console.log("footerLinks ==>", footerLinks)

  // console.log("footer router ==>", router)
  
  return (
    <>
      {router.asPath === "/serviceavtal" || router.asPath === "/karriar" || router.asPath === "/kontakta-oss" ? null : (
        <CallToAction />

      )}
      <div className='grid gap-10 md:grid-cols-2 contain section'>
        <div className='text-center md:text-left'>
          <h2>
          Har ni ett pågående avloppsproblem eller vill ni börja arbeta förebyggande?
          </h2>
          <p>Vi hjälper er! Kontakta Spoltec idag.</p>
        </div>
        <div className='text-center md:text-right'>
          <a href="tel:040474012">
            <h3 className='text-4xl'>040-47 40 12</h3>
          </a>
          <a href="mailto:info@spoltec.se">
            <p>info@spoltec.se</p>
          </a>
        </div>
      </div>
      <footer className='mb-5 overflow-hidden contain-outer rounded-xl'>
        <div className='pb-10 bg-section'>
          <div className='contain'>
            <div className='grid md:grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-10'>
              <div>
                <strong className='block mb-3'>Spoltec Södra AB</strong>
                <p className='mb-6'>
                Vårt företag startades 1991 och verksamheten drivs idag vidare av en ägargrupp som har fokus på utveckling och nytänkande. Styrkan ligger i vår kompetenta personal, miljötänkande, garantier och säkerhet för våra kunder. Vi erbjuder ett brett utbud av tjänster.
                </p>
                <a href="https://www.uc.se/risksigill2/?showorg=556712-5363&language=swe&special=" title="Sigillet är utfärdat av UC AB. Klicka på bilden för information om UC:s Riskklasser." target="_blank">
                  <Image src="https://www.uc.se/ucsigill2/sigill?org=556712-5363&language=swe&product=lsa&special=&fontcolor=b&type=svg" alt="" height="70" width="310" />
                </a>
              </div>
              <div>
                <strong className='block mb-3'>Privat</strong>
                <ul className='space-y-[6px]'>
                  {footerLinks?.privat?.map((link: any, index) => {
                    return (
                      <li className='hover:text-brand-blue' key={index + link?.href + link?.label}>
                        <Link href={link?.href}><a>{link?.label}</a></Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <strong className='block mb-3'>Städer</strong>
                <ul className='space-y-[6px]'>
                  {footerLinks?.stader?.map((link: any, index) => {
                    return (
                      <li className='hover:text-brand-blue' key={index + link?.href + link?.label}>
                        <Link href={link?.href}><a>{link?.label}</a></Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <strong className='block mb-3'>Företag</strong>
                <ul className='space-y-[6px]'>
                {footerLinks?.foretag?.map((link: any, index) => {
                    return (
                      <li className='hover:text-brand-blue' key={link?.href + index + link?.label}>
                        <Link href={link?.href}><a>{link?.label}</a></Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <strong className='block mb-3'>Information</strong>
                <ul className='space-y-[6px]'>
                {footerLinks?.information?.map((link: any, index) => {
                    return (
                      <li className='hover:text-brand-blue' key={link?.href + link?.label + index}>
                        <Link href={link?.href}><a>{link?.label}</a></Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className='flex flex-col items-center justify-between space-y-3 text-sm md:flex-row mt-14'>
              <div>Copyright © Spoltec Södra AB {new Date().getFullYear()}</div>
              <a
                href='https://www.facebook.com/spoltec'
                target='_blank'
                rel='noreferrer'
                className='relative block w-8 h-8 transition duration-300 ease-in-out hover:scale-105'
              >
                <Image
                  src={`/images/facebook-spoltec.png`}
                  layout='fill'
                  objectFit='contain'
                  alt={`facebook logo`}
                />
              </a>
              <div>
                Byggd med <span className='text-brand-orange'>♥</span> av Capace
                Media
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
