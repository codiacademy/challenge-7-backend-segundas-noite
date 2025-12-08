import { useEffect, useState } from "react";
import { AllSales } from "@/http/sales/allSales";
import { AllExpenses } from "@/http/expenses/allExpenses";

export type BalanceFilter = "6meses" | "ano";

export function useBalance(filter: BalanceFilter = "6meses") {
  const [balanco, setBalanco] = useState(0);
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBalance() {
      setLoading(true);
      setError(null);

      try {
        const [salesResp, expensesResp] = await Promise.all([
          AllSales(),
          AllExpenses(),
        ]);

        const hoje = new Date();

        const limite = new Date(hoje);
        if (filter === "6meses") {
          limite.setMonth(hoje.getMonth() - 6);
        } else {
          limite.setFullYear(hoje.getFullYear() - 1);
        }

        // VENDAS — valor líquido
        const vendasFiltradas = salesResp.filter((s: any) => {
          if (!s.dataVenda) return false;
          const dataVenda = new Date(s.dataVenda);
          return dataVenda >= limite;
        });

        const totalV = vendasFiltradas.reduce(
          (acc: number, s: any) => acc + Number(s.valorLiquido ?? 0),
          0,
        );

        //  DESPESAS — valor
        const despesasFiltradas = expensesResp.filter((e: any) => {
          if (!e.date && !e.data) return false;
          const dataDespesa = new Date(e.date ?? e.data);
          return dataDespesa >= limite;
        });

        const totalD = despesasFiltradas.reduce(
          (acc: number, e: any) => acc + Number(e.value ?? e.valor ?? 0),
          0,
        );

        setTotalVendas(totalV);
        setTotalDespesas(totalD);
        setBalanco(totalV - totalD);
      } catch (err) {
        console.error(err);
        setError("Erro ao calcular balanço.");
      } finally {
        setLoading(false);
      }
    }

    loadBalance();
  }, [filter]);

  return {
    balanco,
    totalVendas,
    totalDespesas,
    loading,
    error,
  };
}
