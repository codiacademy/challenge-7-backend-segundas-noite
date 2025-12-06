import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Aside } from "@/components/Aside";
import { CardSales } from "@/components/Sales/CardSales";
import { SalesForm } from "@/components/Sales/CreateSalesForm";
import { FiltroPorPeriodo } from "@/components/Dashboard/FiltroPorPeriodo";
import { RangeCalendar } from "@/components/Dashboard/RangeCalendar";
import { AllSales } from "@/http/sales/allSales";
import {
  Plus,
  FilterIcon,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Venda = {
  id: string;
  name: string;
  email: string;
  phone: string;
  modality: string;
  data: string;
  grossvalue: number;
  discount: number;
  deduction: number;
  finalvalue: number;
};

type Filter = "semana" | "mes" | "ano";

export function Sales() {
  const queryClient = useQueryClient();
  const [selectedFilter, setSelectedFilter] = useState<Filter>("mes");
  const [selectedVendas, setSelectedVendas] = useState<string>("all");

  const {
    data: salesList = [],
    isLoading,
    isError,
  } = useQuery<Venda[]>({
    queryKey: ["sales"],
    queryFn: async () => {
      const resp = await AllSales();
      return resp.map((e: any) => ({
        id: e.id,
        modality: e.modalidade === "ONLINE" ? "Online" : "Presencial",
        name: e.nomeAluno ?? "Venda",
        email: e.email ?? "",
        phone: e.telefone ?? "",
        data: e.dataVenda
          ? new Date(e.dataVenda).toLocaleDateString("pt-BR")
          : "",
        grossvalue: e.valorBruto ?? 0,
        discount: e.desconto ?? 0,
        deduction: e.imposto ?? 0,
        finalvalue: e.valorLiquido ?? 0,
      }));
    },
  });

  const filteredVendas =
    selectedVendas === "all"
      ? salesList
      : salesList.filter((v) => v.modality === selectedVendas);

  return (
    <div className="flex h-screen bg-gray-100">
      <Aside />
      <div className="flex w-full flex-col gap-2 overflow-auto p-5">
        {/* Header */}
        <div className="flex w-full flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">Módulo de Vendas</h1>
            <p className="text-[18px] text-gray-500">
              Gerencie vendas de cursos online e presenciais
            </p>
          </div>
          <SalesForm
            title="Cadastre sua nova venda"
            description="Insira os dados da venda"
            trigger="Nova venda"
            icon={Plus}
            onSuccess={() =>
              queryClient.invalidateQueries({ queryKey: ["sales"] })
            }
          />
        </div>

        {/* Filtros */}
        <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 shadow lg:flex-row lg:items-center">
          <div className="flex w-full items-center gap-3 rounded-lg border px-3 py-2 lg:w-5/6">
            <Search />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              className="w-full outline-none"
            />
          </div>
          <FiltroPorPeriodo
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
          <RangeCalendar />
          <div className="h-full w-full lg:w-1/6">
            <Select value={selectedVendas} onValueChange={setSelectedVendas}>
              <SelectTrigger className="flex w-full cursor-pointer p-5">
                <FilterIcon />
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Presencial">Presencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards */}
        <section className="mt-2 grid gap-5 rounded-md border bg-white p-4">
          <h1 className="text-2xl font-semibold">Vendas cadastradas</h1>
          {isError && <p className="text-red-500">Erro ao carregar vendas.</p>}
          {isLoading ? (
            <p>Carregando vendas...</p>
          ) : (
            filteredVendas.map((venda) => (
              <CardSales
                key={venda.id}
                id={venda.id}
                name={venda.name}
                email={venda.email}
                phone={venda.phone}
                type={venda.modality}
                data={venda.data}
                grossvalue={venda.grossvalue}
                discount={venda.discount}
                deduction={venda.deduction}
                finalvalue={venda.finalvalue}
                onSuccess={() =>
                  queryClient.invalidateQueries({ queryKey: ["sales"] })
                }
              />
            ))
          )}

          {/* Paginação */}
          <div className="mt-1 mr-1 flex justify-end gap-1">
            <ChevronLeft className="h-10 w-10 rounded-[8px] border-2 transition duration-[2s] hover:bg-gray-400" />
            <ChevronRight className="h-10 w-10 rounded-[8px] border-2 transition duration-[2s] hover:bg-gray-400" />
          </div>
        </section>
      </div>
    </div>
  );
}
