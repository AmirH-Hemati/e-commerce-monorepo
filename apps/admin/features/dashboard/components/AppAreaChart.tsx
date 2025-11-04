"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetMonthlySales } from "@/features/orders/hooks/useGetMonthlySales";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  totalAmount: {
    label: "Total Amount",
    color: "var(--chart-2)",
  },
  totalOrder: {
    label: "Total Order",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AppAreaChart = () => {
  const { orders, isLoading } = useGetMonthlySales();

  if (isLoading) return <p>islaoding</p>;
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Total Visitors</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart data={orders}>
          <CartesianGrid />

          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <YAxis
            yAxisId="left"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <defs>
            <linearGradient id="fillTotalAmount" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-totalAmount)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-totalAmount)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillTotalOrder" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-totalOrder)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-totalOrder)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          <Area
            yAxisId="left"
            dataKey="totalAmount"
            type="natural"
            fill="url(#fillTotalAmount)"
            stroke="var(--color-totalAmount)"
            fillOpacity={0.4}
          />

          <Area
            yAxisId="right"
            dataKey="totalOrder"
            type="natural"
            fill="url(#fillTotalOrder)"
            stroke="var(--color-totalOrder)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
