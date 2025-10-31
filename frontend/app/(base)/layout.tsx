import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import { Geist } from "next/font/google";

const _geist = Geist({ subsets: ["latin"] });

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className={`${_geist.className} px-6 sm:px-20`}>{children}</div>
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
