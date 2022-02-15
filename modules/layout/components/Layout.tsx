import Footer from './Footer';
import Header from './Header';
import { ReactChild } from 'react';

interface LayoutProps {
  children: ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className='relative'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
