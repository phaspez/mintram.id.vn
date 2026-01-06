/* eslint-disable @next/next/no-img-element */
import Marquee from "react-fast-marquee";

export default function CoolSites() {
  return (
    <Marquee
      gradientColor="white"
      speed={40}
      pauseOnHover
      className="border-x-8 border-[#ffffe3] h-10 overflow-hidden py-0 "
    >
      <a href="https://dimden.dev/">
        <img src="https://dimden.dev/services/images/88x31.gif" alt="Dimden" />
      </a>
      <a href="https://melankorin.net/">
        <img
          src="https://melankorin.net/assets/img/buttons/button-1.gif"
          alt="Melankorin"
        />
      </a>
      <a href="https://frutigeraeroarchive.org/">
        <img
          src="https://frutigeraeroarchive.org/images/buttons/frutigeraeroarchive_button.png"
          alt="The Frutiger Aero Archive"
        />
      </a>
      <a href="https://ribo.zone/">
        <img src="https://ribo.zone/88x31/site/ribozone.gif" alt="Ribozone" />
      </a>
      <a href="https://nekoweb.org/">
        <img
          src="https://nekoweb.org/assets/buttons/button6.gif"
          alt="Nekoweb"
        />
      </a>
    </Marquee>
  );
}
