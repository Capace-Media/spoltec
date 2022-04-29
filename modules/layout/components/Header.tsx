import Image from 'next/image';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import links from '@data/navlinks.json';
import { useState } from 'react';
interface HeaderProps {}

const buttons = [
  { label: 'Kontakta oss', href: '/kontakta-oss', pop: false },
  { label: 'Akut hjälp', href: '/akut-hjalp', pop: true },
];

const Header = ({}: HeaderProps) => {
  const buttonStyles = `px-4 py-2 rounded-sm opacity-90 hover:opacity-100 font-bold`;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <header className='absolute top-0 left-0 z-40 w-full px-5 md:px-0'>
        <nav className='relative flex items-center justify-between pt-1 pb-5 md:py-10 contain'>
          <Link href={'/'}>
            <a className='relative h-[80px] w-[150px] md:h-[100px] md:w-[200px]'>
              <Image
                src={`/images/spoltec-logo.png`}
                layout='fill'
                objectFit='contain'
                alt='Spoltec Logotyp'
                priority
              />
            </a>
          </Link>
          <ul className='items-center hidden space-x-5 font-semibold md:flex text-brand-blue'>
            {links.map((link) => {
              if (link.links) {
                return (
                  <Popover className='relative'>
                    <Popover.Button className='flex items-center font-bold outline-none'>
                      <>{link.label}</>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-4 h-4 ml-2 fill-current'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 24H0V0h24v24z' fill='none' opacity='.87' />
                        <path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z' />
                      </svg>
                    </Popover.Button>
                    <Popover.Panel
                      as='ul'
                      className='absolute w-64 p-5 space-y-3 bg-white rounded shadow-xl top-8'
                    >
                      {link.links.map((sublink) => (
                        <li key={sublink.href}>
                          <Link href={sublink.href}>
                            <a className=''>
                              <>{sublink.label}</>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </Popover.Panel>
                  </Popover>
                );
              } else {
                return (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className={``}>{link.label}</a>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
          <Popover className='flex justify-end w-full md:hidden'>
            <Popover.Button className='outline-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-8 h-8 fill-current text-brand-blue'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            </Popover.Button>
            <Popover.Panel className='absolute right-0 z-10 w-[151%] h-auto p-5 bg-white rounded-lg shadow-lg top-14'>
              <ul className='block space-y-2'>
                {links.map((link) => {
                  if (link.links) {
                    return (
                      <>
                        <Popover
                          as='li'
                          className='p-2 rounded-lg'
                          key={link.href}
                        >
                          <Popover.Button className='w-full outline-none'>
                            <figure></figure>
                            <div className='flex items-center justify-between'>
                              <>{link.label}</>
                            </div>
                          </Popover.Button>
                          <Popover.Panel
                            as='ul'
                            className='mt-5 space-y-2 rounded '
                          >
                            {link.links.map((sublink) => (
                              <li key={sublink.href}>
                                <Link href={sublink.href}>
                                  <a className='block px-3 py-2 rounded bg-black/5'>
                                    {sublink.label}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </Popover.Panel>
                        </Popover>
                      </>
                    );
                  } else {
                    return (
                      <li key={link.href} className='p-2 rounded-lg'>
                        <Link href={link.href}>
                          <a className=''>
                            <figure></figure>
                            <div>{link.label}</div>
                          </a>
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
              <ul className='mt-5 space-y-2'>
                {buttons.reverse().map((button) => (
                  <li key={button.label}>
                    <Link href={button.href}>
                      <a
                        className={`${buttonStyles} ${
                          button.pop
                            ? 'border-2 border-brand-orange bg-brand-orange text-white block text-center'
                            : 'border-2 text-white bg-brand-blue border-brand-blue block text-center'
                        }`}
                      >
                        {button.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Popover.Panel>
          </Popover>
          <ul className='hidden space-x-3 md:block'>
            {buttons.reverse().map((button) => (
              <Link key={button.label} href={button.href}>
                <a
                  className={`${buttonStyles} ${
                    button.pop
                      ? 'border-2 border-brand-orange bg-brand-orange text-white'
                      : 'border-2 border-brand-blue text-brand-blue'
                  }`}
                >
                  {button.label}
                </a>
              </Link>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
