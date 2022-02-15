import CallToAction from '@modules/blocks/components/Cta';
import Image from 'next/image';
import Link from 'next/link';
import services from '@data/static-services.json';
interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <>
      <CallToAction />
      <div className='grid gap-10 md:grid-cols-2 contain section'>
        <div className='text-center md:text-left'>
          <h2>
            Har ni avloppsproblem eller vill ni motverka eventuella problem?
          </h2>
          <p>Kontakta spoltec idag</p>
        </div>
        <div className='text-center md:text-right'>
          <h3 className='text-4xl'>040-47 40 12</h3>
          <p>info@spoltec.se</p>
        </div>
      </div>
      <footer className='mb-5 overflow-hidden contain-outer rounded-xl'>
        <div className='pb-10 bg-section'>
          <div className='contain'>
            <div className='grid md:grid-cols-[2fr,1fr,1fr,1fr] gap-10'>
              <div>
                <strong className='block mb-3'>Spoltec Södra AB</strong>
                <p>
                  At lab ipsae esed quibusa consenda dem de prestiore eatus eum
                  quatio. Aquas aut quatur atist fugitam atio. At lab ipsae esed
                  quibusa consenda dem e prestiore eatus eum quatio. Aquas aut
                  quatur atist
                </p>
              </div>
              <div>
                <strong className='block mb-3'>Privat</strong>
                <ul>
                  <li>Rörinspektion</li>
                  <li>Relining</li>
                  <li>Villaspolning</li>
                  <li>Villastopp</li>
                  <li>Tätning av betong</li>
                </ul>
              </div>
              <div>
                <strong className='block mb-3'>Företag</strong>
                <ul>
                  <li>Rörinspektion</li>
                  <li>Relining</li>
                  <li>Villaspolning</li>
                  <li>Villastopp</li>
                  <li>Tätning av betong</li>
                </ul>
              </div>
              <div>
                <strong className='block mb-3'>Information</strong>
                <ul>
                  <li>Serviceavtal</li>
                  <li>Garanti</li>
                  <li>RDT-avdrag</li>
                  <li>Varför blir det stopp?</li>
                  <li>Om Spoltec</li>
                  <li>Vår historia</li>
                </ul>
              </div>
            </div>
            <div className='flex flex-col items-center justify-between space-y-3 text-sm md:flex-row mt-14'>
              <div>Copyright © Spoltec Södra AB {new Date().getFullYear()}</div>
              <a
                href='/'
                target='_blank'
                rel='noreferrer'
                className='relative block w-8 h-8'
              >
                <Image
                  src={`/images/facebook-spoltec.png`}
                  layout='fill'
                  objectFit='contain'
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
