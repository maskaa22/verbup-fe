import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Додаємо типізацію для window.gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-HC9PLQDFTD", {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);
};

export const sendGtagEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  } else {
    console.warn("gtag is not avaliable yet");
  }
};

export default usePageTracking;
