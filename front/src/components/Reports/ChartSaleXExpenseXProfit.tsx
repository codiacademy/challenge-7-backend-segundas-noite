"use client";
import tailwindcss from "tailwindcss/colors";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useSales } from "@/mathcards/salesCard";
import { useExpenses } from "@/mathcards/expensesCards";
import { useBalance } from "@/mathcards/balance";
export const description = "A multiple bar chart";

export function ChartSaleXExpenseXProfit() {
  const { totalVendas } = useSales();
  const { totais } = useExpenses();
  const { balanco } = useBalance();

  const chartData = [
    {
      vendas: totalVendas,
      despesas: totais.totalGastos,
      lucro: balanco,
    },
  ];
  const chartConfig = {
    receita: {
      label: "Receita",
      color: tailwindcss.emerald[500],
    },
    despesa: {
      label: "Despesa",
      color: tailwindcss.red[500],
    },
    lucro: {
      label: "Lucro",
      color: tailwindcss.blue[500],
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas vs Despesas vs Lucro</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="vendas" fill="var(--color-receita)" radius={4} />
            <Bar dataKey="despesas" fill="var(--color-despesa)" radius={4} />
            <Bar dataKey="lucro" fill="var(--color-lucro)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
