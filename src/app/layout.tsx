import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrains.className} w-screen antialiased prose dark:prose-invert overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <ThemeToggle />
          <NavBar />
          <div className="w-screen items-center min-h-screen px-4 md:px-10 lg:px-24 xl:px-32 mt-20">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
