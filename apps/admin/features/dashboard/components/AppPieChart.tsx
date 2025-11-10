"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetOrderStatus } from "@/features/orders/hooks/useGetOrderStatus";
import Spinner from "@/components/Spinner";

export const description = "A donut chart with text";

const chartConfig = {
  Pending: {
    label: "Pending",
    color: "var(--chart-5)",
  },
  Paid: {
    label: "Paid",
    color: "var(--chart-2)",
  },
  Processing: {
    label: "Safari",
    color: "var(--chart-3)",
  },
  Shipped: {
    label: "Firefox",
    color: "var(--chart-4)",
  },
  Delivered: {
    label: "Edge",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;
type OrderStatus = "Pending" | "Paid" | "Processing" | "Shipped" | "Delivered";

export function AppPieChart() {
  const { orders, isLoading } = useGetOrderStatus();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Status Orders</h1>

      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={orders}
            dataKey="count"
            nameKey="status"
            innerRadius={60}
            strokeWidth={5}
          >
            {orders.map((item: { status: OrderStatus }, i: number) => (
              <Cell key={i} fill={chartConfig[item.status].color} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-muted-foreground"
                    >
                      Status
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Overview of recent order performance
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Overview of recent order performance
        </div>
      </div>
    </div>
  );
}
