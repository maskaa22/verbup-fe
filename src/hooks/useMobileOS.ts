import { useState, useEffect } from "react";
import type { MobileOS } from "../utils/utils";

export const useMobileOS = (): MobileOS => {
  const [os, setOs] = useState<MobileOS>("Windows");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";

    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) &&
      !("MSStream" in window);

    const isAndroid = /android/i.test(userAgent);

    const isMac =
      /Macintosh/i.test(userAgent) &&
      "speechSynthesis" in window;

    if (isAndroid) {
      setOs("Android");
    } else if (isIOS) {
      setOs("iOS");
    } else if (isMac) {
      setOs("Mac");
    } else {
      setOs("Windows");
    }
  }, []);

  return os;
};