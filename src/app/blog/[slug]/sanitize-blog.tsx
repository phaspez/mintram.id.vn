"use client";

import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

interface SanitizedBlogProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function SanitizedBlog({ content }: SanitizedBlogProps) {
  const [sanitizedContent, setSanitizedContent] = useState("");
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const giscusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    DOMPurify.addHook("afterSanitizeAttributes", function (node) {
      if (node.tagName === "IMG") {
        node.className = (node.className || "") + " max-w-full h-auto";

        node.setAttribute("style", "max-width: 100%; height: auto;");
      }
    });

    const cleanContent = DOMPurify.sanitize(content);
    setSanitizedContent(cleanContent);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanContent;

    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      tocItems.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setSanitizedContent(tempDiv.innerHTML);
    setToc(tocItems);
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
            scroll-margin-top: 80px; /* Adjust this value based on your header height + some padding */
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [sanitizedContent, toc]);

  // Inject giscus script into the page below the post content.
  useEffect(() => {
    if (!giscusRef.current) return;

    // Clean previous instance (if any)
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

    // Append script to the container so giscus will render there
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
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 100; // Adjust based on your header height + desired padding
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
            " text-justify w-full bg-black p-4"
          }
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      {/* Giscus comments will render here */}
      <div className="py-6">
        <div ref={giscusRef} className="mt-8 md:w-3/4 giscus" />
      </div>
    </div>
  );
}
