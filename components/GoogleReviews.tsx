import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GoogleReviewsWidget = () => {
  const router = useRouter();
  const currentPage = router.asPath;

  const widgetPage = [
    '/',
    '/tjanster',
    '/relining-malmo',
    '/relining-helsingborg',
    '/relining-vaxjo',
    '/relining-boras',
    '/relining-goteborg',
    '/relining-halmstad',
    '/relining-jonkoping',
    '/relining-kristianstad',
    '/relining-varberg'
  ]

  const servicePage = widgetPage.some(path => currentPage.includes(path));

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdn.trustindex.io/loader.js?6f2253e44dfe3429ba463bec87e';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <main>
      {servicePage && (
        <div id="trustindex-widget">
          <iframe
            src="https://cdn.trustindex.io/loader.js?6f2253e44dfe3429ba463bec87e"
            width="100%"
            height="500px"
            title="Google Reviews"
          />
        </div>
      )}
    </main>
  );
};

export default GoogleReviewsWidget;
