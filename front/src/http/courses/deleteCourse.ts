import { api } from "@/lib/axios";

interface deleteCourseProps {
  id: string;
}

export async function DeleteCourse({ id }: deleteCourseProps) {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
}
