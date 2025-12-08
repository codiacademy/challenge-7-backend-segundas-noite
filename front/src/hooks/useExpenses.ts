import { useEffect, useState } from "react";
import { AllExpenses } from "@/http/expenses/allExpenses";

interface ExpenseByCategory {
  name: string;
  total: number;
}

type Expense = {
  id: string;
  name: string;
  value: number;
};

export function useExpensesByCategory() {
  const [data, setData] = useState<ExpenseByCategory[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const expenses: Expense[] = await AllExpenses();

        // agrupa garantindo que o acumulador é number
        const grouped = expenses.reduce<Record<string, number>>((acc, item) => {
          const v = Number(item.value ?? 0); // garante número
          acc[item.name] = (acc[item.name] ?? 0) + v;
          return acc;
        }, {});

        // Object.entries recebe Record<string, number>, logo total será number
        const formatted: ExpenseByCategory[] = Object.entries(grouped).map(
          ([name, total]) => ({
            name,
            total: Number(total),
          }),
        );

        setData(formatted);
      } catch (err) {
        // opcional: tratar/logar erro
        console.error("Erro ao carregar despesas por categoria:", err);
        setData([]);
      }
    }

    load();
  }, []);

  return data;
}
