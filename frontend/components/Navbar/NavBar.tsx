/**
 * Contains the navbar at the top of the page (used in landing page only).
 */
"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import Image from "next/image";
import thrivingTalentLogo from "@/public/thrivingTalentLogo.png";
import HamburgerNav from "./HamburgerNav/HamburgerNav";
import NavMenu from "./NavMenu/NavMenu";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [showBackground, setShowBackground] = useState(false);
  const TOP_OFFSET = 50;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="px-4 sm:px-6 md:px-20 md:pr-10 bg-white sticky top-0 z-50 py-10"
      style={{ backgroundColor: showBackground ? "#040024" : "white" }}
    >
      <nav className="hidden md:flex md:flex-row justify-between items-center">
        <div className=" cursor-pointer ">
          {/* <Logo /> */}

          <Link href="/" className="flex">
            <Image
              src={thrivingTalentLogo}
              alt="ThrivingTalent Logo"
              width={100}
            />
            {/* <span
              className="mt-3 font-bold"
              style={{ color: showBackground ? "white" : "black" }}
            >
              Swiftbooked
            </span> */}
          </Link>
        </div>
        <div className="md:flex md:flex-row md:justify-center md:items-center">
          <ul
            className="md:flex md:gap-5 "
            style={{ color: showBackground ? "white" : "black" }}
          >
            <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-thrive-blue duration-300 mx-1.5 sm:mx-6">
              <Link href="/">Jobs</Link>
            </li>
            {/* <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-thrive-blue duration-300 mx-1.5 sm:mx-6">
              <NavMenu showBackground={showBackground} />
            </li> */}
            <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-thrive-blue duration-300 mx-1.5 sm:mx-6">
              <Link href="/">Companies</Link>
            </li>
            <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-thrive-blue duration-300 mx-1.5 sm:mx-6">
              <Link href="/">About</Link>
            </li>
            <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-thrive-blue duration-300 mx-1.5 sm:mx-6">
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="py-4">
          <Link href="/login">
            <Button className="bg-thrive-blue hover:bg-thrive-blue/80 px-20 py-20 cursor-pointer">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      <div className="md:hidden">
        <HamburgerNav showBackground={showBackground} />
      </div>
    </div>
  );
};

export default NavBar;
