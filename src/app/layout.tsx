import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });
import localFont from "next/font/local";
import "./globals.css";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myFont = localFont({
  src: "./../../public/AlphatronDemo-Display.otf", // path relative to this file
  variable: "--font-alphatron", // optional for CSS variable
  weight: "400", // optional
  style: "normal", // optional
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrains.className} ${myFont.variable} prose prose-dark max-w-none dark w-screen overflow-x-hidden`}
      >
        <KeyboardShortcuts />
        <div className="w-screen items-center px-4 md:px-6 lg:px-8 xl:px-12 mt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
