import { api } from "@/lib/axios";

interface updateExpenseProps {
  id: string;
  name:
    | "Aluguel"
    | "Energia"
    | "Manutenção"
    | "Marketing"
    | "Suprimentos"
    | "Internet"
    | "Pagamento"
    | "Outros";
  description: string;
  value: number;
  type: "Fixa" | "Variável";
  date: Date;
}

export async function UpdateExpenses({
  id,
  name,
  description,
  value,
  type,
  date,
}: updateExpenseProps) {
  const response = await api.put(`/expenses/${id}`, {
    name,
    description,
    value,
    type,
    date: new Date(date),
  });
  return response.data;
}
