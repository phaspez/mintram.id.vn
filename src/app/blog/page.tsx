import Blogs from "@/app/blog/blogs";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { Home } from "lucide-react";
import "../globals.css";

export const metadata = {
  title: "blog | mintram",
  description: "blog where i write stuff.",
  openGraph: {
    title: "blog | mintram",
    description: "i like to make software.",
    type: "website",
    url: "https://mintram.id.vn",
    images: [
      {
        url: "/webcover.png",
        width: 400,
        height: 400,
        alt: "mintram, a website about everything, and nothing",
      },
    ],
  },
};

export default async function BlogPage() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 pb-4">
        <IoChevronBack />
        <Home /> Go back to Main
      </Link>
      <Blogs />
    </div>
  );
}
