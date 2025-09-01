import Image from "next/image";
import Secrets from "@/components/secrets";
import { lazy } from "react";
import { type langOption, getDictionary } from "./dictionaries";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

const Decor = lazy(() => import("@/app/[lang]/decor"));

export const metadata = {
  title: "mintram | inthemiddle",
  description: "very cool site here.",
  openGraph: {
    title: "mintram | inthemiddle",
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

export default async function Home({
  params,
}: {
  params: Promise<{ lang: langOption }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Secrets />
      <div className="w-full justify-items-center gap-16 sm:p-20 pt-22">
        <Decor />
        <main className="flex flex-col row-start-2 w-full sm:items-start p-6">
          <div className="grid text-wrap max-w-[512px] pt-2 md:pt-16">
            <article>
              <h1>{dictionary.home.intro1}</h1>
              <p>{dictionary.home.intro2}</p>
            </article>
            <article>
              <span className="flex gap-4 mt-3">
                <Link href={"/blog"} className="underline">
                  {dictionary.navbar.blog}
                </Link>
                <Link href={"/project"} className="underline">
                  {dictionary.navbar.project}
                </Link>
                <Link href={"https://phaspez.itch.io"} className="underline">
                  {dictionary.navbar.game}
                </Link>
              </span>
              <span className="flex gap-4 mt-3">
                <Link
                  href="https://www.linkedin.com/in/trimin-tram/"
                  aria-label="linkedin"
                  className="underline flex items-center gap-2"
                >
                  <FaLinkedin /> LinkedIn
                </Link>
                <Link
                  href="https://www.facebook.com/trimin.tram"
                  aria-label="facebook"
                  className="underline flex items-center gap-2"
                >
                  <FaFacebook /> Facebook
                </Link>
                <Link
                  href="https://github.com/phaspez"
                  aria-label="github"
                  className="underline flex items-center gap-2"
                >
                  <FaGithub />
                  GitHub
                </Link>
              </span>
              <span className="flex gap-4 mt-3">
                <a href="mailto:tramtrimin@gmail.com">
                  <span className="underline flex items-center gap-2">
                    tramtrimin@gmail.com
                  </span>
                </a>
              </span>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
