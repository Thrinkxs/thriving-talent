"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ types from backend
type CountChange = {
  count: number;
  change: number;
};

export type JobTypeStats = {
  fullTime: CountChange;
  partTime: CountChange;
  negotiable: CountChange;
};

type ChartPieProps = {
  jobTypeStatsData: JobTypeStats;
};

export function ChartPie({ jobTypeStatsData }: ChartPieProps) {
  const id = "pie-interactive";

  // ✅ Convert backend data to recharts-friendly dataset
  const chartData = React.useMemo(() => {
    if (!jobTypeStatsData) return [];

    return [
      {
        type: "fullTime",
        label: "Full Time",
        value: jobTypeStatsData.fullTime.count,
        fill: "var(--chart-1)",
      },
      {
        type: "partTime",
        label: "Part Time",
        value: jobTypeStatsData.partTime.count,
        fill: "var(--chart-2)",
      },
      {
        type: "negotiable",
        label: "Negotiable",
        value: jobTypeStatsData.negotiable.count,
        fill: "var(--chart-3)",
      },
    ];
  }, [jobTypeStatsData]);

  const [activeType, setActiveType] = React.useState(
    chartData[0]?.type || "fullTime"
  );

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.type === activeType),
    [chartData, activeType]
  );

  if (!chartData.length) return null;

  const types = chartData.map((item) => item.type);

  const chartConfig = {
    fullTime: { label: "Full Time", color: "var(--chart-1)" },
    partTime: { label: "Part Time", color: "var(--chart-2)" },
    negotiable: { label: "Negotiable", color: "var(--chart-3)" },
  } satisfies ChartConfig;

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Job Type Breakdown</CardTitle>
          <CardDescription>Distribution of job types</CardDescription>
        </div>

        {/* ✅ dropdown remains same but now switches job type */}
        <Select value={activeType} onValueChange={setActiveType}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select job type"
          >
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {types.map((type) => {
              const config = chartConfig[type as keyof typeof chartConfig];
              return (
                <SelectItem
                  key={type}
                  value={type}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{ backgroundColor: config?.color }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const activeItem = chartData[activeIndex];
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {activeItem.value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          {activeItem.label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
