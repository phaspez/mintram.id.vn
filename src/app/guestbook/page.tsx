import BlogDecor from "@/components/blog-decor";
import { Home } from "lucide-react";
import Link from "next/link";

export default function Main() {
  return (
    <div>
      <BlogDecor />
      <Link href={"/"} className="span-icon-text">
        <Home />
        <span>
          Hom<span className="text-gray-400/40">[</span>e
          <span className="text-gray-400/40">]</span>
        </span>
      </Link>
      <h1 className="text-3xl font-bold decorative-text">
        <span className="sm:hidden">gstbk</span>
        <span className="hidden sm:inline">guestbook</span>
      </h1>
      <p>Chat with others! Share your deepest secrets!</p>
      <div className="h-[1024px]">
        <iframe
          src="https://mintram.atabook.org"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
}
