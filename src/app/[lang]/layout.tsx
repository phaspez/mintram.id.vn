//import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";

import { langOption } from "./dictionaries";

// const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: langOption };
}) {
  const { lang } = await params;
  return (
    <>
      {/*<NavBar lang={lang} />*/}
      <div className="w-screen items-center px-4 md:px-10 lg:px-24 xl:px-32 mt-20">
        {children}
      </div>
    </>
  );
}
