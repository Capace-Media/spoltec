import { useEffect } from 'react';

const GoogleReviewsWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.trustindex.io/loader.js?6f2253e44dfe3429ba463bec87e';
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
            <div id="trustindex-widget">
                <iframe
                    src="https://cdn.trustindex.io/loader.js?6f2253e44dfe3429ba463bec87e"
                    width="100%"
                    height="500px"
                    title="Google Reviews"
                />
            </div>
        </main>
    );
};

export default GoogleReviewsWidget;
