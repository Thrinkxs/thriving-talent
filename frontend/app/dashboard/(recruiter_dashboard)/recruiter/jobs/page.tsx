"use client";

import { recruiterJobColumns } from "@/components/Columns/RecruiterJobColumns";
import { JobsDataTable } from "@/components/ui/data-table-jobs";
import { useFetchPersonalJobs } from "@/hooks/jobs/jobs";
import React from "react";

const RecruiterJobPage = () => {
  const { data: recruiterJobData, isLoading } = useFetchPersonalJobs();
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
