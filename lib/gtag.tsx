export const GA_TRACKING_ID = process.env.REACT_APP_GA_ID

export const pageview = (url:any) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
}