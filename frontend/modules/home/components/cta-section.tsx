"use client"

import Link from "next/link"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="w-full px-4 py-10 bg-white flex justify-center">
      <div
        className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 rounded-[40px] flex items-center justify-between px-10 md:px-16"
        style={{
          width: "1190px",
          height: "450px",
        }}
      >
        {/* Left Content */}
        <div className="z-10 flex flex-col justify-center max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Try it for free
          </h2>

          <p className="text-sm md:text-base text-red-100 mb-5 leading-relaxed">
            Get started with Thriving Talents today and recruit top talents in just 2 hours. No credit card required.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 w-fit"
          >
            Start for free
          </Link>
        </div>

        {/* Right Image — Inside but Slightly Cropped */}
        <div className="relative w-[400px] h-[400px] flex justify-end items-end">
          <Image
            src="/woman1.png"
            alt="Woman in magenta"
            width={400}
            height={400}
            className="object-cover translate-y-10"
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
  )
}
