import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "../styles/theme.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axiom Club",
  description:
    "Join Axiom Club at Sardar Vallabhbhai Global University - Where innovation meets excellence. Design. Code. Create. Explore our tech projects and join our community of passionate developers.",
  keywords: [
    "Axiom Club",
    "SVGU",
    "Tech Club",
    "Coding",
    "Design",
    "Development",
    "Student Tech Community",
    "Sardar Vallabhbhai Global University",
  ],
  authors: [{ name: "Axiom Club" }],
  openGraph: {
    title: "Axiom Club",
    description:
      "Join Axiom Club at Sardar Vallabhbhai Global University - Where innovation meets excellence. Design. Code. Create.",
    type: "website",
    locale: "en_US",
    siteName: "Axiom Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiom Club",
    description:
      "Join Axiom Club at Sardar Vallabhbhai Global University - Where innovation meets excellence. Design. Code. Create.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "var(--matrix-color)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSans.className} antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
