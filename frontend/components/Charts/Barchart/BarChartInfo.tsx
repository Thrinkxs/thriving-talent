"use client";

import { useState, useMemo } from "react";
import { ChartBar } from "@/components/Charts/Barchart/BarChart";
import { DropdownMenuRadioGroupDemo } from "@/components/DropdownMenu/DropdownMenuRadioGroupDemo";
import { useFetchApplicationStatistics } from "@/hooks/application/application";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  formatDailyDate,
  formatMonthlyDate,
  formatWeeklyDate,
} from "@/utils/Helper/HelperFunction";
import { dummyData } from "@/utils/data";

export default function BarChartInfo() {
  const { data, isLoading } = useFetchApplicationStatistics();

  const [currentView, setCurrentView] = useState<
    "daily" | "weekly" | "monthly"
  >("monthly");

  const chartData = useMemo(() => {
    if (!data) return [];
    const { daily, weekly, monthly } = data;
    if (currentView === "daily")
      return daily?.map((d) => ({
        label: formatDailyDate(d.date),
        count: d.count,
      }));
    if (currentView === "weekly")
      return weekly?.map((d) => ({
        label: formatWeeklyDate(d.week),
        count: d.count,
      }));
    if (currentView === "monthly")
      return monthly?.map((d) => ({
        label: formatMonthlyDate(d.month),
        count: d.count,
      }));
    return [];
  }, [data, currentView]);

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
            <h1 className="text-lg font-semibold">Job Statistics</h1>
            <DropdownMenuRadioGroupDemo
              currentSelection={currentView}
              filterDaily={() => setCurrentView("daily")}
              filterWeekly={() => setCurrentView("weekly")}
              filterMonthly={() => setCurrentView("monthly")}
            />
          </div>
          <ChartBar
            data={chartData}
            title={`${
              currentView.charAt(0).toUpperCase() + currentView.slice(1)
            } Applications`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
