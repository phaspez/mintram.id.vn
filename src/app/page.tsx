import Image from "next/image";
import Secrets from "@/components/secrets";

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
  return (
    <>
      <Secrets />
      <div className="w-full items-center justify-items-center min-h-screen gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="grid">
            <Image
              className="rounded-2xl justify-self-center"
              src="/img.png"
              alt="spike"
              width={400}
              height={400}
            />
            <h1 className="text-2xl text-mono py-4 ">
              min
              <span className="text-gray-400">tram</span>
              <span className="text-cyan-600">in</span>
              <span className="text-emerald-700">the</span>
              <span className="text-amber-600">middle</span>
            </h1>
            <p>hi.</p>
            <p>i make things. with code.</p>
          </div>
        </main>
      </div>
    </>
  );
}
