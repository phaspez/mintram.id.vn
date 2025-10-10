import Marquee from "react-fast-marquee";
import "@/app/globals.css";
import "@/app/decor.css";

export default function BlogDecor() {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen -z-50 select-none overflow-hidden"
      aria-hidden
      role="presentation"
    >
      <div className="fixed dotted lg:w-[412px] md:w-[384px] w-[256px] h-screen left-[4px] md:left-[64px] lg:left-[16px]" />
      <Marquee
        direction="right"
        speed={10}
        className="fixed w-screen h-[112px] lg:h-[88px] top-[75px] overflow-hidden"
      >
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[510px] h-[428px] top-[170px] sm:top-[212px]" />
      </Marquee>
      {/*<div className="fixed checkerboard w-[1200px] border-y-2 h-18 top-[812px] -rotate-9 px-[200px] border-2 border-red-700/30" />*/}
      {/*<div className="fixed w-30 checkerboard h-[512px] right-[525px] rotate-12 border-2 border-red-700/30" />*/}
      {/*<div className="fixed w-48 checkerboard h-screen right-[65px] rotate-4 border-2 border-red-700/30" />*/}
    </div>
  );
}
