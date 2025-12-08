import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { IconBaseProps } from "react-icons";
import { Updatesales } from "@/http/sales/updateSales";
import { AllCourses } from "@/http/courses/allCourses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Salesprops {
  title?: string;
  description?: string;
  trigger?: string;
  icon?: React.ComponentType<IconBaseProps>;
  initialData?: {
    id: string;
    name?: string;
    type?: "Online" | "Presencial";
    email?: string;
    phone?: string;
    courseId?: string;
    grossValue?: number;
    discount?: number;
    commission?: number;
    tax?: number;
    cardTax?: number;
    valorLiquido?: number;
  };
  onSuccess?: () => void;
}

const formSchema = z.object({
  modality: z.enum(["Online", "Presencial"], {
    message: "O campo modalidade é obrigatório",
  }),
  courseId: z.string().uuid({ message: "Selecione um curso" }),

  name: z
    .string()
    .min(5, { message: "O nome deve conter no mínimo 5 caracteres" }),
  email: z.string().email({ message: "Digite um email válido" }),
  phone: z
    .string()
    .min(11, { message: "O número deve conter no mínimo 11 dígitos" }),
  grossValue: z.coerce.number({ message: "O valor bruto é obrigatório" }),
  discount: z.coerce.number({ message: "O desconto é obrigatório" }),
  commission: z.coerce.number({ message: "A comissão é obrigatória" }),
  tax: z.coerce.number({ message: "O imposto é obrigatório" }),
  cardTax: z.coerce.number({ message: "A taxa do cartão é obrigatória" }),
  netvalue: z.coerce.number().optional(),
});

type formSchema = z.infer<typeof formSchema>;

interface Course {
  id: string;
  name: string;
}

export function UpdateSalesForm({
  title,
  description,
  trigger,
  icon: Icon,
  initialData,
  onSuccess,
}: Salesprops) {
  const queryClient = useQueryClient();
  const [courses, setCourses] = useState<Course[]>([]);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modality:
        initialData?.type === "Online" || initialData?.type === "Presencial"
          ? initialData.type
          : undefined,
      courseId: initialData?.courseId,
      name: initialData?.name,
      email: initialData?.email,
      phone: initialData?.phone,
      grossValue: initialData?.grossValue,
      discount: initialData?.discount,
      commission: initialData?.commission,
      tax: initialData?.tax,
      cardTax: initialData?.cardTax,
      netvalue: initialData?.valorLiquido,
    },
  });

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await AllCourses();
        setCourses(data);
      } catch (err) {
        console.log("Erro ao carregar cursos:", err);
      }
    }
    loadCourses();
  }, []);

  useEffect(() => {
    if (initialData) {
      reset({
        modality:
          initialData?.type === "Online" || initialData?.type === "Presencial"
            ? initialData.type
            : undefined,
        courseId: initialData.courseId ?? undefined,
        name: initialData.name ?? "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        grossValue: initialData.grossValue ?? 0,
        discount: initialData.discount ?? 0,
        commission: initialData.commission ?? 0,
        tax: initialData.tax ?? 0,
        cardTax: initialData.cardTax ?? 0,
        netvalue: initialData.valorLiquido ?? 0,
      });
    }
  }, [initialData, reset]);

  const mutation = useMutation({
    mutationFn: async (data: formSchema) => {
      if (!initialData?.id) throw new Error("Venda não localizada");
      await Updatesales({
        id: initialData.id,
        Modalidade: data.modality,
        courseId: data.courseId,
        nomeAluno: data.name,
        email: data.email,
        telefone: data.phone,
        valorBruto: data.grossValue,
        desconto: data.discount,
        comisao: data.commission,
        imposto: data.tax,
        taxacartao: data.cardTax,
        valorLiquido: data.netvalue,
      });
    },
    onSuccess: () => {
      toast.success("Venda atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      onSuccess?.();
      reset();
    },
    onError: () => toast.error("Erro ao atualizar venda"),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`${
            trigger === "Nova venda"
              ? "bg-[#A243D2] px-5 py-3 text-white transition duration-[1s] hover:bg-purple-700"
              : "flex h-9 w-9 items-center justify-center rounded-sm border bg-white transition duration-[0.5s] hover:bg-gray-300"
          } flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg`}
        >
          {Icon && <Icon />}
          {trigger}
        </button>
      </DialogTrigger>

      <DialogContent className="p-3">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <label>Modalidade do curso</label>
          <Controller
            name="modality"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.modality && (
            <span className="text-left text-sm text-red-500">
              {errors.modality.message}
            </span>
          )}

          <label>Curso</label>
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((curso) => (
                    <SelectItem key={curso.id} value={curso.id}>
                      {curso.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.courseId && (
            <span className="text-left text-sm text-red-500">
              {errors.courseId.message}
            </span>
          )}

          <div>
            <label>Nome do aluno</label>
            <Input placeholder="Nome do aluno" {...register("name")} />
            {errors?.name && (
              <span className="text-left text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label>E-mail</label>
            <Input placeholder="E-mail" type="email" {...register("email")} />
            {errors?.email && (
              <span className="text-left text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label>Telefone</label>
            <Input placeholder="Telefone" type="tel" {...register("phone")} />
            {errors?.phone && (
              <span className="text-left text-sm text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>

          <h1 className="m-4 font-medium">Dados da venda:</h1>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label>Valor Bruto</label>
              <Input type="number" {...register("grossValue")} />
              {errors?.grossValue && (
                <span className="text-left text-sm text-red-500">
                  {errors.grossValue.message}
                </span>
              )}
            </div>
            <div>
              <label>Desconto (%)</label>
              <Input type="number" {...register("discount")} />
              {errors.discount && (
                <span className="text-left text-sm text-red-500">
                  {errors.discount.message}
                </span>
              )}
            </div>
            <div>
              <label>Comissão (%)</label>
              <Input type="number" {...register("commission")} />
              {errors.commission && (
                <span className="text-left text-sm text-red-500">
                  {errors.commission.message}
                </span>
              )}
            </div>
            <div>
              <label>Imposto</label>
              <Input type="number" {...register("tax")} />
              {errors?.tax && (
                <span className="text-left text-sm text-red-500">
                  {errors.tax.message}
                </span>
              )}
            </div>
            <div>
              <label>Taxa do cartão</label>
              <Input type="number" {...register("cardTax")} />
              {errors?.cardTax && (
                <span className="text-left text-sm text-red-500">
                  {errors.cardTax.message}
                </span>
              )}
            </div>
          </div>

          <Button
            className="mt-4 bg-purple-500 hover:bg-purple-600"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
