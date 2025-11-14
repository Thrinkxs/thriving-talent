"use client";

import { internApplicationColumns } from "@/components/Columns/InternApplicationColumns";
import { InternApplicationDataTable } from "@/components/ui/data-table-intern";
import { useFetchInternApplications } from "@/hooks/application/application";

export default function UserDashboardPage() {
  const { data: internApplicationsData, isLoading: isLoadingApplications } =
    useFetchInternApplications();

  return (
    <section>
      <h1 className="text-3xl">Application History</h1>
      <section className="bg-white rounded-3xl p-8 mt-14">
        <div className="mt-4">
          <h3 className="text-xl font-bold">Your Job Applications</h3>
          <p className="text-sm text-gray-500 mt-2">
            Track the status of all positions you've applied to
          </p>
        </div>
        <InternApplicationDataTable
          noDataMessage="Start applying to jobs and they'll appear here for you to track"
          columns={internApplicationColumns}
          data={internApplicationsData || []}
          showNameFilter={true}
        />
      </section>
    </section>
  );
}
