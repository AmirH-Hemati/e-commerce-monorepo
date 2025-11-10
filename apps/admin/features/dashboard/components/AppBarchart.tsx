"use client";

import Spinner from "@/components/Spinner";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetOrderStatus } from "@/features/orders/hooks/useGetOrderStatus";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const chartConfig = {
  Pending: { label: "Pending", color: "var(--chart-1)" },
  Paid: { label: "Paid", color: "var(--chart-2)" },
  Processing: { label: "Processing", color: "var(--chart-3)" },
  Shipped: { label: "Shipped", color: "var(--chart-4)" },
  Delivered: { label: "Delivered", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function PaymentStatusBarChart() {
  const { orders, isLoading } = useGetOrderStatus();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Orders by Payment Status</h1>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <BarChart data={orders}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar dataKey="count" name="status" fill="var(--color-chart-1)" />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
