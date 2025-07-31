import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Додаємо типізацію для window.gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
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

export default usePageTracking;
