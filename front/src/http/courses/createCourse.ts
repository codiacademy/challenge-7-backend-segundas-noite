import { api } from "@/lib/axios";

interface createCourseProps {
  name: string;
  image: string;
  description: string;
  value: number;
  status: string;
}

export async function CreateCourse({
  name,
  image,
  description,
  value,
  status,
}: createCourseProps) {
  const response = await api.post("/courses", {
    name,
    image,
    description,
    value,
    status,
  });
  return response.data;
}
