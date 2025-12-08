import { CreateCourse } from "@/http/courses/createCourse";
import type { Courses } from "@/Pages/Courses/Page";
import { useState } from "react";
import { Button } from "@/components/Dashboard/Button";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";
import { z } from "zod";
import { X } from "lucide-react";

type modalProps = {
  handleOpenModalNew: () => void;
  onAddCourse: (course: Courses) => void;
};
const formSchema = z.object({
  title: z.string({
    message: "O campo nome do curso é obrigatório",
  }),

  description: z.string().optional(),

  status: z.enum(["ATIVO", "INATIVO"], {
    message: "O Campo status do curso é obrigatório",
  }),

  value: z.coerce.number({ message: "O campo valor é obrigatório" }),
});

type formSchema = z.infer<typeof formSchema>;

export function NewCourseModal({
  handleOpenModalNew,
  onAddCourse,
}: modalProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<formSchema>({ resolver: zodResolver(formSchema) });

  async function handleAddCourse(data: formSchema) {
    const newCourse = await CreateCourse({
      name: data.title,
      description: data.description ?? "",
      status: data.status,
      value: data.value,
      image: "", //
    });

    onAddCourse(newCourse);

    toast.success("Curso criado com sucesso!");
    console.log(newCourse);
    handleOpenModalNew();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-3">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-10">
        <div className="mb-6 flex items-center justify-between text-black">
          <h1 className="text-xl font-semibold">Adicionar Curso</h1>
          <button
            className="cursor-pointer hover:text-red-500"
            onClick={handleOpenModalNew}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Dados do curso:</h1>
          <form className="grid gap-3" onSubmit={handleSubmit(handleAddCourse)}>
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
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="rounded-md border-black">
                      <SelectValue placeholder="Status do curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ATIVO">Ativo</SelectItem>
                      <SelectItem value="INATIVO">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/*Inputs de nome e descrição do curso*/}
            <div className="grid gap-3">
              <div className="">
                <label htmlFor="">Nome do curso</label>
                <Input
                  type="text"
                  placeholder="Nome do curso"
                  className="rounded-md border border-black p-3"
                  required
                  {...register("title")}
                />
                {errors?.title && (
                  <p className="text-left text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="">Descrição do curso</label>
                <Input
                  type="text"
                  placeholder="Descrição"
                  className="rounded-md border border-black p-3"
                  required
                  {...register("description")}
                />
                {errors?.description && (
                  <p className="text-left text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/*Input de valor*/}
            <div>
              <label htmlFor="">Insira o valor do curso</label>
              <Input
                type="number"
                min={0}
                placeholder="Insira o valor do curso"
                className="rounded-md border border-black p-3"
                {...register("value", { valueAsNumber: true })}
              />
              {errors?.value && (
                <p className="text-left text-sm text-red-500">
                  {errors.value.message}
                </p>
              )}
            </div>

            {/*Botão de salvar*/}
            <Button
              type="submit"
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
