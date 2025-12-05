import { api } from "@/lib/axios";

interface deleteCollaboratorProps {
  id: string;
}

export async function DeleteUser({ id }: deleteCollaboratorProps) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
