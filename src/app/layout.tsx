import type { Metadata } from "next";
import { Inter, Poppins, Open_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Physiologist Consultation Platform",
  description:
    "Book reliable physiologist appointments with secure payments and screening.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${openSans.variable} ${sourceSans.variable}`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
