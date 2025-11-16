"use client";

import InfoCards from "@/components/Cards/InfoCard/InfoCards";
import BarChartInfo from "@/components/Charts/Barchart/BarChartInfo";
import PieChartInfo from "@/components/Charts/PieChart/PieChartInfo";
import { candidateColumns } from "@/components/Columns/CandidateColumns";
import { DataTable } from "@/components/ui/data-table";
import { useFetchEmployerApplicants } from "@/hooks/application/application";
import { useFetchRecruiterDashboardMetrics } from "@/hooks/jobs/jobs";
import { IconBriefcaseFilled, IconUserFilled } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = useFetchRecruiterDashboardMetrics();
  const { data: ApplicantsData, isLoading: isApplicantsLoading } =
    useFetchEmployerApplicants();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="hidden lg:flex flex-wrap md:flex-nowrap gap-6">
        {/* Jobs Posted */}
        <InfoCards
          backgroundColor="bg-rose-200"
          icon={<IconBriefcaseFilled size={20} color="#EE6565" stroke={2} />}
          title="Jobs posted"
          value={data?.totalJobs?.count || 0}
          percentageChange={data?.totalJobs?.change || 0}
        />
        <InfoCards
          backgroundColor="bg-blue-200"
          icon={<IconUserFilled size={20} color="#3E66DF" stroke={2} />}
          title="Total Applicants"
          value={data?.totalApplicants?.count || 0}
          percentageChange={data?.totalApplicants?.change || 0}
        />
        <InfoCards
          backgroundColor="bg-lime-100"
          icon={<IconBriefcaseFilled size={20} color="#DADF3E" stroke={2} />}
          title="Full time Jobs"
          value={data?.jobTypeStats?.fullTime?.count || 0}
          percentageChange={data?.jobTypeStats?.fullTime?.change || 0}
        />
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <BarChartInfo />
        </div>
        <div className="hidden md:block col-start-9 col-span-9 w-[300px]">
          <PieChartInfo />
        </div>
      </section>
      <section className="bg-white rounded-3xl p-4">
        <DataTable
          noDataMessage="No applicants found"
          columns={candidateColumns}
          data={ApplicantsData || []}
          showNameFilter={true}
        />
      </section>
    </div>
  );
}
