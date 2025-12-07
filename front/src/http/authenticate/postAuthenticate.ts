import { api } from "@/lib/axios";

interface authenticateprops {
  email: string;
  password: string;
}

export async function postauthenticate({ email, password }: authenticateprops) {
  const response = await api.post("/auth", { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
}
