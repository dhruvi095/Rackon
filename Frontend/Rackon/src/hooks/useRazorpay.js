import { useEffect, useState } from "react";

export default function useRazorpay() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Remove any Razorpay v2 scripts if injected
    const badScripts = document.querySelectorAll(
      'script[src*="checkout.razorpay.com/v2/checkout.js"]'
    );
    badScripts.forEach((s) => {
      console.warn("❌ Removing Razorpay v2 script:", s.src);
      s.remove();
    });

    // 2. Block v2 network calls (XHR + fetch)
    (function blockV2() {
      if (window.__razorpayV2Blocked) return; // only run once
      window.__razorpayV2Blocked = true;

      const origFetch = window.fetch;
      window.fetch = function (...args) {
        if (typeof args[0] === "string" && args[0].includes("/v2/standard_checkout/")) {
          console.error("❌ Blocked Razorpay v2 fetch", args[0]);
          return Promise.reject(new Error("Razorpay v2 blocked"));
        }
        return origFetch.apply(this, args);
      };

      const origOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        if (url.includes("/v2/standard_checkout/")) {
          console.error("❌ Blocked Razorpay v2 XHR", url);
          return;
        }
        return origOpen.call(this, method, url, ...rest);
      };
    })();

    // 3. Inject Razorpay v1 script if not present
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ Razorpay v1 loaded");
        setLoaded(true);
      };
      script.onerror = () => {
        console.error("❌ Failed to load Razorpay v1");
      };
      document.body.appendChild(script);
    } else {
      console.log("✅ Razorpay already present, version:", window.Razorpay.version || "v1");
      setLoaded(true);
    }
  }, []);

  return loaded;
}
