"use client";

import { useNavbar } from "@/contexts/NavbarContext";
import Navbar from "./Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPowered } = useNavbar();

  return (
    <>
      <Navbar />
      <main className={isPowered ? "lg:pl-32" : ""}>{children}</main>
    </>
  );
}
