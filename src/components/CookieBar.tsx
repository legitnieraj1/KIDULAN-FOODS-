"use client";

import { useEffect, useState } from "react";

export function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem("kidulan-cookie-choice") !== "set");
  }, []);

  const choose = () => {
    window.localStorage.setItem("kidulan-cookie-choice", "set");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-4 rounded-[1.4rem] bg-cream/90 p-4 text-ink shadow-soft backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold md:text-base">
          We use cookies to improve your experience and analyze website usage.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-full bg-butter px-5 py-3 font-grotesk text-xs font-black uppercase transition-colors hover:bg-ink hover:text-cream"
            onClick={choose}
          >
            Decline
          </button>
          <button
            type="button"
            className="rounded-full bg-ink px-5 py-3 font-grotesk text-xs font-black uppercase text-cream transition-colors hover:bg-butter hover:text-ink"
            onClick={choose}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
