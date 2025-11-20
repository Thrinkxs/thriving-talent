"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useFetchEmployerDashboardMetrics } from "@/hooks/jobs/jobs";
import { ChartPie } from "@/components/Charts/PieChart/PieChart";
import { JobTypeStats } from "@/lib/types/response-types/response-types";

export default function PieChartInfo() {
  const { data, isLoading } = useFetchEmployerDashboardMetrics();

  // Provide fallback data
  const fallbackJobTypeStats: JobTypeStats = useMemo(
    () => ({
      fullTime: { count: 0, change: 0 },
      partTime: { count: 0, change: 0 },
      negotiable: { count: 0, change: 0 },
    }),
    []
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between pb-6">
            <h1 className="text-lg font-semibold">Job Types</h1>
          </div>
          <ChartPie
            jobTypeStatsData={data?.jobTypeStats || fallbackJobTypeStats}
          />
        </CardContent>
      </Card>
    </div>
  );
}
