"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

export const description = "An area chart with a legend";

const chartConfig = {
  receita: {
    label: "Receita",
    color: "var(--chart-1)",
  },
  despesa: {
    label: "Despesa",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartSaleXEpxenses() {
  // ✅ Hooks NO LUGAR CERTO
  const { totalVendas, loading: loadingSales } = useSales();
  const { totais, loading: loadingExpenses } = useExpenses();

  if (loadingSales || loadingExpenses) {
    return (
      <Card>
        <CardContent className="flex h-[300px] items-center justify-center">
          Carregando gráfico...
        </CardContent>
      </Card>
    );
  }

  // ✅ Dados corretos e reativos
  const chartData = [
    {
      label: "Total",
      receita: totalVendas,
      despesa: totais.totalGastos,
    },
  ];

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Receitas vs Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />

              {/* ✅ XAxis EXISTE AGORA */}
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Area
                dataKey="receita"
                type="natural"
                fill="var(--color-receita)"
                fillOpacity={0.4}
                stroke="var(--color-receita)"
              />

              <Area
                dataKey="despesa"
                type="natural"
                fill="var(--color-despesa)"
                fillOpacity={0.4}
                stroke="var(--color-despesa)"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
