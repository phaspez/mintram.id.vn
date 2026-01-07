"use client";

import Marquee from "react-fast-marquee";
import "./decor.css";

export default function Decor() {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen -z-50 select-none"
      aria-hidden
      role="presentation"
    >
      <div className="text-[12.25rem] fixed text-outline-green -rotate-6">
        <span aria-hidden role={"presentation"}>
          パスペス
        </span>
      </div>
      <div className="text-[12.25rem] fixed text-outline-green top-[612px] -rotate-6">
        <span aria-hidden role={"presentation"}>
          トリミン
        </span>
      </div>
      <div className="fixed bg-container dark:bg-container-dark" />
      <div className="fixed dotted lg:w-[716px] md:w-[384px] w-[256px] h-screen left-[12px] md:left-[64px] lg:left-[128px]" />
      <Marquee
        speed={10}
        className="fixed w-screen h-[428px] top-[170px] sm:top-[212px]"
      >
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
      </Marquee>
      <div className="fixed w-[612px] top-[128px] py-4 border-r-12 rotate-1">
        <Marquee className="fixed text-bold text-xl text-gray-600/30 dark:text-gray-400/30">
          The Real Folk Blues | I need money plz gib some | 596F 7520 6172 6520
          6120 6E65 7264 | Computer Science Student at Can Tho University | Male
          | Press F12 | Nupakachi | 日本語が分かりません |
        </Marquee>
      </div>
      <div className="fixed w-[712px] bottom-[128px] right-0 py-4 border-l-12 -rotate-8">
        <Marquee
          direction="right"
          className="text-bold text-xl text-gray-600/30 dark:text-gray-400/30"
        >
          I make websites, games and software | Hobby: Anime, Reading, Drawing |
          I like learning new technologies | Quá ghê gớm | Lorem Ipsum |
        </Marquee>
      </div>
      <div className="fixed checkerboard w-[620px] h-18 top-[690px] px-[200px]" />
      <div
        className="fixed inset-0 bg-[url('/img_1.png')] bg-center bg-repeat-x bg-contain
        pointer-events-none w-[2024px] h-[64px] opacity-10"
        aria-hidden
      />
      <div
        className="fixed top-0 right-[0px] bg-[url('/img_2.png')] bg-center bg-repeat-y bg-contain
        pointer-events-none h-[1024px] w-[82px] opacity-10 animate-bg-pan"
        aria-hidden
      />
    </div>
  );
}
