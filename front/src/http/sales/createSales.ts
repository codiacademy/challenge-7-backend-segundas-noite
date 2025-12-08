import { api } from "@/lib/axios";

interface CreateSalesProps {
  id: string;
  Modalidade: "Online" | "Presencial";
  courseId: string;
  nomeAluno: string;
  email: string;
  telefone: string;
  valorBruto: number;
  desconto: number;
  comisao: number;
  imposto: number;
  taxaCartao: number;
}

export async function Createsales({
  id,
  Modalidade,
  courseId,
  nomeAluno,
  email,
  telefone,
  valorBruto,
  desconto,
  comisao,
  imposto,
  taxaCartao,
}: CreateSalesProps) {
  const response = await api.post("/sales", {
    id,
    modalidade: Modalidade.toUpperCase(), // backend espera minúsculo
    courseId,
    nomeAluno,
    email,
    telefone,
    valorBruto,
    desconto,
    comisao,
    imposto,
    taxaCartao,
  });
  return response.data;
}
