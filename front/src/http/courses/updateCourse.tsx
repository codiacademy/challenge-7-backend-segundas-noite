import { api } from "@/lib/axios";

interface updateCourseProps {
  id: string;
  name: string;
  description: string;
  value: number;
  image: string;
  status: "ATIVO" | "INATIVO";
}

export async function UpdateCourse({
  id,
  name,
  description,
  value,
  image,
  status,
}: updateCourseProps) {
  const response = await api.put(`/courses/${id}`, {
    name,
    description,
    value,
    image,
    status,
  });
  return response.data;
}
