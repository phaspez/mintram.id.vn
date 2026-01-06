"use client";

import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { codeToHtml } from "shiki";

interface SanitizedBlogProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function SanitizedBlog({ content }: SanitizedBlogProps) {
  const [sanitizedContent, setSanitizedContent] = useState("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const giscusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const processContent = async () => {
      DOMPurify.addHook("afterSanitizeAttributes", function (node) {
        const el = node as Element;
        if (el.tagName === "IMG") {
          (el as HTMLElement).className =
            ((el as HTMLElement).className || "") + " max-w-full h-auto";
          el.setAttribute("style", "max-width: 100%; height: auto;");
        }
      });

      const cleanContent = DOMPurify.sanitize(content);
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cleanContent;

      // Extract headings for TOC
      const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const tocItems: TocItem[] = [];

      headings.forEach((heading, index) => {
        const text = heading.textContent || `heading-${index}`;
        const generatedId = slugify(text) || `heading-${index}`;
        const id = heading.id || generatedId;
        heading.id = id;

        tocItems.push({
          id,
          text,
          level: parseInt(heading.tagName.charAt(1)),
        });
      });

      // Process code blocks with Shiki
      const codeBlocks = tempDiv.querySelectorAll("pre code");

      for (const codeBlock of Array.from(codeBlocks)) {
        const pre = codeBlock.parentElement;
        if (!pre) continue;

        // Extract language from class (e.g., "language-javascript")
        let language = "text";
        const classes = codeBlock.className.split(" ");
        for (const cls of classes) {
          if (cls.startsWith("language-")) {
            language = cls.replace("language-", "");
            break;
          }
        }

        // Get the code content
        const code = codeBlock.textContent || "";

        try {
          // Generate highlighted HTML with Shiki
          const html = await codeToHtml(code, {
            lang: language,
            theme: "github-dark", // or 'github-light', 'dracula', 'nord', etc.
          });

          // Create a wrapper div and insert the highlighted code
          const wrapper = document.createElement("div");
          wrapper.className = "shiki-wrapper my-4";
          wrapper.innerHTML = html;

          // Replace the pre element with the highlighted version
          pre.replaceWith(wrapper);
        } catch (error) {
          console.error(
            `Error highlighting code block with language ${language}:`,
            error,
          );
          // Keep original code block if highlighting fails
        }
      }

      // Process inline code with Shiki
      const inlineCodes = tempDiv.querySelectorAll("code:not(pre code)");

      for (const inlineCode of Array.from(inlineCodes)) {
        // Extract language from class if present
        let language = "text";
        const classes = inlineCode.className.split(" ");
        for (const cls of classes) {
          if (cls.startsWith("language-")) {
            language = cls.replace("language-", "");
            break;
          }
        }

        // Get the code content
        const code = inlineCode.textContent || "";

        try {
          // Generate highlighted HTML with Shiki for inline code
          const html = await codeToHtml(code, {
            lang: language,
            theme: "github-dark",
          });

          // Extract just the code part without the pre wrapper
          const temp = document.createElement("div");
          temp.innerHTML = html;
          const preElement = temp.querySelector("pre");
          const codeElement = preElement?.querySelector("code");

          if (codeElement) {
            // Create inline span with the highlighted content
            const span = document.createElement("span");
            span.className = "shiki-inline";
            span.innerHTML = codeElement.innerHTML;

            // Copy the background color from the pre element
            const bgColor = preElement?.style.backgroundColor || "#0d1117";
            span.style.backgroundColor = bgColor;
            span.style.padding = "0.2em 0.4em";
            span.style.borderRadius = "0.25rem";
            span.style.fontSize = "0.875em";

            inlineCode.replaceWith(span);
          }
        } catch (error) {
          console.error(`Error highlighting inline code:`, error);
          // Keep original inline code if highlighting fails
        }
      }

      setSanitizedContent(tempDiv.innerHTML);
      setToc(tocItems);
    };

    processContent();
  }, [content]);

  useEffect(() => {
    if (contentRef.current && toc.length > 0) {
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6",
      );

      headings.forEach((heading, index) => {
        if (index < toc.length) {
          heading.id = toc[index].id;
        }
      });

      if (!document.getElementById("scroll-margin-style")) {
        const style = document.createElement("style");
        style.id = "scroll-margin-style";
        style.textContent = `
          h1, h2, h3, h4, h5, h6 {
            scroll-margin-top: 80px;
          }
          .shiki-wrapper {
            border-radius: 0.5rem;
            overflow-x: auto;
          }
          .shiki-wrapper pre {
            margin: 0;
            padding: 1rem;
          }
          .shiki-inline {
            display: inline;
            font-family: 'Courier New', Courier, monospace;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [sanitizedContent, toc]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!giscusRef.current) return;

    giscusRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "phaspez/site-discussion");
    script.setAttribute("data-repo-id", "R_kgDOP_wW4A");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOP_wW4M4Cwdwa");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    giscusRef.current.appendChild(script);

    return () => {
      if (giscusRef.current) giscusRef.current.innerHTML = "";
    };
  }, [sanitizedContent]);

  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();

    try {
      history.pushState(null, "", `#${id}`);
    } catch {
      window.location.hash = id;
    }

    scrollToId(id);
  };

  useEffect(() => {
    const tryScrollToHash = () => {
      const rawHash = window.location.hash;
      if (rawHash && rawHash.length > 1) {
        const id = decodeURIComponent(rawHash.substring(1));
        setTimeout(() => scrollToId(id), 50);
      }
    };

    tryScrollToHash();

    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.substring(1) || "");
      if (id) scrollToId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sanitizedContent]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 pr-6">
        {toc.length > 0 && (
          <div className="md:w-1/4">
            <div className="sticky top-4 pt-2 md:pt-14 md:min-h-screen md:border-r-2">
              <h3 className="text-lg font-semibold mb-2">Table of Contents</h3>
              <nav className="">
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li
                      className="list-none"
                      key={item.id}
                      style={{
                        paddingLeft: `${(item.level - 1) * 0.5}rem`,
                        fontSize: `${Math.max(0.9 - (item.level - 1) * 0.05, 0.7)}rem`,
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleTocClick(e, item.id)}
                        className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        <div
          ref={contentRef}
          className={
            (toc.length > 0 ? "md:w-3/4" : "w-full") +
            " blog-content text-justify w-full bg-black p-4"
          }
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <div className="py-6">
        <div ref={giscusRef} className="mt-8 md:w-3/4 giscus" />
      </div>
    </div>
  );
}
