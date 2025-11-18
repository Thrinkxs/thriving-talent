import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer/Footer";
import { Geist } from "next/font/google";
import Logo from "@/components/Navigation/Logo";

const _geist = Geist({ subsets: ["latin"] });

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`${_geist.className} relative`}>
        <div className="absolute left-5 top-5">
          <Logo imageLogoWidth={100} />
        </div>
        {children}
      </div>
      <Footer />
      <Analytics />
    </>
  );
}
