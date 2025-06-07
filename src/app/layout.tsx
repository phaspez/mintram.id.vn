import Footer from "@/components/footer";
//import NavBar from "@/components/navbar";
//import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

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
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrains.className} w-screen antialiased prose dark:prose-invert overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
