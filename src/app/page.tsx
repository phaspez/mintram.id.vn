import Image from "next/image";

export const metadata = {
    title: "mintram | inthemiddle",
    description: "very cool site here.",
    openGraph: {
        title: "mintram | inthemiddle",
        description: "very cool description here.",
        type: "website",
    },
};


export default function Home() {
    console.log("Looking at the source code i see:) ")

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="grid">
              <Image className="rounded-2xl justify-self-center" src="/img.png" alt="spike" width={400} height={400}/>
              <h1 className="text-2xl text-mono py-4 ">
                  min
                  <span className="text-gray-400">tram</span>
                  <span className="text-cyan-600">in</span>
                  <span className="text-emerald-700">the</span>
                  <span className="text-amber-600">middle</span>
              </h1>
              <p>I made this shit in like 10 minutes while I&apos;m commiting to other things.</p>
              <p>Cool things will be here in the future.</p>
              <p>Shall I make a blog, or port my web games here?</p>
              <p>Or not. I&apos;m lazy.</p>
          </div>
      </main>
    </div>
  );
}
