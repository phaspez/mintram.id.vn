import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id={"contact"}
      className="w-screen border-t z-50 w-full justify-items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex max-w-7xl items-center break-all justify-between px-4 md:px-6 py-10">
        <div className="border-r-2 pl-2 pr-4 h-full">
          <h3 className="hidden md:block pt-2 mt-0">will code for food</h3>
          <small className="text-center text-wrap break-all">
            Tri-Min Tram
          </small>
        </div>
        <nav className="flex flex-row-reverse gap-x-4 text-xl md:text-3xl pl-2 pr-4 items-stretch">
          <Link
            href="https://www.linkedin.com/in/trimin-tram/"
            aria-label="linkedin"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://www.facebook.com/trimin.tram"
            aria-label="facebook"
          >
            <FaFacebook />
          </Link>
          <Link href="https://github.com/phaspez" aria-label="github">
            <FaGithub />
          </Link>
          <small className="flex items-center gap-2 text-sm">
            <Mail /> hello@mintram.id.vn
          </small>
        </nav>
      </div>
    </footer>
  );
}
