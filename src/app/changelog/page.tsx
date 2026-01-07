import BlogDecor from "@/components/blog-decor";
import { Home } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "changelog | mintram",
  description: "changed things.",
  openGraph: {
    title: "changelog | projects",
    description: "changed things.",
    type: "website",
    url: "https://mintram.id.vn",
    images: [
      {
        url: "/webcover.png",
        width: 400,
        height: 400,
      },
    ],
  },
};

export default function Main() {
  return (
    <div className="overflow-x-clip">
      <BlogDecor />
      <Link href={"/"} className="span-icon-text">
        <Home />
        <span>
          Hom<span className="text-gray-400/40">[</span>e
          <span className="text-gray-400/40">]</span>
        </span>
      </Link>
      <h1 className="text-3xl font-bold decorative-text">
        <span className="sm:hidden">chng log</span>
        <span className="hidden sm:inline">changelog</span>
      </h1>
      <p>History and stuff for bookkeeping</p>

      <article>
        <h3>2026-01-06</h3>
        <ul>
          <li>Added Guest counter</li>
          <li>Added Guestbook</li>
          <li>Added Changelog, which you&apos;re reading right now!</li>
          <li>Added syntax hightlighting for code blocks</li>
          <li>Slightly adjust color and theme</li>
          <li>Removed a few background elements</li>
        </ul>
      </article>
      <article>
        <h3>2025-10-25</h3>
        <ul>
          <li>Blog posts now have tags to filter</li>
          <li>Visual Adjustments</li>
        </ul>
      </article>
      <article>
        <h3>2025-10-10</h3>
        <ul>
          <li>Removed Wisp CMS</li>
          <li>Migrated from Vercel to GitHub Pages</li>
          <li>Many pages are now static pages</li>
        </ul>
      </article>
      <article>
        <h3>2025-10-09</h3>
        <ul>
          <li>Removed localization support</li>
          <li>Removed options to change theme</li>
        </ul>
      </article>
      <article>
        <h3>2025-06-07</h3>
        <ul>
          <li>Added localization support</li>
        </ul>
      </article>
      <article>
        <h3>2025-03-15</h3>
        <ul>
          <li>Initial launch</li>
        </ul>
      </article>
    </div>
  );
}
