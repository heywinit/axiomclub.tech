import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Axiom",
  description: "Design. Code. Create.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSans.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
