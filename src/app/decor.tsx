"use client";

import Marquee from "react-fast-marquee";
import React, { useEffect, useState } from "react";
import "./decor.css";

function randomGlyph() {
  const glyphs =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}<>/\\|~`+=-";
  return glyphs.charAt(Math.floor(Math.random() * glyphs.length));
}

function GlitchText({ text, className }: { text: string; className?: string }) {
  const chars = Array.from(text);
  const [display, setDisplay] = useState<string[]>(chars);
  const [mounted, setMounted] = useState(false);

  const delays = chars.map((_, i) => `${(i * 0.15) % 2}s`);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const i = Math.floor(Math.random() * chars.length);
      const rand = randomGlyph();
      setDisplay((prev) => {
        const next = prev.slice();
        next[i] = rand;
        return next;
      });
      const restore = setTimeout(
        () => {
          setDisplay((prev) => {
            const next = prev.slice();
            next[i] = chars[i];
            return next;
          });
        },
        60 + Math.random() * 220,
      );
      return () => clearTimeout(restore);
    }, 800);
    return () => clearInterval(interval);
  }, [text]);

  if (!mounted) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className ?? "glitch"} aria-hidden>
      {display.map((c, i) => (
        <span
          key={i}
          className="glitch-letter"
          data-char={c}
          style={{ animationDelay: delays[i] }}
          aria-hidden
        >
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Decor() {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen -z-50 select-none"
      aria-hidden
      role="presentation"
    >
      <div className="text-[22.25rem] fixed text-outline-blue -rotate-6">
        <GlitchText text="Phaspez" />
      </div>
      <div className="text-[12.25rem] fixed text-outline-green -rotate-6">
        <GlitchText text="パスペス" />
      </div>
      <div className="text-[22.25rem] fixed text-outline-blue right-[64px] bottom-[156px] rotate-12">
        <GlitchText text="MinTram" />
      </div>
      <div className="text-[12.25rem] fixed text-outline-green top-[612px] -rotate-6">
        <GlitchText text="トリミン" />
      </div>
      <div className="fixed bg-container dark:bg-container-dark" />
      <div className="fixed dotted lg:w-[716px] md:w-[384px] w-[256px] h-screen left-[12px] md:left-[64px] lg:left-[128px]" />
      <Marquee
        speed={10}
        className="fixed w-screen h-[428px] top-[170px] sm:top-[212px]"
      >
        <div className="strip w-[512px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[512px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[512px] h-[428px] top-[170px] sm:top-[212px]" />
        <div className="strip w-[512px] h-[428px] top-[170px] sm:top-[212px]" />
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
          I make websites, games and software | Hobby: Anime, Investments,
          Reading, Drawing | I like learning new technologies | Quá ghê gớm |
          Lorem Ipsum |
        </Marquee>
      </div>
      <div className="fixed checkerboard w-[1200px] border-y-2 h-18 top-[812px] -rotate-9 px-[200px] border-2 border-red-700/30" />
      {/*<div className="fixed w-screen border-y-2 h-18 top-[652px] -rotate-9 px-[200px]" />*/}
      <div className="fixed w-30 checkerboard h-[512px] right-[525px] rotate-12 border-2 border-red-700/30" />
      <div className="fixed w-48 checkerboard h-screen right-[65px] rotate-4 border-2 border-red-700/30" />
    </div>
  );
}
