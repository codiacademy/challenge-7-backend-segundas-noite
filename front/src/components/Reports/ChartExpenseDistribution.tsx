"use client";

import { Pie, PieChart } from "recharts";
import tailwindcss from "tailwindcss/colors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useExpensesByCategory } from "@/hooks/useExpenses";
import type { ExpenseName } from "@/hooks/typeExpense";

type ChartExpenseData = {
  gastos: ExpenseName;
  valor: number;
  fill: string;
};

const colors: Record<ExpenseName, string> = {
  Aluguel: tailwindcss.purple[500],
  Pagamento: tailwindcss.red[500],
  Energia: tailwindcss.yellow[500],
  Internet: tailwindcss.green[500],
  Manutenção: tailwindcss.blue[500],
  Suprimentos: tailwindcss.indigo[500],
  Marketing: tailwindcss.emerald[500],
  Outros: tailwindcss.zinc[500],
};

export function ChartExpenseDistribution() {
  const expenses = useExpensesByCategory();

  const chartData: ChartExpenseData[] = expenses.map((item) => ({
    gastos: item.name as ExpenseName,
    valor: item.total,
    fill: colors[item.name as ExpenseName],
  }));

  const chartConfig: ChartConfig = {
    valor: { label: "Valor" },
    Aluguel: { label: "Aluguel", color: "var(--chart-1)" },
    Pagamento: {
      label: "Pagamento",
      color: "var(--chart-2)",
    },
    Energia: { label: "Energia", color: "var(--chart-3)" },
    Internet: { label: "Internet", color: "var(--chart-4)" },
    Manutenção: { label: "Manutenção", color: "var(--chart-5)" },
    Suprimentos: { label: "Suprimentos", color: "var(--chart-6)" },
    Marketing: { label: "Marketing", color: "var(--chart-7)" },
    Outros: { label: "Outros", color: "var(--chart-8)" },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de Gastos</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="gastos" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="valor"
              nameKey="gastos"
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
