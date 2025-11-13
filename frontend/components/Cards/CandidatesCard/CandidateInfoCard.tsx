import Image from "next/image";
import React from "react";
import japaneseWoman from "@/public/test.png";
import { Button } from "@/components/ui/button";

import {
  IconCake,
  IconGenderAndrogyne,
  IconMapPins,
  IconPhoneFilled,
} from "@tabler/icons-react";

const CandidateInfoCard = () => {
  return (
    <div className="bg-white p-6 rounded-3xl w-80">
      <div className="justify-self-center">
        <Image
          src={japaneseWoman}
          alt="candidate"
          width={200}
          height={200}
          className="rounded-full w-20 h-20"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <h4 className="font-bold">Janet Green</h4>
      </div>
      <div className="mt-1 flex justify-center">
        <p className="text-gray-400 text-sm">janetgreen@gmail.com</p>
      </div>
      <div className="mt-8 flex justify-center">
        <Button className="bg-thrive-blue hover:bg-thrive-blue/80 text-white rounded-3xl">
          Schedule Interview
        </Button>
      </div>
      <hr className="mt-4 text-gray-400" />
      <div className="mt-2">
        <h5 className="font-bold">Personal Info</h5>
        {/* Badge 1 */}
        <div className="mt-5 flex gap-5">
          <div className="bg-thrive-badge-background rounded-md p-3 inline-flex items-center justify-center">
            <IconGenderAndrogyne size={20} color="black" stroke={2} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-normal">Gender</p>
            <p className="font-semibold text-sm">Female</p>
          </div>
        </div>
        {/* Badge 2 */}
        <div className="mt-5 flex gap-5">
          <div className="bg-thrive-badge-background rounded-md p-3 inline-flex items-center justify-center">
            <IconCake size={20} color="black" stroke={2} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-normal">Birthday</p>
            <p className="font-semibold text-sm">May 17 1996</p>
          </div>
        </div>
        {/* Badge 3 */}
        <div className="mt-5 flex gap-5">
          <div className="bg-thrive-badge-background rounded-md p-3 inline-flex items-center justify-center">
            <IconPhoneFilled size={20} color="black" stroke={2} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-normal">Phone Number</p>
            <p className="font-semibold text-sm">111111111111</p>
          </div>
        </div>
        {/* Badge 4 */}
        <div className="mt-5 flex gap-5">
          <div className="bg-thrive-badge-background rounded-md p-3 inline-flex items-center justify-center">
            <IconMapPins size={20} color="black" stroke={2} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-normal">Address</p>
            <p className="font-semibold text-sm">Tokyo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfoCard;
