import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";
import { LanguageSwitcher } from "./language-switcher";
import { getDictionary, langOption } from "@/app/[lang]/dictionaries";

export default async function NavBar({ lang }: { lang: langOption }) {
  const dictionary = await getDictionary(lang);

  return (
    <header className="fixed top-0 mt-2 z-50 w-3/4 rounded-xl left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm shadow-md dark:bg-gray-950/80 border-2  not-prose">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 kill">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="text-lg font-bold">
            min
            <span className="text-violet-600">tram</span>
            <span className="text-cyan-600 hidden md:inline-flex">in</span>
            <span className="text-emerald-700 hidden lg:inline-flex">the</span>
            <span className="text-amber-600 hidden sm:inline-flex">middle</span>
          </span>
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          <Link
            href="/blog"
            className="px-4 text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
          >
            {dictionary.navbar.blog}
          </Link>
          <Link
            href="/project"
            className="px-4 text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            {dictionary.navbar.project}
          </Link>
          <Link
            href="https://phaspez.itch.io"
            className="px-4 text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
          >
            {dictionary.navbar.game}
          </Link>
          <Link
            href="#contact"
            className="px-4 text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            {dictionary.navbar.hire}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher langProp={lang} />
        </nav>
        <nav className="flex items-center space-x-2 md:hidden not-prose">
          <DropdownMenu>
            <DropdownMenuTrigger
              title="Navigation"
              aria-label="navigation"
              aria-labelledby="navigation"
              className="p-2 border-1 rounded-md hover:bg-gray-300/40 transition-all"
            >
              <IoMdMenu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/blog" aria-label="blog" className="not-prose">
                  {dictionary.navbar.blog}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/project"
                  aria-label="project"
                  className="not-prose"
                >
                  {dictionary.navbar.project}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="https://phaspez.itch.io"
                  aria-label="game"
                  className="not-prose"
                >
                  {dictionary.navbar.game}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="#contact"
                  aria-label="hire me please"
                  className="not-prose"
                >
                  {dictionary.navbar.hire}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          <LanguageSwitcher langProp={lang} />
        </nav>
      </div>
    </header>
  );
}
