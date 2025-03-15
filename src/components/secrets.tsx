"use client";

import { useEffect } from "react";

export default function Secrets() {
  useEffect(() => {
    console.log(
      "%cYou are peeking at my ugly code!\nOh well since you're here, this site ís build using Next.js, Tailwind CSS and shadcn/ui btw.",
      "font-family: 'JetBrains Mono', monospace; color: cyan; background: blue; padding:10px; font-weight: bold; font-size: 18px;",
    );
    console.log(
      "%cBlog is managed by Wisp, although I might think of using Payload CMS in the future. Deployed on Vercel.",
      "font-family: 'JetBrains Mono', monospace; color: cyan; background: blue; padding:10px; font-weight: bold; font-size: 18px;",
    );
    console.log(
      "%cTalk is cheap, you might want to check out my other (crappy) source code at https://github.com/phaspez :)",
      "font-family: 'JetBrains Mono', monospace; color: cyan; background: blue; padding:10px; font-weight: bold; font-size: 18px;",
    );
  }, []);

  return <></>;
}
