import React from "react";
import { codeToHtml } from "shiki";

type Props = {
  code: string;
  lang?: string;
  theme?: string;
  className?: string;
};

// This is an async Server Component. It uses shiki to produce highlighted
// HTML on the server and returns a small wrapper with the result.
export default async function ShikiHighlighter({
  code,
  lang = "html",
  theme = "github-dark",
  className = "",
}: Props) {
  const html = await codeToHtml(code, { lang, theme });

  return (
    <div
      className={`shiki-wrapper my-0 ${className}`}
      // shiki returns a <pre>...</pre> block already, so we inject it
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
