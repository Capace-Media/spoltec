export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url:any) => {
    try {
        if(GA_TRACKING_ID && window.gtag){
            window.gtag('config', GA_TRACKING_ID, {
                page_path: url,
            })
        }
    } catch (error) {
        console.log("Error from the trackerPageView => ", error);
    }
    
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
}