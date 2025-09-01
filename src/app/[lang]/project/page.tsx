import Link from "next/link";
import Image from "next/image";
import { langOption, getDictionary } from "@/app/[lang]/dictionaries";
import { IoChevronBack } from "react-icons/io5";
import { Home } from "lucide-react";

export default async function Page({
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

      <h1 className="text-3xl font-bold">{dictionary.projects.title}</h1>

      <div className="grid gap-4">
        <article className="lg:columns-2 columns-1 bg-orange-100 dark:bg-orange-600/20 p-4 rounded-md">
          <div>
            <h2 className="mt-2">
              CAAS - Chat-Voice Admissions Advisory Support
            </h2>
            <Link href="https://caas.mintram.id.vn">caas.mintram.id.vn</Link>
            <p>{dictionary.projects.caas.desc1}</p>
            <p>{dictionary.projects.caas.desc2}</p>
            <p>{dictionary.projects.caas.desc3}</p>
          </div>
          <div className="flex justify-center items-center h-full">
            <Image
              src="/project/caas.png"
              width={600}
              height={300}
              alt="CAAS home page"
              className="rounded-md"
            />
          </div>
        </article>

        <article className="lg:columns-2 lg:flex-row-reverse columns-1 bg-indigo-200 dark:bg-indigo-500/20 p-4 rounded-md">
          <div className="flex justify-center items-center h-full">
            <Image
              src="/project/terraship.png"
              width={700}
              height={500}
              alt="Terraship menu"
              className="rounded-md"
            />
          </div>
          <div>
            <h2 className="mt-2">Terraship</h2>
            <Link href="https://phaspez.itch.io/terraship">
              phaspez.itch.io/terraship
            </Link>
            <p>{dictionary.projects.terraship.desc1}</p>
            <p>{dictionary.projects.terraship.desc2}</p>
            <p>{dictionary.projects.terraship.desc3}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
