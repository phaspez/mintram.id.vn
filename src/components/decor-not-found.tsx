import Marquee from "react-fast-marquee";
import "@/app/decor.css";

export default function DecorNotFound() {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen -z-50 select-none"
      aria-hidden
      role="presentation"
    >
      <div className="fixed checkerboard w-screen h-[328px] top-[370px]" />
      <div className="fixed w-[2048px] bottom-[128px] left-[-64px] -rotate-12">
        <Marquee
          speed={20}
          className="fixed text-bold text-xl text-gray-600/30 dark:text-gray-400/30"
        >
          <h1 className="oversize pl-16">404</h1>
          <h1 className="oversize pl-16">404</h1>
          <h1 className="oversize pl-16">404</h1>
          <h1 className="oversize pl-16">404</h1>
          <h1 className="oversize pl-16">404</h1>
          <h1 className="oversize pl-16">404</h1>
        </Marquee>
      </div>

      <div className="fixed w-[2048px] bottom-[128px] left-[-64px] rotate-4">
        <Marquee
          speed={12}
          direction={"right"}
          className="fixed text-bold text-xl text-gray-600/30 dark:text-gray-400/30"
        >
          <h1 className="oversize-2 pl-8">found not</h1>
          <h1 className="oversize-2 pl-8">found not</h1>
          <h1 className="oversize-2 pl-8">found not</h1>
          <h1 className="oversize-2 pl-8">found not</h1>
        </Marquee>
      </div>
    </div>
  );
}
