import Marquee from "react-fast-marquee";
import "./decor.css";
export default function Decor() {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen -z-50 select-none"
      aria-hidden
      role="presentation"
    >
      <div className="fixed bg-container dark:bg-container-dark" />
      <div className="fixed triangle-square w-screen h-screen" />
      <div className="fixed dotted lg:w-[716px] md:w-[384px] w-[256px] h-screen left-[12px] md:left-[64px] lg:left-[128px] border-x-2" />
      <div className="fixed checkerboard w-screen h-[428px] top-[170px] sm:top-[212px] border-y-2" />
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
          I make websites, games and software | Hobby: Anime, Investments,
          Reading, Drawing | I like learning new technologies | Quá ghê gớm |
          Lorem Ipsum |
        </Marquee>
      </div>
      <div className="fixed w-screen border-y-2 h-18 top-[652px] -rotate-9 px-[200px]" />
      <div className="fixed w-30 border-x-2 h-screen right-[525px] rotate-12" />
      <div className="fixed w-48 strip border-x-2 h-screen right-[65px] rotate-4" />
    </div>
  );
}
