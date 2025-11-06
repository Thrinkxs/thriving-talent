import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  IconBriefcaseFilled,
  IconClockFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AsanaLogoTwo } from "@/components/thriving-talent-ui/company-logos";

interface JobCardProps {
  logo: string;
  title: string;
  description: string;
  type: string;
  applied: number;
  daysLeft: number;
  company: string;
}

const JobCard = ({
  logo,
  title,
  description,
  type,
  applied,
  daysLeft,
  company,
}: JobCardProps) => {
  return (
    <div className="bg-white p-4 w-[350px] rounded-3xl shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 flex items-center justify-center h-8 sm:h-10 bg-thrive-light-blue px-2 py-10 rounded-2xl">
          <AsanaLogoTwo />
        </div>
        <p className="text-base font-semibold">{title}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Badge className="bg-thrive-light-blue p-2 rounded text-black flex items-center gap-2">
          <IconBriefcaseFilled size={16} color="black" stroke={2} />
          {type}
        </Badge>
        <Badge className="bg-thrive-light-blue p-2 rounded text-black flex items-center gap-2">
          <IconUserFilled size={16} color="black" stroke={2} />
          {applied} Applied
        </Badge>
        <Badge className="bg-thrive-light-blue p-2 rounded text-black flex items-center gap-2">
          <IconClockFilled size={16} color="black" stroke={2} />
          {daysLeft} days left
        </Badge>
      </div>

      <div className="mt-6">
        <Button className="bg-black hover:bg-black/80 w-full">Apply</Button>
      </div>
    </div>
  );
};

export default JobCard;
