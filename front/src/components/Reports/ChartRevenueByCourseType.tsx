"use client";

import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useSales } from "@/mathcards/salesCard";

export const description = "A pie chart with a custom label";

export function ChartRevenueByCourseType() {
  const { totalOnline, totalPresencial } = useSales();

  const chartData = [
    { course: "Online", valor: totalOnline },
    { course: "Presencial", valor: totalPresencial },
  ];

  const COLORS: Record<string, string> = {
    Online: "var(--chart-1)",
    Presencial: "var(--chart-2)",
  };

  const chartConfig = {
    valor: {
      label: "Valor",
    },
    Online: {
      label: "On-Line",
      color: "var(--chart-1)",
    },
    Presencial: {
      label: "Presencial",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Receita por tipo de curso</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="valor" hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="valor"
              nameKey="course"
              labelLine={false}
              label={({ payload, ...props }) => (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                >
                  {payload.course}
                </text>
              )}
            >
              {chartData.map((entry) => (
                <Cell key={entry.course} fill={COLORS[entry.course]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
