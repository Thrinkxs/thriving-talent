"use client";

import InfoCards from "@/components/Cards/InfoCard/InfoCards";
import JobCard from "@/components/Cards/JobCard/JobCard";
import { internApplicationColumns } from "@/components/Columns/InternApplicationColumns";
import { InternApplicationDataTable } from "@/components/ui/data-table-intern";
import { useFetchInternApplications } from "@/hooks/application/application";
import {
  useFetchInternDashboardMetrics,
  useFetchJobs,
} from "@/hooks/jobs/jobs";
import { useInternStore } from "@/lib/store/intern-store";
import {
  IconBriefcase2Filled,
  IconBriefcaseFilled,
  IconUser,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";

export default function InternDashboardPage() {
  const { data: jobsData, isLoading } = useFetchJobs();
  const { data: metricsData, isLoading: isLoadingMetrics } =
    useFetchInternDashboardMetrics();
  const { data: internApplicationsData, isLoading: isLoadingApplications } =
    useFetchInternApplications();

  const internUser = useInternStore((state) => state.intern);
  if (isLoading || isLoadingMetrics || isLoadingApplications) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <section>
      <div className="hidden lg:flex flex-wrap md:flex-nowrap gap-6">
        {/* Jobs Posted */}
        <InfoCards
          backgroundColor="bg-rose-200"
          icon={<IconBriefcaseFilled size={20} color="#EE6565" stroke={2} />}
          title="Applications Sent"
          value={metricsData?.totalApplicationsSent.count || 0}
          percentageChange={metricsData?.totalApplicationsSent.change}
        />
        <InfoCards
          backgroundColor="bg-blue-200"
          icon={<IconUser size={20} color="#3E66DF" stroke={2} />}
          title="Active Applications"
          value={metricsData?.activeApplications.count || 0}
          percentageChange={metricsData?.activeApplications.change || 0}
        />
        <InfoCards
          backgroundColor="bg-lime-100"
          icon={<IconBriefcase2Filled size={20} color="#DADF3E" stroke={2} />}
          title="Full Time Jobs"
          value={metricsData?.jobTypeStats.fulltime.count || 0}
          percentageChange={metricsData?.jobTypeStats.fulltime.change || 0}
        />
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-xl sm:text-2xl">Latest Job Posts</h3>
        <div className="mt-10 flex flex-wrap lg:flex-nowrap gap-6">
          {(jobsData || []).slice(0, 3).map((job) => (
            <JobCard
              key={job._id}
              jobId={job._id}
              internId={internUser?._id || ""}
              logo={job.company.companyPhoto}
              title={job.title}
              description={job.description}
              type={job.type}
              // applied={job.applied}
              // daysLeft={job.daysLeft}
            />
          ))}
        </div>
      </div>

      <section className="bg-white rounded-3xl p-8 mt-14">
        <div className="mt-4">
          <h3 className="text-xl font-bold">Latest Application Status</h3>
          <p className="text-sm text-gray-500 mt-2">
            see your latest applications below
          </p>
        </div>
        <InternApplicationDataTable
          noDataMessage="No applicantions found"
          columns={internApplicationColumns}
          data={internApplicationsData || []}
          showNameFilter={true}
        />
      </section>
    </section>
  );
}
