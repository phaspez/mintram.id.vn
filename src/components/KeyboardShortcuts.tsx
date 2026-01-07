"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        !target ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        (target as HTMLElement).isContentEditable
      )
        return;

      const k = e.key.toLowerCase();
      if (k === "b") router.push("/blog");
      else if (k === "p") router.push("/projects");
      else if (k == "t") router.push("/guestbook");
      else if (k == "c") router.push("/changelog");
      else if (k === "g") window.open("https://phaspez.itch.io", "_blank");
      else if (k === "l")
        window.open("https://www.linkedin.com/in/trimin-tram/", "_blank");
      else if (k === "f")
        window.open("https://www.facebook.com/trimin.tram", "_blank");
      else if (k === "h") window.open("https://github.com/phaspez", "_blank");
      else if (k == "e") router.push("/");
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
