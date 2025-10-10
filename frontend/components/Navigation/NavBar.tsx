/**
 * Contains the navbar at the top of the page (used in landing page only).
 */
"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import Image from "next/image";
import thrivingTalentLogo from "@/public/thrivingTalentLogo.png";
// import HamburgerNav from "./ThrivingTalentNav/HamburgerNav";
// import NavMenu from "./ThrivingTalentNav/NavMenu";

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
      className="px-4 sm:px-6 md:pr-10 bg-white sticky top-0 z-50"
      style={{ backgroundColor: showBackground ? "#040024" : "white" }}
    >
      <nav className="hidden md:flex md:flex-row justify-between items-center  ">
        <div className=" cursor-pointer ">
          {/* <Logo /> */}

          <Link href="/" className="flex">
              <Image src={thrivingTalentLogo} alt="Thriving Talent logo" width={50} />
            <span
              className="mt-3 font-bold"
              style={{ color: showBackground ? "white" : "black" }}
            >
              Thriving Talent
            </span>
          </Link>
        </div>
        <div className="md:flex md:flex-row md:justify-center md:items-center">
          <ul
            className="md:flex md:gap-5 "
            style={{ color: showBackground ? "white" : "black" }}
          >
            <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300 mx-1.5 sm:mx-6">
              <Link href="/pricing">Pricing</Link>
            </li>
            {/* <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300 mx-1.5 sm:mx-6">
              <NavMenu showBackground={showBackground} />
            </li> */}
            <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300 mx-1.5 sm:mx-6">
              <Link href="/customers">Customers</Link>
            </li>
          </ul>
        </div>
        {/* <div className="py-4">
          <RoundedThrivingTalentButton text="Log in" path="/signin" />
        </div> */}
      </nav>

      {/* <div className="md:hidden">
        <HamburgerNav showBackground={showBackground} />
      </div> */}
    </div>
  );
};

export default NavBar;
