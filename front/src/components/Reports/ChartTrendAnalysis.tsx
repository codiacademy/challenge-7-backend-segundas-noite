"use client";
import { GitCommitVertical } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useBalance } from "@/mathcards/balance";
import { useSales } from "@/mathcards/salesCard";
import { useExpenses } from "@/mathcards/expensesCards";
export const description = "A line chart with custom dots";

export function ChartTrendAnalysis() {
  const { totais } = useExpenses();
  const { totalVendas } = useSales();
  const { balanco } = useBalance();

  const chartData = [
    {
      receitas: totalVendas,
      despesas: totais.totalGastos,
      lucro: balanco,
    },
  ];
  const chartConfig = {
    receitas: {
      label: "Receitas",
      color: "var(--chart-1)",
    },
    despesas: {
      label: "Despesas",
      color: "var(--chart-2)",
    },
    lucro: {
      label: "Lucro",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analise de tendência</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="receitas"
              type="natural"
              stroke="var(--color-receitas)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-receitas)"
                  />
                );
              }}
            />
            <Line
              dataKey="despesas"
              type="natural"
              stroke="var(--color-despesas)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-despesas)"
                  />
                );
              }}
            />
            <Line
              dataKey="lucro"
              type="natural"
              stroke="var(--color-lucro)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-lucro)"
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
