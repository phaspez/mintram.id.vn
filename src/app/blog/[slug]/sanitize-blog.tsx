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

  useEffect(() => {
    DOMPurify.addHook("afterSanitizeAttributes", function (node) {
      // If the node is an image
      if (node.tagName === "IMG") {
        // Add responsive image classes
        node.className = (node.className || "") + " max-w-full h-auto";

        // Force image to respect container width
        node.setAttribute("style", "max-width: 100%; height: auto;");
      }
    });

    // Sanitize the content
    const cleanContent = DOMPurify.sanitize(content);
    setSanitizedContent(cleanContent);

    // Create a temporary div to parse headings
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanContent;

    // Find all headings
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      // Create an ID if one doesn't exist
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      tocItems.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    // Update the sanitized content with the new IDs
    setSanitizedContent(tempDiv.innerHTML);
    setToc(tocItems);
  }, [content]);

  // Update real DOM element IDs after rendering
  useEffect(() => {
    if (contentRef.current && toc.length > 0) {
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6",
      );

      // Apply IDs and add scroll padding
      headings.forEach((heading, index) => {
        if (index < toc.length) {
          heading.id = toc[index].id;
        }
      });

      // Add CSS for scroll-margin-top
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

  // Handle smooth scrolling with offset manually
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
    <div className="flex flex-col md:flex-row gap-8">
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
        className={toc.length > 0 ? "md:w-3/4" : "w-full"}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
