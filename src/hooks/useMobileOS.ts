import { useState, useEffect } from "react";
import type { MobileOS } from "../utils/utils";

export const useMobileOS = (): MobileOS => {
  const [os, setOs] = useState<MobileOS>("Desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";

    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window);
    const isAndroid = /android/i.test(userAgent);

    if (isAndroid) {
      setOs("Android");
    } else if (isIOS) {
      setOs("iOS");
    } else {
      setOs("Other");
    }
  }, []);

  return os;
};
