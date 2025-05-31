import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";

export default function NavBar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-950/80 not-prose">
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
        <nav className="hidden flex items-center space-x-6 md:flex">
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
          >
            Blog
          </Link>
          <Link
            href="/project"
            className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Project
          </Link>
          <Link
            href="https://phaspez.itch.io"
            className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
          >
            Game
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Hire me plz
          </Link>
          <ThemeToggle />
        </nav>
        <nav className="flex items-center space-x-6 md:hidden not-prose">
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
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/project"
                  aria-label="project"
                  className="not-prose"
                >
                  Project
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="https://phaspez.itch.io"
                  aria-label="game"
                  className="not-prose"
                >
                  Game
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="#contact"
                  aria-label="hire me please"
                  className="not-prose"
                >
                  Hire me plz
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
