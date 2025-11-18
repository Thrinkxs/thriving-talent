"use client";

import { recruiterJobColumns } from "@/components/Columns/RecruiterJobColumns";
import { JobsDataTable } from "@/components/ui/data-table-jobs";
import { useFetchPersonalJobs } from "@/hooks/jobs/jobs";
import React from "react";
import { Loader2 } from "lucide-react";

const RecruiterJobPage = () => {
  const { data: recruiterJobData, isLoading } = useFetchPersonalJobs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <div>
      <section className="bg-white rounded-3xl p-4">
        <div>
          <h3 className="text-xl font-bold py-2">Jobs</h3>
          <p className="text-gray-600 text-sm mt-4">
            see your created jobs below
          </p>
        </div>
        <JobsDataTable
          noDataMessage="No jobs found... Try creating one"
          columns={recruiterJobColumns}
          data={recruiterJobData || []}
          showNameFilter={true}
        />
      </section>
    </div>
  );
};

export default RecruiterJobPage;
