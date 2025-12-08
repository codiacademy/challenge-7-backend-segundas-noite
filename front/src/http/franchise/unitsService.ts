import { api } from "../../lib/axios";

export const getFranchises = async () => {
  const response = await api.get("/franchises");

  return response.data;
};

export const createFranchise = async (data: {
  name: string;
  city: string;
  state: string;
  responsible: string;
  phoneNumber: string;
  email: string;
  status: string;
}) => {
  const response = await api.post("/franchises", data);
  return response.data;
};

export const deleteFranchise = async (id: string) => {
  const response = await api.delete(`/franchises/${id}`);
  return response.data;
};

export const updateFranchise = async (id: string, data: any) => {
  const response = await api.put(`/franchises/${id}`, data);
  return response.data;
};
