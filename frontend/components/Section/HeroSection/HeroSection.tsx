"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LinkedInLogo,
  AsanaLogo,
  ToyotaLogo,
  ZoomLogo,
} from "../../thriving-talent-ui/company-logos";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-black transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              The intelligent way to build your talent pipeline.
            </h1>

            <p
              className={`max-w-md text-sm sm:text-base leading-relaxed text-gray-600 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Get matched with pre-vetted interns in under 2 hours. Focus on
              what matters while we handle the hiring heavy lifting.
            </p>

            <div
              className={`flex flex-wrap gap-3 sm:gap-4 transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Button className="rounded-md bg-blue-600 px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-base font-medium text-white transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl active:scale-95">
                Intern
              </Button>
              <Button className="rounded-md bg-red-600 px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-base font-medium text-white transition-all hover:scale-105 hover:bg-red-700 hover:shadow-xl active:scale-95">
                Employer
              </Button>
            </div>

            <div
              className={`flex flex-wrap gap-8 sm:gap-12 pt-4 transition-all duration-1000 delay-900 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <div className="text-3xl sm:text-4xl font-semibold text-black leading-none">
                  2943
                </div>
                <div className="text-xs sm:text-sm text-gray-500 leading-tight">
                  Companies
                  <br />
                  Joined
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl sm:text-4xl font-semibold text-black leading-none">
                  1M+
                </div>
                <div className="text-xs sm:text-sm text-gray-500 leading-tight">
                  Networked
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/professional-team-business-people.jpg"
                alt="Professional team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section with Seamless Infinite Scroll (Fixed Gap) */}
      <section className="bg-red-600 py-6 sm:py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-6 sm:mb-8 text-center text-xs sm:text-sm font-medium tracking-wider text-white">
            POWERING THE WORLD&apos;S BEST COMPANIES
          </p>

          <div className="relative">
            <style>{`
                .logo-track {
                display: flex;
                width: max-content;
                animation: scrollLoop 20s linear infinite;
                gap: 8rem; /* ensures spacing between repeated sets */
                }

                @media (max-width: 640px) {
                .logo-track {
                    gap: 4rem; /* smaller gap for mobile */
                }
                }

                @keyframes scrollLoop {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
                }

                .logo-track:hover {
                animation-play-state: paused;
                }
            `}</style>

            <div className="overflow-hidden">
              <div className="logo-track">
                {/* One logical set of logos */}
                <div className="flex gap-8 sm:gap-12 lg:gap-16">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <LinkedInLogo />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <AsanaLogo />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <ToyotaLogo />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <ZoomLogo />
                  </div>
                </div>

                {/* Repeated visually via CSS animation */}
                <div className="flex gap-8 sm:gap-12 lg:gap-16">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <LinkedInLogo />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <AsanaLogo />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <ToyotaLogo />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center h-12 sm:h-14">
                    <ZoomLogo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
