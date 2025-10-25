import Secrets from "@/components/secrets";
import { lazy } from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import "./globals.css";
import { Mail } from "lucide-react";

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
  const plainText =
    "<a href='https://mintram.id.vn/'>\n\t<img src='https://mintram.id.vn/hello.gif' alt='phaspez'>\n</a>";
  return (
    <>
      <Secrets />
      <div className="w-full justify-items-center gap-16 sm:p-20 pt-22">
        <Decor />
        <main className="w-full sm:items-start pt-0 px-8">
          <span className="not-prose content-start lg:hidden">
            <p className="p-0 m-0 decorative-text text-right max-w-[435px]">
              phaspez
            </p>
            <h1 className="p-0 m-0 decorative-text">mintram</h1>
          </span>
          <span className="not-prose flex-wrap gap-4 content-start hidden lg:flex">
            <h1 className="decorative-text">mintram</h1>
            <p className="pt-0 mt-0 decorative-text">phaspez</p>
          </span>
          <div className="flex flex-wrap flex-reverse">
            <div className="max-w-min border-6 border-red-900/40 bg-red-900/40">
              <article className="text-wrap min-w-[419px] p-4 pb-0">
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
                    href="https://www.facebook.com/trimin.tram"
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
              <article className="text-wrap mix-w-[419px] p-4">
                <p>Also check out these people&apos;s cool sites!</p>
                <div>
                  <Marquee
                    gradientColor="white"
                    speed={40}
                    pauseOnHover
                    className="border-x-12 border-[#ffffe3] h-10 overflow-hidden py-0"
                  >
                    <a href="https://dimden.dev/">
                      <img
                        src="https://dimden.dev/services/images/88x31.gif"
                        alt="Dimden"
                      />
                    </a>
                    <a href="https://melankorin.net/">
                      <img
                        src="https://melankorin.net/assets/img/buttons/button-1.gif"
                        alt="Melankorin"
                      />
                    </a>
                    <a href="https://frutigeraeroarchive.org/">
                      <img
                        src="https://frutigeraeroarchive.org/images/buttons/frutigeraeroarchive_button.png"
                        alt="The Frutiger Aero Archive"
                      />
                    </a>
                    <a href="https://ribo.zone/">
                      <img
                        src="https://ribo.zone/88x31/site/ribozone.gif"
                        alt="Ribozone"
                      />
                    </a>
                  </Marquee>
                </div>
                <p>
                  Wanna be included? Feel free to shoot me a mail! Please do
                  hotlink my site, it&apos;s fine!
                </p>
                <div className="flex items-center p-0 gap-2">
                  <Link href="https://mintram.id.vn/">
                    <Image
                      src={"/hello.gif"}
                      width="81"
                      height="31"
                      alt="image"
                      className="min-w-[81px] min-h-[31px]"
                    />
                  </Link>
                  <p className="text-xs text-muted-foreground">{plainText}</p>
                </div>
              </article>
            </div>
            <div className="flex justify-center w-full lg:w-min lg:grid content-start gap-4 pt-10 lg:pl-4 flex-none">
              <Link
                href={"/blog"}
                className="underline decorative-text text-xl grow-none"
                aria-keyshortcuts="b"
              >
                <span className="text-gray-400/40">[</span>
                <span>B</span>
                <span className="text-gray-400/40">]</span>LOG
              </Link>

              <Link
                href={"/project"}
                className="underline decorative-text text-xl"
                aria-keyshortcuts="p"
              >
                <span className="text-gray-400/40">[</span>
                <span>P</span>
                <span className="text-gray-400/40">]</span>ROJECTS
              </Link>

              <Link
                href={"https://phaspez.itch.io"}
                className="underline decorative-text text-xl"
                aria-keyshortcuts="g"
              >
                <span className="text-gray-400/40">[</span>
                <span>G</span>
                <span className="text-gray-400/40">]</span>AMES
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
