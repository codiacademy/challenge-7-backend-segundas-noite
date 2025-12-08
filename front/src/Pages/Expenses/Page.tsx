import { Aside } from "@/components/Aside";
import { CardExpenses } from "@/components/Expenses/Cardexpenses";
import { CardsReports } from "@/components/Reports/CardsReports";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpensesForm } from "@/components/Expenses/ExpensesForm";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FilterIcon,
  Plus,
  Search,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import { FiltroPorPeriodo } from "@/components/Dashboard/FiltroPorPeriodo";
import { RangeCalendar } from "@/components/Dashboard/RangeCalendar";
import { AllExpenses } from "@/http/expenses/allExpenses";
import { useExpenses } from "@/mathcards/expensesCards";
import { useQuery } from "@tanstack/react-query";

type Gastos = {
  id: string;
  title: string;
  description: string;
  data: string;
  fixed: string;
  Appellant: string;
  value: number;
};

type Filter = "semana" | "mes" | "ano";

const ITEMS_PER_PAGE = 8;

export function Expenses() {
  const [selectedFilter, setselectedFilter] = useState<Filter>("mes");
  const [selectedfixed, setSelectedfixed] = useState<string>("all");
  const [page, setPage] = useState(1);

  const {
    data: expensesList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Gastos[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const resp = await AllExpenses();
      return resp.map((e: any) => ({
        id: e.id,
        title: e.name ?? e.title ?? "Despesa",
        description: e.description ?? "",
        data: e.date ? new Date(e.date).toLocaleDateString("pt-BR") : "",
        fixed: e.type === "Fixa" ? "Fixa" : "Variável",
        Appellant: e.appellant ?? "",
        value: Number(e.value ?? e.valor ?? 0),
      }));
    },
    staleTime: 1000 * 60,
  });

  const reloadExpenses = () => {
    refetch();
  };

  const filteredGastos =
    selectedfixed === "all"
      ? expensesList
      : expensesList.filter((g) => g.fixed === selectedfixed);

  const totalPages = Math.ceil(filteredGastos.length / ITEMS_PER_PAGE);

  const paginatedExpenses = filteredGastos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const { totais } = useExpenses();

  return (
    <div className="flex h-screen bg-gray-100">
      <Aside />
      <div className="flex w-full flex-col gap-2 overflow-auto p-5">
        {/* Header */}
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">Módulo de Gastos</h1>
            <p className="text-[18px] text-gray-500">
              Gerencie despesas fixas e variáveis
            </p>
          </div>

          <ExpensesForm
            title="Cadastre sua nova despesa"
            description="Insira os dados da despesa"
            trigger="Novo gasto"
            icon={Plus}
          />
        </div>

        {/* Cards */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardsReports
            title="Despesas fixas"
            value={totais.totalFixas}
            color="red"
            icon={Calendar}
            bgColor="red"
          />
          <CardsReports
            title="Despesas variáveis"
            value={totais.totalVariaveis}
            color="orange"
            icon={TrendingDown}
            bgColor="orange"
          />
          <CardsReports
            title="Total de gastos"
            value={totais.totalGastos}
            color="purple"
            icon={TrendingDown}
            bgColor="purple"
          />
        </section>

        {/* Filtros */}
        <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 shadow lg:flex-row lg:items-center">
          <div className="flex w-full items-center gap-3 rounded-lg border px-3 py-2 lg:w-5/6">
            <Search />
            <input
              type="text"
              placeholder="Buscar despesas"
              className="w-full outline-none"
            />
          </div>
          <FiltroPorPeriodo
            value={selectedFilter}
            onChange={setselectedFilter}
          />
          <RangeCalendar />
          <div className="h-full w-full lg:w-1/6">
            <Select
              value={selectedfixed}
              onValueChange={(value) => {
                setSelectedfixed(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="flex w-full cursor-pointer p-5">
                <FilterIcon />
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="Fixa">Despesas Fixas</SelectItem>
                <SelectItem value="Variável">Despesas Variáveis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lista */}
        <section className="grid gap-5 rounded-md border bg-white p-4">
          <h1 className="text-2xl font-semibold">Todas as despesas</h1>

          {isError && <p className="text-red-500">Erro ao carregar despesas</p>}
          {isLoading && <p>Carregando...</p>}

          {paginatedExpenses.map((g) => (
            <CardExpenses
              key={g.id}
              id={g.id}
              title={g.title}
              description={g.description}
              data={g.data}
              fixed={g.fixed}
              value={g.value}
              onSuccess={reloadExpenses}
            />
          ))}

          <div className="mt-1 mr-1 flex justify-end gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-10 w-10 rounded-[8px] border-2 transition hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-40" />
            </button>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-10 w-10 rounded-[8px] border-2 transition hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-40" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
