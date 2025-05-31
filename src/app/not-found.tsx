import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { Home } from "lucide-react";
import DecorNotFound from "@/components/decor-not-found";

export default function NotFound() {
  return (
    <div>
      <div className="flex gap-2">
        <Link href="/" className="flex items-center gap-2 pb-4">
          <IoChevronBack />
          Back to Homepage <Home />
        </Link>
      </div>
      This page hadn&apos;t been invented... yet.
      <DecorNotFound />
    </div>
  );
}
