import { api } from "@/lib/axios";

interface updateCollaboratorProps {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  status: "ATIVO" | "INATIVO" | "FERIAS";
  wage: number;
  sector: string;
}

export async function UpdateCollaborator({
  id,
  name,
  phoneNumber,
  email,
  status,
  wage,
  sector,
}: updateCollaboratorProps) {
  const response = await api.put(`/users/${id}`, {
    name,
    phoneNumber,
    email,
    status,
    wage,
    sector,
  });
  return response.data;
}
