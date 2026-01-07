import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import BlogDecor from "@/components/blog-decor";

export default async function Page() {
  return (
    <div>
      <BlogDecor />
      <Link href={"/"} className="span-icon-text">
        <Home />
        <span>
          Hom<span className="text-gray-400/40">[</span>e
          <span className="text-gray-400/40">]</span>
        </span>
      </Link>

      <h1 className="text-3xl font-bold decorative-text">
        <span className="sm:hidden">prjcts</span>
        <span className="hidden sm:inline">projects</span>
      </h1>

      <div className="grid gap-4">
        <article className="lg:columns-2 columns-1 bg-orange-100 dark:bg-orange-600/20 p-4 rounded-md">
          <div>
            <h2 className="mt-2">
              CAAS - Chat-Voice Admissions Advisory Support
            </h2>
            <Link href="https://caas.mintram.id.vn">caas.mintram.id.vn</Link>
            <p>
              A chatbot application where you can ask for admission details from
              a college institution.
            </p>
            <p>
              e There would be a backend for training models and a database of
              FAQ from the institution. But it isn&apos;t deployed yet, for now,
              it forwarded all questions to an LLM.
            </p>
            <p>
              Front-end → CAAS system (return related information) → forward it
              to Gemini
            </p>
          </div>
          <div className="flex justify-center items-center h-full">
            <Image
              src="/project/caas.png"
              width={600}
              height={300}
              alt="CAAS home page"
              className="rounded-md"
            />
          </div>
        </article>

        <article className="lg:columns-2 lg:flex-row-reverse columns-1 bg-indigo-200 dark:bg-indigo-500/20 p-4 rounded-md">
          <div className="flex justify-center items-center h-full">
            <Image
              src="/project/terraship.png"
              width={700}
              height={500}
              alt="Terraship menu"
              className="rounded-md"
            />
          </div>
          <div className="grid gap-2 content-center">
            <h2 className="mt-2">Terraship</h2>
            <Link href="https://phaspez.itch.io/terraship">
              phaspez.itch.io/terraship
            </Link>
            <p>
              A hardcore space shooter game with some rogue-like twists, destroy
              rocks and enemies coming toward you to earn points, with a
              campaign-based gameplay. Each level is procedurally generated with
              increasing difficulty.
            </p>
            <p>
              There&apos;s an online leaderboard, multi-platform support
              (Web/Android/Windows), and localization support, too.
            </p>
            <p>
              Probably my most feature completed game so far. Making games is so
              exhausting!
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
