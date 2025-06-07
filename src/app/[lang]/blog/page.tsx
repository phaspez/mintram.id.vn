import Blogs from "@/app/[lang]/blog/blogs";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { getDictionary, langOption } from "../dictionaries";
import { Home } from "lucide-react";

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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: langOption }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Link href="/" className="flex items-center gap-2 pb-4">
        <IoChevronBack />
        {dictionary.navigation.backhome} <Home />
      </Link>
      <p className="text-sm">{dictionary.navigation.translationwarning}</p>
      <Blogs />
    </div>
  );
}
