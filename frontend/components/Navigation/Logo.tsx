import Link from "next/link";
import React from "react";
import Image from "next/image";

import thrivingTalentLogo from "@/public/thrivingTalentLogo.png";

type ThrivingTalentLogo = {
  backgroundColor: string;
  textColor: string;
  textSize?: string;
  imageLogoWidth?: number;
};

const Logo = ({
  backgroundColor,
  textColor,
  imageLogoWidth,
  textSize,
}: ThrivingTalentLogo) => {
  return (
    <div>
      <div className={`${backgroundColor}`}>
        {/* <Logo /> */}

        <Link href="/" className="flex ">
          <Image
            src={thrivingTalentLogo}
            alt="Thriving Talent logo"
            width={imageLogoWidth || 50}
            className="cursor-pointer"
          />
          <span className={`mt-3 font-bold ${textSize} ${textColor}`}>
            Thriving Talent
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
