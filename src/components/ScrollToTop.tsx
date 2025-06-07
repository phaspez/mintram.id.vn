"use client";

import { useState, useEffect } from "react";
import { IoArrowUp } from "react-icons/io5";
import { Button } from "./ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check if user is at bottom of page
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className={`fixed right-8 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 z-50 ${
            isAtBottom ? "bottom-36" : "bottom-8"
          }`}
          aria-label="Scroll to top"
        >
          <IoArrowUp size={24} />
        </Button>
      )}
    </>
  );
}
