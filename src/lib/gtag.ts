declare global {
    interface Window {
        gtag? : (...args: any[]) => void
    }
}

// type EventArg = {
//     action: string;
//     category: string;
//     label?: string;
//     value?: number;
// }
export const GA_TRACKING_ID = "G-HC9PLQDFTD";

export const pageview = (url: string) => {
    if(typeof window !== "undefined" && window.gtag){
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        })
    }
}

export const event = ({
    action, category, label, value, 
}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if(typeof window !== "undefined" && window.gtag){
        window.gtag("event", action, {
            event_catgory: category,
            event_label: label,
            value: value
        })
    }
}

export const sendGtagEvent = (action: string, category: string, label?: string, value?: number) => {
    if(typeof window.gtag === "function"){
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value
        })
    }else{
        console.warn('gtag is not avaliable yet')
    }
}