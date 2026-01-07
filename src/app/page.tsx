/* eslint-disable @next/next/no-img-element */
import Secrets from "@/components/secrets";
import { lazy } from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import "./globals.css";
import { Mail } from "lucide-react";
import { NeonFlickerText } from "@/components/NeonFlicker";
import CoolSites from "@/components/cool-sites";
import { codeToHtml } from "shiki";

const Decor = lazy(() => import("@/app/decor"));

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

export default async function Home() {
  const html = await codeToHtml(
    `<a href='https://mintram.id.vn/'>\n\t<img src='https://mintram.id.vn/hello.gif' alt='phaspez'>\n</a>`,
    {
      lang: "html",
      theme: "red",
    },
  );

  return (
    <>
      <Secrets />
      <div className="w-full justify-items-center p-0 sm:p-20 pt-4">
        <Decor />
        <main className="w-full sm:items-start pt-0 md:px-8">
          <span className="not-prose content-start lg:hidden">
            <p className="p-0 m-0 decorative-text max-w-[435px]">phaspez</p>
            <h1 className="decorative-text text-outline title">
              <NeonFlickerText text="mintram" />
            </h1>
          </span>
          <span className="not-prose flex-wrap gap-4 content-start hidden lg:flex">
            <h1 className="decorative-text text-outline">
              <NeonFlickerText text="mintram" />
            </h1>
            <p className="pt-0 mt-0 decorative-text">phaspez</p>
          </span>
          <div className="flex flex-wrap w-full p-0">
            <div className="order-1 lg:order-none grid grid-cols-1 gap-2">
              <article className="text-wrap lg:w-[430px] p-3 lg:p-4 pb-0 link-red article-panel">
                <p>I make websites and games! I use React, Unity and Godot.</p>
                <span className="flex flex-wrap gap-4 mt-3">
                  <Link
                    href="https://www.linkedin.com/in/trimin-tram/"
                    aria-label="linkedin"
                    className="span-icon-text"
                    aria-keyshortcuts="l"
                  >
                    <FaLinkedin />
                    <span className="flex gap-0">
                      <span className="text-gray-400/40">[</span>
                      <span>L</span>
                      <span className="text-gray-400/40">]</span>inkedIn
                    </span>
                  </Link>
                  <Link
                    href="https://www.facebook.com/phaspez"
                    aria-label="facebook"
                    className="span-icon-text"
                    aria-keyshortcuts="f"
                  >
                    <FaFacebook />
                    <span className="flex gap-0">
                      <span className="text-gray-400/40">[</span>
                      <span>F</span>
                      <span className="text-gray-400/40">]</span>aceBook
                    </span>
                  </Link>
                  <Link
                    href="https://github.com/phaspez"
                    aria-label="github"
                    className="span-icon-text"
                    aria-keyshortcuts="h"
                  >
                    <FaGithub />
                    <span className="flex gap-0">
                      Git<span className="text-gray-400/40">[</span>
                      <span>H</span>
                      <span className="text-gray-400/40">]</span>ub
                    </span>
                  </Link>
                </span>
                <span className="flex gap-4 mt-3">
                  <a
                    href="mailto:contact@mintram.id.vn"
                    className="span-icon-text"
                  >
                    <Mail />
                    <span>contact@mintram.id.vn</span>
                  </a>
                </span>
              </article>

              <article className="text-wrap lg:w-[430px] p-3 lg:p-4 article-panel">
                <p>Neighborhood</p>
                <CoolSites />
                <sub>
                  Feel free to hit me up! Please do hotlink my site, it&apos;s
                  fine!
                </sub>
                <div className="flex items-center p-0 gap-1 overflow-x-clip">
                  <Link href="https://mintram.id.vn/">
                    <Image
                      src={"/hello.gif"}
                      width="88"
                      height="31"
                      alt="image"
                      className="min-w-[88px] min-h-[31px]"
                    />
                  </Link>
                  <div
                    className="overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </article>
              <div className="flex gap-2 justify-center items-center text-center">
                <p className="p-0 m-0">Guest Counter</p>
                <div>
                  <a href="https://guestscounter.com" className="relative h-5">
                    <img
                      src={`https://guestscounter.com/count.php?c_style=49&id=1767699326&ts=${Math.floor(Date.now() / 3600000)}`}
                      alt="free hits count GuestCounter.com"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap order-0 lg:order-none justify-center w-full lg:w-min lg:grid content-start gap-4 pb-6 lg:pl-4 flex-none">
              <Link
                href={"/blog"}
                className="underline decorative-text text-md md:text-xl"
                aria-keyshortcuts="b"
              >
                <span className="text-gray-400/40 select-none">[</span>
                <span>B</span>
                <span className="text-gray-400/40 select-none">]</span>LOG
              </Link>

              <Link
                href={"/projects"}
                className="underline decorative-text text-md md:text-xl"
                aria-keyshortcuts="p"
              >
                <span className="text-gray-400/40 select-none">[</span>
                <span>P</span>
                <span className="text-gray-400/40 select-none">]</span>ROJECTS
              </Link>

              <Link
                href={"https://phaspez.itch.io"}
                className="underline decorative-text text-md md:text-xl"
                aria-keyshortcuts="g"
              >
                <span className="text-gray-400/40 select-none">[</span>
                <span>G</span>
                <span className="text-gray-400/40 select-none">]</span>AMES
              </Link>

              <Link
                href={"/guestbook"}
                className="underline decorative-text text-md md:text-xl"
                aria-keyshortcuts="b"
              >
                GUES
                <span className="text-gray-400/40 select-none">[</span>
                <span>T</span>
                <span className="text-gray-400/40 select-none">]</span>BOOK
              </Link>
              {/* <Link href={"/changelog"}>Changelog</Link> */}

              <Link
                href={"/changelog"}
                className="underline decorative-text text-md md:text-xl"
                aria-keyshortcuts="c"
              >
                <span className="text-gray-400/40 select-none">[</span>
                <span>C</span>
                <span className="text-gray-400/40 select-none">]</span>HANGELOG
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
