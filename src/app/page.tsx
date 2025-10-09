import Secrets from "@/components/secrets";
import { lazy } from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import "./globals.css";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

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
  return (
    <>
      <Secrets />
      <KeyboardShortcuts />
      <div className="w-full justify-items-center gap-16 sm:p-20 pt-22">
        <Decor />
        <main className="flex flex-col row-start-2 w-full sm:items-start p-6">
          <div className="grid text-wrap max-w-[512px] pt-2 md:pt-16">
            <article>
              <h1>Min Tram</h1>
              <p>
                I make websites and games! I use React, Unity and Godot.
                Currently a Computer Science student at Can Tho University.
              </p>
            </article>
            <article>
              <span className="flex gap-4 mt-3">
                <Link
                  href={"/blog"}
                  className="underline"
                  aria-keyshortcuts="b"
                >
                  <span className="text-gray-400">[</span>
                  <span>B</span>
                  <span className="text-gray-400">]</span>log
                </Link>

                <Link
                  href={"/project"}
                  className="underline"
                  aria-keyshortcuts="p"
                >
                  <span className="text-gray-400">[</span>
                  <span>P</span>
                  <span className="text-gray-400">]</span>roject
                </Link>

                <Link
                  href={"https://phaspez.itch.io"}
                  className="underline"
                  aria-keyshortcuts="g"
                >
                  <span className="text-gray-400">[</span>
                  <span>G</span>
                  <span className="text-gray-400">]</span>ame
                </Link>
              </span>
              <span className="flex gap-4 mt-3">
                <Link
                  href="https://www.linkedin.com/in/trimin-tram/"
                  aria-label="linkedin"
                  className="underline flex items-center gap-2"
                  aria-keyshortcuts="l"
                >
                  <FaLinkedin />
                  <span className="flex gap-0">
                    <span className="text-gray-400">[</span>
                    <span>L</span>
                    <span className="text-gray-400">]</span>inkedIn
                  </span>
                </Link>
                <Link
                  href="https://www.facebook.com/trimin.tram"
                  aria-label="facebook"
                  className="underline flex items-center gap-2"
                  aria-keyshortcuts="f"
                >
                  <FaFacebook />
                  <span className="flex gap-0">
                    <span className="text-gray-400">[</span>
                    <span>F</span>
                    <span className="text-gray-400">]</span>aceBook
                  </span>
                </Link>
                <Link
                  href="https://github.com/phaspez"
                  aria-label="github"
                  className="underline flex items-center gap-2"
                  aria-keyshortcuts="h"
                >
                  <FaGithub />
                  <span className="flex gap-0">
                    Git<span className="text-gray-400">[</span>
                    <span>H</span>
                    <span className="text-gray-400">]</span>ub
                  </span>
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
            <hr />
            <article>
              <p>Also check out these people&apos;s cool sites!</p>
              <div>
                <Marquee gradientColor="white" speed={40} pauseOnHover>
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
              <p>Wanna be included? Feel free to shoot a mail!</p>
              <p>Please do hotlink my site, it&apos;s fine!</p>
              <div className="flex items-center gap-4">
                <Link href="https://mintram.id.vn/">
                  <Image
                    src={"/hello.gif"}
                    width="81"
                    height="31"
                    alt="image"
                  />
                </Link>
                <textarea
                  style={{ resize: "none" }}
                  className="break-all mt-2 border-2 border-gray rounded-md"
                  id="plainText"
                  name="plainText"
                  rows={4}
                  cols={40}
                  defaultValue={
                    "<a href='https://mintram.id.vn/'>\n\t<img src='https://mintram.id.vn/hello.gif' alt='phaspez'>\n</a>\n"
                  }
                />
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
