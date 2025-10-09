import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { Home, Newspaper } from "lucide-react";
import DecorNotFound from "@/components/decor-not-found";

export default async function NotFound() {
  return (
    <div>
      <div className="flex gap-2">
        <Link href="/" className="flex items-center gap-2 pb-4">
          <IoChevronBack />
          Back to Homepage <Home />
        </Link>
        <Link href="/blog" className="flex items-center gap-2 pb-4">
          <IoChevronBack />
          View all blog <Newspaper />
        </Link>
      </div>
      <p>
        Coundn&apos;t find this blog post. Either it&apos;s deleted or it
        didn&apos;t exist
      </p>
      <DecorNotFound />
    </div>
  );
}
