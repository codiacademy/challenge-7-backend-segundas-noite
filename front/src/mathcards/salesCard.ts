import { useState, useEffect } from "react";
import { AllSales } from "@/http/sales/allSales";

export type Vendas = {
  id: string;
  name: string;
  email: string;
  phone: string;
  modality: "Online" | "Presencial";
  data: string;
  grossvalue: number;
  discount: number;
  deduction: number;
  finalvalue: number;
};

export type FilterPeriod = "semana" | "mes" | "ano";
export type FilterType = "all" | "Online" | "Presencial";

export function useSales(
  typeFilter: FilterType = "all",
  periodFilter: FilterPeriod = "mes",
) {
  const [salesList, setSalesList] = useState<Vendas[]>([]);
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalOnline, setTotalOnline] = useState(0);
  const [totalPresencial, setTotalPresencial] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSales() {
      setLoading(true);
      setError(null);

      try {
        const resp: any[] = await AllSales();

        const mapped: Vendas[] = resp.map((e) => ({
          id: e.id,
          modality: e.modalidade === "ONLINE" ? "Online" : "Presencial",
          name: e.nomeAluno ?? "Venda",
          email: e.email ?? "",
          phone: e.telefone ?? "",
          data: e.dataVenda
            ? new Date(e.dataVenda).toISOString()
            : new Date().toISOString(),
          grossvalue: Number(e.valorBruto ?? 0),
          discount: Number(e.desconto ?? 0),
          deduction: Number(e.imposto ?? 0),
          finalvalue: Number(e.valorLiquido ?? 0),
        }));

        //  Filtro por período (base para todos os totais)
        const today = new Date();
        const filteredByPeriod = mapped.filter((v) => {
          const vendaDate = new Date(v.data);
          switch (periodFilter) {
            case "semana": {
              const weekAgo = new Date();
              weekAgo.setDate(today.getDate() - 7);
              return vendaDate >= weekAgo && vendaDate <= today;
            }
            case "mes": {
              const monthAgo = new Date();
              monthAgo.setMonth(today.getMonth() - 1);
              return vendaDate >= monthAgo && vendaDate <= today;
            }
            case "ano": {
              const yearAgo = new Date();
              yearAgo.setFullYear(today.getFullYear() - 1);
              return vendaDate >= yearAgo && vendaDate <= today;
            }
            default:
              return true;
          }
        });

        //  Totais separados (independem do filtro de tipo)
        const onlineTotal = filteredByPeriod
          .filter((v) => v.modality === "Online")
          .reduce((acc, curr) => acc + curr.finalvalue, 0);

        const presencialTotal = filteredByPeriod
          .filter((v) => v.modality === "Presencial")
          .reduce((acc, curr) => acc + curr.finalvalue, 0);

        setTotalOnline(onlineTotal);
        setTotalPresencial(presencialTotal);

        //  Filtro por tipo (lista visível)
        const filteredByType =
          typeFilter === "all"
            ? filteredByPeriod
            : filteredByPeriod.filter((v) => v.modality === typeFilter);

        setSalesList(filteredByType);
        setTotalVendas(
          filteredByType.reduce((acc, curr) => acc + curr.finalvalue, 0),
        );
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar vendas.");
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, [typeFilter, periodFilter]);

  return {
    salesList,
    totalVendas,
    totalOnline,
    totalPresencial,
    loading,
    error,
  };
}
