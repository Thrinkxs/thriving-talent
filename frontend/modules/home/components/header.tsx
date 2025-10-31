"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className={`flex-shrink-0 transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <a href="/" className="flex flex-col">
              <Image
                src="/thriving talent logo.png"
                alt="Thriving Talents Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Navigation - Hidden on mobile, visible on md and up */}
          <nav
            className={`hidden md:flex items-center gap-6 lg:gap-8 transition-all duration-700 delay-100 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <a
              href="/"
              className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
            >
              Jobs
            </a>
            <a
              href="/"
              className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
            >
              Companies nnk
            </a>
            <a
              href="/"
              className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
            >
              About
            </a>
            <a
              href="/"
              className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600"
            >
              Contact
            </a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div
            className={`flex items-center gap-2 sm:gap-3 transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <Link
              href="/login"
              className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 px-3 py-2"
            >
              Sign in
            </Link>
            <Button className="rounded-md bg-blue-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95">
              Create free account
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-3 py-4">
              <a
                href="/"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 px-3 py-2"
              >
                Jobs
              </a>
              <a
                href="/"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 px-3 py-2"
              >
                Companies
              </a>
              <a
                href="/"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 px-3 py-2"
              >
                About
              </a>
              <a
                href="/"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 px-3 py-2"
              >
                Contact
              </a>
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 px-3 py-2"
              >
                Sign in
              </Link>
              <Button className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 active:scale-95">
                Create free account
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
