import { SquarePen, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { UpdateSalesForm } from "@/components/Sales/UpdateSalesForm";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteSales } from "@/http/sales/deleteSales";
import { useQueryClient } from "@tanstack/react-query";

interface CardSalesProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  type?: "Online" | "Presencial";
  data: string;
  courseName: string; // nome do curso associado
  grossvalue: number;
  discount: number;
  deduction: number;
  finalvalue: number;
}

export function CardSales({
  id,
  name,
  email,
  phone,
  type,
  data,
  courseName,
  grossvalue,
  discount,
  deduction,
  finalvalue,
}: CardSalesProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  function formatBRL(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar a venda?",
    );
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await DeleteSales({ id });
      toast.success("Venda deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar venda");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Card className="bg-white p-4 transition duration-[0.5s] hover:bg-gray-100">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex flex-col">
          <h1 className="text-[18px] font-medium">{name}</h1>
          <p>{email}</p>
          <p>{phone}</p>
        </div>

        <div className="flex flex-col">
          <div
            className={`flex items-center justify-center rounded-2xl ${
              type === "Online"
                ? "h-7 w-14 bg-black"
                : "h-7 w-20 bg-gray-200 px-2"
            }`}
          >
            <span
              className={`${type === "Online" ? "text-white" : "text-black"}`}
            >
              {type}
            </span>
          </div>
          <p className="flex items-start text-gray-500">{data}</p>
        </div>
      </header>

      {/* Data Area */}
      <main className="flex w-full flex-col justify-between gap-4 text-sm lg:flex-row lg:items-center">
        <div className="grid w-4/5 grid-cols-1 gap-5 lg:grid-cols-4">
          <div>
            <p>Valor bruto</p>
            <p className="text-[16px] font-bold text-green-600">
              {formatBRL(grossvalue)}
            </p>
          </div>

          <div>
            <p>Desconto</p>
            <p className="text-[16px] font-bold text-red-600">
              -{formatBRL(discount)}
            </p>
          </div>

          <div>
            <p>Deduções</p>
            <p className="text-[16px] font-bold text-red-600">
              -{formatBRL(deduction)}
            </p>
          </div>

          <div>
            <p>Valor final</p>
            <p className="text-[18px] font-bold text-purple-800">
              {formatBRL(finalvalue)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <UpdateSalesForm
            title="Edite sua venda"
            description="Insira os dados novos"
            icon={SquarePen}
            initialData={{
              id,
              name,
              type,
              email,
              phone,
              grossValue: grossvalue,
              discount,
              commission: 0,
              tax: deduction,
              cardTax: 0,
              valorLiquido: finalvalue,
            }}
          />

          <button
            className="flex h-9 w-9 items-center justify-center rounded-sm border bg-white transition duration-[0.5s] hover:bg-gray-300"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 />
          </button>
        </div>
      </main>
    </Card>
  );
}
