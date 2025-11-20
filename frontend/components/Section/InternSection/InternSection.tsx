"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import phoneFrame from "@/public/phone.png";
import { Button } from "@/components/ui/button";

export function InternsSection() {
  const [, setIsHovered] = useState<boolean>(false);

  return (
    <section className="w-full bg-white flex justify-center items-center">
      <div
        className="relative overflow-hidden rounded-[30px] flex items-center justify-between px-4 sm:px-8 md:px-12 transition-all duration-300"
        style={{
          background: "linear-gradient(180deg, #323284 0%, #0B0B1E 100%)",
          width: "100%",
          maxWidth: "1190px",
          height: "450px",
        }}
      >
        {/* Left Content */}
        <div className="z-10 flex flex-col justify-center text-white max-w-md space-y-3 sm:space-y-4 scale-90 sm:scale-100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Get hired fast as an intern
          </h2>

          {/* Tiny white line divider */}
          <div className="h-[1px] bg-white w-full max-w-md opacity-70"></div>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 leading-relaxed">
            Upload your CV to instantly get noticed by companies and connect
            with employers to secure your internship in under 2 hours.
          </p>
          <div className="mt-20">
            <Link
              href="/intern/signup"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className=""
            >
              <Button asChild className="rounded cursor-pointer inline-flex items-center justify-center px-10 py-2 bg-thrive-blue hover:bg-thrive-blue/80 text-white text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 w-fit">
                Start using Thriving Talents
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden relative w-[180px] sm:w-[240px] md:w-[300px] md:flex justify-center items-end">
          <Image
            src={phoneFrame}
            alt="Phone mockup showing upload interface"
            width={500}
            height={600}
            className="object-contain translate-y-5 sm:translate-y-6 md:translate-y-8"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
