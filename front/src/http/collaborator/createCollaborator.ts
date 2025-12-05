import { api } from "@/lib/axios";

interface createUserProps {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  wage: number;
  sector: string;
  status: string;
  password: string;
}

export async function CreateCollaborator({
  name,
  email,
  phoneNumber,
  wage,
  sector,
  status,
  password,
}: createUserProps) {
  const response = await api.post("/users", {
    name,
    email,
    phoneNumber,
    wage,
    sector,
    status,
    password,
  });
  return response.data;
}
