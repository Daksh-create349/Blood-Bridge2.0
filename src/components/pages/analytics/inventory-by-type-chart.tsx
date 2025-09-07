"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
} from "@/components/ui/chart";
import type { BloodResource } from "@/lib/types";

interface InventoryByTypeChartProps {
  data: BloodResource[];
}

export function InventoryByTypeChart({ data }: InventoryByTypeChartProps) {
  const chartData = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
    (bloodType) => ({
      bloodType,
      total: data
        .filter((r) => r.bloodType === bloodType)
        .reduce((sum, r) => sum + r.quantity, 0),
    })
  );

  const chartConfig = {
    total: {
      label: "Total Units",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory by Blood Type</CardTitle>
        <CardDescription>Total units available for each blood type.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bloodType"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
             <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
