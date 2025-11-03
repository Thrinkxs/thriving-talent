import React, { useState } from "react";
import { motion, easeInOut, easeOut } from "framer-motion";

import "./HamburgerNav.css";
import Link from "next/link";
import Image from "next/image";
import thrivingTalentLogo from "@/public/thrivingTalentLogo.png";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOBILE_NAV_ITEMS = [
  {
    id: 0,
    navTitle: "Jobs",
    navHref: "/jobs",
  },
  {
    id: 1,
    navTitle: "companies",
    navHref: "/companies",
  },
  {
    id: 2,
    navTitle: "About",
    navHref: "/about",
  },
  {
    id: 3,
    navTitle: "Contact",
    navHref: "/contact",
  },
];

interface HamburgerNavProps {
  showBackground: boolean;
}

const HamburgerNav = ({ showBackground }: HamburgerNavProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const hideNavItemsVariant = {
    opened: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: easeInOut,
      },
    },
    closed: {
      opacity: 1,
      y: "0%",
      transition: {
        delay: 1.1,
        duration: 0.5,
        ease: easeInOut,
      },
    },
  };

  const mobileMenuVariant = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: [0.74, 0, 0.19, 1.02] as [number, number, number, number],
      },
    },
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02] as [number, number, number, number],
      },
    },
  };

  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 1.2,
      },
    },
    closed: { opacity: 0 },
  };

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  const liVariant = {
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.65,
        ease: easeOut,
      },
    },
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.25,
        ease: easeInOut,
      },
    },
  };

  const fadeInStart = { opacity: 0 };
  const fadeInEnd = { opacity: 1 };
  const fadeInTransition = { duration: 1 };

  return (
    <main className="container">
      <motion.nav
        initial="closed"
        animate={mobileNavOpen ? "opened" : "closed"}
        className="hamburger-nav"
      >
        <div className="logo-container">
          <motion.div
            variants={hideNavItemsVariant}
            className=" cursor-pointer "
          >
            <Link href="/" className="flex">
              <Image
                src={thrivingTalentLogo}
                alt="ThrivingTalent Logo"
                width={100}
              />
            </Link>
          </motion.div>
        </div>
        <div className="menu-container">
          <motion.div
            variants={hideNavItemsVariant}
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu
              size={35}
              className="mt-2"
              style={{ color: showBackground ? "white" : "black" }}
            />
          </motion.div>
        </div>
        <motion.div variants={mobileMenuVariant} className="mobile-menu">
          <div className="mobile-nav-header">
            <div className="swiftbooked-logo">
              <Link href="/" className="flex">
                <Image
                  src={thrivingTalentLogo}
                  alt="ThrivingTalent Logo"
                  width={100}
                />
              </Link>
            </div>

            <motion.button
              variants={fadeInVariant}
              onClick={() => setMobileNavOpen(false)}
              className="close-button text-2xl text-white"
            >
              <X />
            </motion.button>
          </div>

          <motion.ul variants={ulVariant}>
            {MOBILE_NAV_ITEMS.map((navItem) => (
              <Link href={navItem.navHref} key={navItem.id}>
                <motion.li
                  whileTap={{ scale: 0.95 }}
                  key={navItem.id}
                  className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300"
                >
                  <motion.div
                    variants={liVariant}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {navItem.navTitle}
                  </motion.div>
                </motion.li>
              </Link>
            ))}
          </motion.ul>
          <motion.div variants={fadeInVariant} className="login-btn">
            <Link href="/login">
              <Button className="rounded text-white bg-thrive-blue px-10 py-2 hover:bg-thrive-blue/80 cursor-pointer">
                Login
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.nav>

      <motion.div
        initial={fadeInStart}
        animate={fadeInEnd}
        transition={fadeInTransition}
        className="img-container"
      ></motion.div>
    </main>
  );
};

export default HamburgerNav;
