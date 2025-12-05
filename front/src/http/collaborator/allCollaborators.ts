import { api } from "@/lib/axios";

export async function AllCollaborators() {
  const response = await api.get("/users");
  return response.data;
}
