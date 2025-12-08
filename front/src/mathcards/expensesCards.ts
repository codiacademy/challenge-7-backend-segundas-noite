import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AllExpenses } from "@/http/expenses/allExpenses";

export type Gastos = {
  id: string;
  title: string;
  description: string;
  data: string;
  fixed: "Fixa" | "Variável";
  Appellant: string;
  value: number;
};

export type FilterType = "all" | "Fixa" | "Variável";
export type FilterPeriod = "semana" | "mes" | "ano";

export function useExpenses(
  fixedFilter: FilterType = "all",
  periodFilter: FilterPeriod = "mes",
) {
  const {
    data: expensesList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Gastos[]>({
    queryKey: ["expenses", fixedFilter, periodFilter],
    queryFn: async () => {
      const resp: any[] = await AllExpenses();

      return resp.map((e) => ({
        id: e.id,
        title: e.name ?? e.title ?? "Despesa",
        description: e.description ?? "",
        data: e.date ? new Date(e.date).toISOString() : "",
        fixed: e.type === "Fixa" ? "Fixa" : "Variável",
        Appellant: e.appellant ?? "",
        value: Number(e.value ?? e.valor ?? 0),
      }));
    },
    staleTime: 0,
  });

  const filteredExpenses = useMemo(() => {
    const today = new Date();

    return expensesList
      .filter((g) => {
        const gastoDate = new Date(g.data);

        switch (periodFilter) {
          case "semana": {
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            return gastoDate >= weekAgo && gastoDate <= today;
          }
          case "mes": {
            const monthAgo = new Date();
            monthAgo.setMonth(today.getMonth() - 1);
            return gastoDate >= monthAgo && gastoDate <= today;
          }
          case "ano": {
            const yearAgo = new Date();
            yearAgo.setFullYear(today.getFullYear() - 1);
            return gastoDate >= yearAgo && gastoDate <= today;
          }
          default:
            return true;
        }
      })
      .filter((g) => (fixedFilter === "all" ? true : g.fixed === fixedFilter));
  }, [expensesList, fixedFilter, periodFilter]);

  const totais = useMemo(() => {
    const totalFixas = filteredExpenses
      .filter((g) => g.fixed === "Fixa")
      .reduce((acc, g) => acc + g.value, 0);

    const totalVariaveis = filteredExpenses
      .filter((g) => g.fixed === "Variável")
      .reduce((acc, g) => acc + g.value, 0);

    return {
      totalFixas,
      totalVariaveis,
      totalGastos: totalFixas + totalVariaveis,
    };
  }, [filteredExpenses]);

  return {
    expensesList: filteredExpenses,
    totais,
    loading: isLoading,
    error: isError ? "Erro ao carregar despesas" : null,
    refetch,
  };
}
