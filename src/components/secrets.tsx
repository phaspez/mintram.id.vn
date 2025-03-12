"use client";

import { useEffect } from "react";

export default function Secrets() {
  useEffect(() => {
    console.log(
      "%cYou are peeking at my ugly code!",
      "font-family: 'JetBrains Mono', monospace; color: cyan; font-weight: bold; font-size: 18px;",
    );
  }, []);

  return <></>;
}
