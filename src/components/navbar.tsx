import Link from "next/link";
import { SVGProps } from "react";
import {ThemeToggle} from "@/components/theme-toggle";

export default function NavBar() {
    return (
        <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-950/80">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <span className="text-lg font-bold">
                                          min
                  <span className="text-gray-400">tram</span>
                  <span className="text-cyan-600">in</span>
                  <span className="text-emerald-700">the</span>
                  <span className="text-amber-600">middle</span>

                    </span>
                </Link>
                <nav className="hidden flex items-center space-x-6 md:flex">
                    <Link href="/blog" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
                        Blog
                    </Link>
                    {/*<Link href="#" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>*/}
                    {/*    Projects*/}
                    {/*</Link>*/}
                    {/*<Link href="#" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>*/}
                    {/*    Games*/}
                    {/*</Link>*/}
                    {/*<Link href="#" className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>*/}
                    {/*    About*/}
                    {/*</Link>*/}
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}