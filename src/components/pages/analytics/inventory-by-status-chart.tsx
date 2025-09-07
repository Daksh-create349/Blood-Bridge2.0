"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { BloodResource } from "@/lib/types";

interface InventoryByStatusChartProps {
  data: BloodResource[];
}

const chartConfig = {
  Available: {
    label: "Available",
    color: "hsl(var(--chart-2))",
  },
  Low: {
    label: "Low",
    color: "hsl(var(--chart-4))",
  },
  Critical: {
    label: "Critical",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function InventoryByStatusChart({ data }: InventoryByStatusChartProps) {
  const chartData = [
    {
      status: "Available",
      count: data.filter((r) => r.status === "Available").length,
    },
    {
      status: "Low",
      count: data.filter((r) => r.status === "Low").length,
    },
    {
      status: "Critical",
      count: data.filter((r) => r.status === "Critical").length,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory by Status</CardTitle>
        <CardDescription>Number of supply items by status category.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 10 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="count" layout="vertical" radius={5}>
              {chartData.map((entry) => (
                <Bar
                  key={entry.status}
                  dataKey="count"
                  name={entry.status}
                  fill={`var(--color-${entry.status})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
