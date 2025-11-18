import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { AsanaLogoTwo } from "@/components/thriving-talent-ui/company-logos";
import {
  IconBriefcaseFilled,
} from "@tabler/icons-react";
import { JobResponse } from "@/lib/types/response-types/response-types";
import { useCreateApplication } from "@/hooks/application/application";
import { useInternStore } from "@/lib/store/intern-store";
import { Loader2 } from "lucide-react";

interface JobCardGridProps {
  job: JobResponse;
  onSelect: () => void;
}

export default function JobCardGrid({ job, onSelect }: JobCardGridProps) {
  const { mutate: createApplication, isPending } = useCreateApplication();

  const internUser = useInternStore((state) => state.intern);

  const handleApply = () => {
    createApplication({
      jobId: job._id,
      internId: internUser?._id,
    });
  };

  return (
    <Card
      onClick={onSelect}
      className="cursor-pointer hover:shadow-md transition-all border border-gray-100"
    >
      <CardContent className="p-3">
        <div className="flex flex-col">
          {/* Top Section */}
          <div className="">
            <div className="flex-shrink-0 flex items-center justify-center h-8 sm:h-10 w-24 bg-thrive-light-blue px-2 py-10 rounded-2xl">
              <AsanaLogoTwo />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge className="bg-thrive-light-blue p-1 rounded text-black flex items-center gap-2 text-xs">
                <IconBriefcaseFilled size={16} color="black" stroke={2} />
                {job.type}
              </Badge>
              {/* <Badge className="bg-thrive-light-blue p-1 rounded text-black flex items-center gap-2 text-xs">
                <IconUserFilled size={16} color="black" stroke={2} />
                {job.applied} Applied
              </Badge>
              <Badge className="bg-thrive-light-blue p-1 rounded text-black flex items-center gap-2 text-xs">
                <IconClockFilled size={16} color="black" stroke={2} />
                {job.daysLeft} days left
              </Badge> */}
            </div>
          </div>

          {/* Middle Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold">{job?.title}</h3>
            <p className="text-gray-600">
              {job?.company?.companyName || "no name"}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              {job?.location}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {job?.description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="mt-5">
            <Button
              variant="outline"
              className="rounded-xl w-full bg-black hover:bg-black/85 text-white hover:text-white px-5"
              onClick={handleApply}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-6 h-6 animate-spin text-thrive-blue" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
