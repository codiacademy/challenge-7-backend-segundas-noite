import { UpdateCourse } from "@/http/courses/updateCourse";
import { Courses } from "@/Pages/Courses/Page";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type modalCourseProps = {
  close: () => void;
  course: Courses | null;
  onEditCourse: (course: Courses) => void;
};

export function AlterarModal({
  close,
  course,
  onEditCourse,
}: modalCourseProps) {
  const [name, setName] = useState(course?.name ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [status, setStatus] = useState(course?.status ?? undefined);
  const [image, setImage] = useState(course?.image ?? "");
  const [value, setValue] = useState(course?.value ?? 0);
  async function handleEditCourse(e: React.FormEvent) {
    e.preventDefault();

    const updatedCourse = await UpdateCourse({
      id: course!.id,
      name,
      description,
      image,
      value,
      status: status as "ATIVO" | "INATIVO",
    });

    onEditCourse(updatedCourse);
    toast.success("Curso editado com sucesso!");

    close();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-3">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-10">
        <div className="mb-6 flex items-center justify-between text-black">
          <h1 className="text-xl font-semibold">Adicionar Curso</h1>
          <button className="cursor-pointer hover:text-red-500" onClick={close}>
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Dados do curso:</h1>
          <form className="grid gap-3">
            {/*Área para adicionaar imagem*/}
            <div>
              <label htmlFor="">Insira uma imagem</label>
              <div className="rounded-md border p-2">
                <input type="file" className="w-full" />
              </div>
            </div>

            <div>
              {/*Select do status do curso*/}
              <label htmlFor="">Selecione o status do curso</label>

              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger className="rounded-md border-black">
                  <SelectValue placeholder="Status do curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/*Inputs de nome e descrição do curso*/}
            <div className="grid gap-3">
              <div className="">
                <label htmlFor="">Nome do curso</label>
                <input
                  type="text"
                  placeholder="Nome do curso"
                  className="rounded-md border border-black p-3"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Descrição do curso</label>
                <input
                  type="text"
                  placeholder="Descrição"
                  className="rounded-md border border-black p-3"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/*Input de valor*/}
            <div>
              <label htmlFor="">Insira o valor do curso</label>
              <input
                type="number"
                min={0}
                placeholder="Insira o valor do curso"
                className="rounded-md border border-black p-3"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>

            {/*Botão de salvar*/}
            <Button
              type="submit"
              onClick={handleEditCourse}
              className="mt-4 flex cursor-pointer justify-between bg-purple-500 hover:bg-purple-600"
            >
              Adicionar
            </Button>
          </form>
          <div>
            <div className="grid gap-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
