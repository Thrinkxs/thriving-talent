"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartBarProps = {
  data: { label: string; count: number }[];
  title?: string;
};

const chartConfig = {
  count: {
    label: "Job Applications",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBar({ data, title }: ChartBarProps) {
  return (
    <Card className="shadow-sm border border-border">
      <CardHeader>
        <CardTitle>{title || "Application Trends"}</CardTitle>
        <CardDescription>
          Showing application submissions over time
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            data={data}
            margin={{
              top: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //   tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={true}
              tickLine={true}
              tickMargin={10}
            />

            <ChartLegend content={<ChartLegendContent />} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={6}>
              <LabelList
                dataKey="count"
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
