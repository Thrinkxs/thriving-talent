/**
 * The footer (used only in the landing page).
 */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import arrowRight from "@/public/arrow-right.svg";
import mail from "@/public/mail.svg";

const Footer = () => {

  return (
    <footer className="bg-deep-purple pt-20 rounded-t-[30px] sm:rounded-t-[4em] text-white text-xs sm:text-sm">
      <div className="flex justify-center">
        <h1 className="text-3xl sm:text-6xl lg:text-8xl text-btn tracking-[0.2em] font-medium">
          Thriving Talent
        </h1>
      </div>
      <div className="pt-20">
        <div className="flex justify-between flex-wrap px-12">
          <div>
            <ul className="flex justify-evenly gap-10">
              <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                <Link href="/pricing">Pricing</Link>
              </li>
              <ul>
                <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                  Resources
                </li>
                <li className="mt-4 transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="mt-4 transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                  <Link href="/contact">Contact Support</Link>
                </li>
                <li className="mt-4 transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                  <Link href="/about-us">About Us</Link>
                </li>
              </ul>

            </ul>
          </div>
          <div className="max-[558px]:mt-10">
            <ul className="text-gray-300 flex flex-col gap-2 font-thin">
              <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                <Link
                  className="flex gap-5 "
                  href="mailto:hello@thrivingtalent.com"
                >
                  <Image src={mail} alt="arrow right" />
                  hello@thrivingtalent.com
                </Link>
              </li>
              <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                <Link
                  target="_blank"
                  href="https://www.instagram.com/thrivingtalent"
                  className="flex gap-5 mt-4 "
                >
                  <Image src={arrowRight} alt="arrow right" />
                  <p>Instagram</p>
                </Link>
              </li>
              <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                <Link
                  target="_blank"
                  className="flex gap-5  mt-4"
                  href="https://www.tiktok.com/@thrivingtalent"
                >
                  <Image src={arrowRight} alt="arrow right" />
                  TikTok
                </Link>
              </li>
              <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                <Link
                  target="_blank"
                  className="flex gap-5  mt-4"
                  href="https://www.linkedin.com/company/thrivingtalent"
                >
                  <Image src={arrowRight} alt="arrow right" />
                  LinkedIn
                </Link>
              </li>
              {/* <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                <Link className="flex gap-5  mt-4" href="/">
                  <Image src={arrowRight} alt="arrow right" />
                  YouTube
                </Link>
              </li>
              <li className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300">
                <Link className="flex gap-5  mt-4" href="/">
                  <Image src={arrowRight} alt="arrow right" />X
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <hr className="w-[1170px]" />
      </div>
      <div className="flex justify-between items-center px-12 py-10">
        <div>
          <h3 className="text-xs sm:text-base">
            Copyright &copy; {new Date().getFullYear()} Thriving Talent. All rights
            reserved.
          </h3>
        </div>

        <div className="flex gap-4 text-xs sm:text-base">
          <Link
              href="/privacy-policy"
            className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300"
          >
            Privacy policy
          </Link>
          <Link
            href="/terms-of-service"
            className="transition ease-in-out delay-150 hover:-translate-x-1 hover:text-btn duration-300"
          >
            Terms of service
          </Link>
        </div>
      </div>{" "}
    </footer>
  );
};

export default Footer;
