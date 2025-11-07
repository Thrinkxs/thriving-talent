import { Card, CardContent } from "@/components/ui/card";
import { JobType } from "@/utils/data";
import JobCardList from "@/components/Jobs/JobCardList";
import JobCardGrid from "@/components/Jobs/JobCardGrid";

interface JobListProps {
  jobs: JobType[];
  viewMode: "list" | "grid";
  onSelectJob: (job: JobType) => void;
}

export default function JobList({ jobs, viewMode, onSelectJob }: JobListProps) {
  if (jobs.length === 0)
    return (
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-12 text-center">
          <p className="text-gray-500">No jobs found matching your criteria</p>
        </CardContent>
      </Card>
    );

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCardList
            key={job.id}
            job={job}
            onSelect={() => onSelectJob(job)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <JobCardGrid key={job.id} job={job} onSelect={() => onSelectJob(job)} />
      ))}
    </div>
  );
}
