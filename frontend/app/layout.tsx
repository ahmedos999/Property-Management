import type { Metadata } from "next";
import { Inter, Rubik } from 'next/font/google'
import "./globals.css";
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
      <Navbar></Navbar>{children}</body>
    </html>
  );
}
