import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { AsanaLogoTwo } from "../thriving-talent-ui/company-logos";
import { Badge } from "@/components/ui/badge";
import {
  IconBriefcaseFilled,
} from "@tabler/icons-react";
import { JobResponse } from "@/lib/types/response-types/response-types";
import { useInternStore } from "@/lib/store/intern-store";
import { useCreateApplication } from "@/hooks/application/application";
import { Loader2 } from "lucide-react";

interface JobDetailsSheetProps {
  job: JobResponse;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  expandDescription: boolean;
  setExpandDescription: (v: boolean) => void;
}

export default function JobDetailsSheet({
  job,
  open,
  onOpenChange,
  expandDescription,
  setExpandDescription,
}: JobDetailsSheetProps) {
  const { mutate: createApplication, isPending } = useCreateApplication();

  const internUser = useInternStore((state) => state.intern);

  const handleApply = () => {
    createApplication({
      jobId: job._id,
      internId: internUser?._id,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto p-4">
        <SheetHeader className="p-0">
          <div className="flex-shrink-0 flex items-center justify-center h-8 sm:h-10 w-24 bg-thrive-light-blue px-2 py-10 rounded-2xl">
            <AsanaLogoTwo />
          </div>
          <SheetTitle>{job.title}</SheetTitle>
          <p className="text-gray-500">{job.company.companyName}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Badge className="bg-thrive-light-blue p-1 sm:p-2 rounded text-black flex items-center gap-2 text-xs sm:text-sm 2xl:text-base">
              <IconBriefcaseFilled size={16} color="black" stroke={2} />
              {job.type}
            </Badge>
            {/* <Badge className="bg-thrive-light-blue p-1 sm:p-2 rounded text-black flex items-center gap-2 text-xs sm:text-sm 2xl:text-base">
              <IconUserFilled size={16} color="black" stroke={2} />
              {job.applied} Applied
            </Badge>
            <Badge className="bg-thrive-light-blue p-1 sm:p-2 rounded text-black flex items-center gap-2 text-xs sm:text-sm 2xl:text-base">
              <IconClockFilled size={16} color="black" stroke={2} />
              {job.daysLeft} days left
            </Badge> */}
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {job.type}
            </span>
          </div>
          <hr className="text-gray-400" />
          <div>
            <p
              className={`text-gray-600 text-sm ${
                expandDescription ? "" : "line-clamp-4"
              }`}
            >
              {job.description}
            </p>
            <Button
              variant="link"
              className="px-0 text-blue-600"
              onClick={() => setExpandDescription(!expandDescription)}
            >
              {expandDescription ? "Show Less" : "Read More"}
            </Button>
          </div>

          <div className="">
            <Button
              className="rounded-xl w-full bg-black hover:bg-black/85 px-6"
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
      </SheetContent>
    </Sheet>
  );
}
