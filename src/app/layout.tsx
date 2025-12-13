import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Open_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalScroll from "@/components/GlobalScroll";
import "@/lib/gsapInit"; // Initialize GSAP globally

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1c4966",
};

export const metadata: Metadata = {
  title: "Relicus - Online Therapy & Mental Health Support",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${openSans.variable} ${sourceSans.variable}`}
      >
        <SessionProvider>
          <GlobalScroll>
            <Header />
            <div className="pt-[120px] md:pt-[100px] lg:pt-[85px]">
              {children}
            </div>
            <Footer />
          </GlobalScroll>
        </SessionProvider>
      </body>
    </html>
  );
}
