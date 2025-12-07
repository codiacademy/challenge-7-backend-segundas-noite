import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/mathcards/expensesCards";
import { useSales } from "@/mathcards/salesCard";
import { useNetBalance } from "@/mathcards/saldoCard";

type Props = {
  filter: "semana" | "mes" | "ano";
  tipo: "barChart" | "lineChart";
};

export function Charts({ /* filter, */ tipo }: Props) {
  const { totais } = useExpenses();
  const { totalVendas } = useSales();
  const { saldoLiquido } = useNetBalance();

  const chartdata = [
    {
      name: "",
      vendas: totalVendas,
      despesas: totais.totalGastos,
      saldoliquido: saldoLiquido,
    },
  ];

  function ChartLegendContent() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: 0,
          margin: 0,
          fontSize: 12,
        }}
      >
        <span style={{ color: "#10B981" }}>⬤ Total de Vendas </span>
        <span style={{ color: "#EF4444" }}>⬤ Total de Despesas </span>
        <span style={{ color: "#6366F1" }}>⬤ Saldo Líquido</span>
      </div>
    );
  }

  return (
    <>
      {tipo === "barChart" && (
        <Card className="max-w-full overflow-x-auto">
          <CardHeader>
            <CardTitle>Receitas vs Despesas vs Lucro </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <ChartContainer config={{}} className="min-h-[200px] w-full">
              {/* Passo 4: Exibir os dados usando BarChart */}

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartdata}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="periodo" />

                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="vendas" fill="#10B981" name="Vendas" />
                  <Bar dataKey="despesas" fill="#F87171" name="Despesas" />
                  <Bar dataKey="saldoliquido" fill="#6366F1" name="Balanco" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
      {tipo === "lineChart" && (
        <Card className="max-w-full overflow-x-auto">
          <CardHeader>
            <CardTitle>Tendência de Crescimento</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}}>
              <LineChart
                data={chartdata}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="periodo" />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />

                <Line
                  dataKey="vendas"
                  type="natural"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
}
