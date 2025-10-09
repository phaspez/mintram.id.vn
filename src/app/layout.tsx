import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrains.className} dark w-screen prose overflow-x-hidden`}
      >
        <div className="w-screen dark:prose-invert items-center px-4 md:px-10 lg:px-24 xl:px-32 mt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
