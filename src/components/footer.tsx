import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      id={"contact"}
      className="w-screen border-t z-50 w-full justify-items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-10">
        <div className="border-r-2 pl-2 pr-4 h-full">
          <h3 className="hidden md:block pt-2 mt-0">will code for money</h3>
          <small className="text-center text-wrap break-all">
            Tri-Min Tram | minb2207541[at]student[dot]ctu.edu.vn
          </small>
        </div>
        <nav className="flex flex-row-reverse gap-x-4 text-xl md:text-3xl pt-2 pr-4 pb-4">
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
        </nav>
      </div>
    </footer>
  );
}
