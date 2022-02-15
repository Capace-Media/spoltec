interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <>
      <div className='contain-outer'>
        <div className='bg-section'>
          <div className='mt-24 text-center contain'>
            <h1>Akut hjälp</h1>
            <p className='mt-3'>
              Hjälplinje för dig som är i behov av akut hjälp.
            </p>
            <a
              href='tel:000000000'
              className='inline-block px-10 py-4 mt-10 text-3xl font-bold text-white rounded bg-brand-orange'
            >
              040-47 40 12
            </a>
            <p className='mt-3'>Klicka på knappen för att ringa.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
