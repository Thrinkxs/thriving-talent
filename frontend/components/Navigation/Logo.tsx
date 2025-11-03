import Link from "next/link";
import React from "react";
import Image from "next/image";

import thrivingTalentLogo from "@/public/thrivingTalentLogo.png";

type ThrivingTalentLogo = {
  imageLogoWidth?: number;
};

const Logo = ({ imageLogoWidth }: ThrivingTalentLogo) => {
  return (
    <div>
      <div>
        <Link href="/" className="flex ">
          <Image
            src={thrivingTalentLogo}
            alt="Thriving Talent logo"
            width={imageLogoWidth || 50}
            className="cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
