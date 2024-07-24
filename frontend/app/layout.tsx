import type { Metadata } from "next";
import { Inter, Rubik } from 'next/font/google'
import "./globals.css";
import Navbar from "./components/Navbar";
import PropertyContextProvider from "./context/propertycontext";
import LeadContextProvider from "./context/leadcontext";

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
      <LeadContextProvider>
      <PropertyContextProvider>
      <body className={rubik.className}>
      <Navbar></Navbar>{children}</body>
      </PropertyContextProvider>
      </LeadContextProvider>
    </html>
  );
}
