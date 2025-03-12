import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      id={"contact"}
      className="w-screen border-t z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container z-50 place-self-center w-full flex items-center justify-between gap-4 px-6 py-10">
        <div className="flex items-center flex-wrap grow gap-4 px-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="hidden md:block">will code for money</h3>
            </div>
            <span className="text-center self-center text-sm leading-loose">
              Tri-Min Tram | minb2207541 [at] student [dot] ctu.edu.vn
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 px-2 md:px-0">
          <div>
            <nav className="flex w-full flex-row-reverse items-center gap-4 text-xl md:text-3xl pt-2 pb-4">
              <Link href="https://www.linkedin.com/in/trimin-tram/">
                <FaLinkedin />
              </Link>
              <Link href="https://www.facebook.com/trimin.tram">
                <FaFacebook />
              </Link>
              <Link href="https://github.com/phaspez">
                <FaGithub />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
