import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { AsanaLogoTwo } from "../thriving-talent-ui/company-logos";
import { JobResponse } from "@/lib/types/response-types/response-types";
import { TbLoader2 } from "react-icons/tb";
import { useInternStore } from "@/lib/store/intern-store";
import { useCreateApplication } from "@/hooks/application/application";

interface JobDetailsPanelProps {
  job: JobResponse;
  expandDescription: boolean;
  setExpandDescription: (v: boolean) => void;
}

export default function JobDetailsPanel({
  job,
  expandDescription,
  setExpandDescription,
}: JobDetailsPanelProps) {
  const { mutate: createApplication, isPending } = useCreateApplication();

  const internUser = useInternStore((state) => state.intern);

  const handleApply = () => {
    createApplication({
      jobId: job._id,
      internId: internUser?._id,
    });
  };

  return (
    <Card className="hidden lg:block sticky top-4 h-fit border border-gray-100 shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex-shrink-0 flex items-center justify-center h-8 sm:h-10 w-24 bg-thrive-light-blue px-2 py-10 rounded-2xl">
          <AsanaLogoTwo />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">{job?.title}</h3>
          <p className="text-gray-600">{job?.company?.companyName}</p>
        </div>

        <div className="text-sm text-gray-500">
          <span className="flex items-center gap-1 mt-2">
            <MapPin className="h-4 w-4" /> {job?.location}
          </span>
          <span className="flex items-center gap-1 mt-2">
            <Clock className="h-4 w-4" /> {job?.type}
          </span>
        </div>
        <hr className="text-gray-400" />
        <div>
          <p
            className={`text-gray-600 text-sm ${
              expandDescription ? "" : "line-clamp-4"
            }`}
          >
            {job?.description}
          </p>
          <Button
            variant="link"
            className="px-0 text-blue-600"
            onClick={() => setExpandDescription(!expandDescription)}
          >
            {expandDescription ? "Show Less" : "Read More"}
          </Button>
        </div>

        <div className="mt-4">
          <Button
            className="rounded-xl w-full bg-black hover:bg-black/85 px-6"
            onClick={handleApply}
            disabled={isPending}
          >
            {isPending ? (
              <TbLoader2 className="animate-spin text-thrive-blue" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
