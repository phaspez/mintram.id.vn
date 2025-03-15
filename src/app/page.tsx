import Image from "next/image";
import Secrets from "@/components/secrets";
import { lazy } from "react";
import Marquee from "react-fast-marquee";

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

export default function Home() {
  return (
    <>
      <Secrets />
      <div className="w-full items-center justify-items-center min-h-screen gap-16 sm:p-20 pt-10">
        <Decor />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="grid self-center text-wrap max-w-[512px]">
            <Image
              className="rounded-2xl justify-self-center"
              src="/img.png"
              alt="spike"
              width={400}
              height={400}
              priority
            />
            <h1 className="text-2xl text-mono py-4 border-b-3 border-black/30 dark:border-white/70">
              min
              <span className="text-violet-600">tram</span>
              <span className="text-cyan-600">in</span>
              <span className="text-emerald-700">the</span>
              <span className="text-amber-600">middle</span>
            </h1>
            <article>
              <p>hi. i&apos;m trimin.</p>
              <p>
                a mediocre person, with a PhD on Google search and enslaving
                LLMs with weird questions.
              </p>
              <p>i like to build things. with code.</p>
              <p>feel free to dig around and see what you&apos;d like.</p>
            </article>
            <article>
              <p>things i know</p>
              <Marquee
                speed={20}
                className="border-x-6 border-gray-600 dark:border-gray-400 text-bold text-xl text-gray-600 dark:text-gray-400"
              >
                React | React Native | Next.js | Tailwind CSS | JS | TS |
                Node.js | Express | Vue | Python | FastAPI | Nest.js |
                PostgreSQL | MongoDB | Kubernetes | Git |
              </Marquee>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
