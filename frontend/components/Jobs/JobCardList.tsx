import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobType } from "@/utils/data";
import { AsanaLogoTwo } from "@/components/thriving-talent-ui/company-logos";
import { Badge } from "@/components/ui/badge";
import {
  IconBriefcaseFilled,
  IconClockFilled,
  IconUserFilled,
} from "@tabler/icons-react";

interface JobCardListProps {
  job: JobType;
  onSelect: () => void;
}

export default function JobCardList({ job, onSelect }: JobCardListProps) {
  return (
    <Card
      onClick={onSelect}
      className="cursor-pointer hover:shadow-md transition-all border border-gray-100"
    >
      <CardContent className="p-5">
        <div>
          <div className="min-[470px]:flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center justify-center h-8 sm:h-10 w-24 bg-thrive-light-blue px-2 py-10 rounded-2xl">
              <AsanaLogoTwo />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge className="bg-thrive-light-blue p-1 sm:p-2 rounded text-black flex items-center gap-2 text-xs sm:text-sm 2xl:text-base">
                <IconBriefcaseFilled size={16} color="black" stroke={2} />
                {job.type}
              </Badge>
              <Badge className="bg-thrive-light-blue p-1 sm:p-2 rounded text-black flex items-center gap-2 text-xs sm:text-sm 2xl:text-base">
                <IconUserFilled size={16} color="black" stroke={2} />
                {job.applied} Applied
              </Badge>
              <Badge className="bg-thrive-light-blue p-1 sm:p-2 rounded text-black flex items-center gap-2 text-xs sm:text-sm 2xl:text-base">
                <IconClockFilled size={16} color="black" stroke={2} />
                {job.daysLeft} days left
              </Badge>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-4">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              vero modi ducimus fuga culpa eligendi saepe sunt aliquid, sapiente
              iusto eius natus magnam quae maxime, repellat neque ullam sed
              corrupti! Numquam error, quibusdam unde explicabo qui recusandae
              temporibus sapiente enim!
            </p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            variant="outline"
            className="rounded-xl w-full bg-black hover:bg-black/85 text-white px-5"
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
