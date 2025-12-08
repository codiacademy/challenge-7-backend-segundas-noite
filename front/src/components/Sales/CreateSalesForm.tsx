import {
  DialogContent,
  DialogTrigger,
  Dialog,
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
import { useEffect, useState } from "react";
import { Createsales } from "@/http/sales/createSales";
import { AllCourses } from "@/http/courses/allCourses";

interface Salesprops {
  title?: string;
  description?: string;
  trigger?: string;
  icon?: React.ComponentType<IconBaseProps>;
  onSuccess: () => void;
}

const formSchema = z.object({
  modality: z.enum(["Online", "Presencial"], {
    message: "O campo modalidade de curso é obrigatório",
  }),
  courseId: z.string({ message: "Selecione um curso" }),
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
});

type formSchema = z.infer<typeof formSchema>;

export function SalesForm({
  title,
  description,
  trigger,
  icon: Icon,
  onSuccess,
}: Salesprops) {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  interface Course {
    id: string;
    name: string;
  }
  const [courses, setCourses] = useState<Course[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await AllCourses();
        setCourses(data);
      } catch (error) {
        console.log("Erro ao carregar cursos:", error);
      }
    }
    loadCourses();
  }, []);

  async function confirmSale(data: formSchema) {
    try {
      setIsSubmitting(true);

      const payload = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : String(Date.now()),
        Modalidade: data.modality,
        courseId: data.courseId,
        nomeAluno: data.name,
        email: data.email,
        telefone: data.phone,
        valorBruto: data.grossValue,
        desconto: data.discount,
        comisao: data.commission,
        imposto: data.tax,
        taxaCartao: data.cardTax,
        // ⚡ Não enviamos valorLiquido nem dataVenda, o backend calcula
      };

      await Createsales(payload);
      toast.success("Venda cadastrada com sucesso!");
      reset();
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar venda");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={`${
              trigger === "Nova venda"
                ? "bg-[#A243D2] px-5 py-3 text-white transition duration-[1s] hover:bg-purple-700"
                : "flex h-9 w-9 items-center justify-center rounded-sm border bg-white transition duration-[0.5s] hover:bg-gray-300"
            } flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg`}
          >
            <div className="flex items-center justify-center">
              {Icon && <Icon />}
            </div>
            {trigger}
          </button>
        </DialogTrigger>

        <DialogContent className="p-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>

          <form onSubmit={handleSubmit(confirmSale)}>
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
              <label className="text-left">Nome do aluno</label>
              <Input
                placeholder="Nome do aluno"
                type="text"
                {...register("name")}
                required
              />
              {errors?.name && (
                <span className="mb-4 text-left text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label>E-mail</label>
              <Input
                placeholder="E-mail"
                type="email"
                {...register("email")}
                required
              />
              {errors?.email && (
                <span className="text-left text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label>Telefone</label>
              <Input
                placeholder="Telefone"
                type="tel"
                {...register("phone")}
                required
              />
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
                <Input
                  placeholder="Valor Bruto"
                  type="number"
                  {...register("grossValue")}
                  required
                />
                {errors?.grossValue && (
                  <span className="text-left text-sm text-red-500">
                    {errors.grossValue.message}
                  </span>
                )}
              </div>

              <div>
                <label>Desconto (%)</label>
                <Input
                  placeholder="Desconto"
                  type="number"
                  {...register("discount")}
                  required
                />
                {errors.discount && (
                  <span className="text-left text-sm text-red-500">
                    {errors.discount.message}
                  </span>
                )}
              </div>

              <div>
                <label>Comissão (%)</label>
                <Input
                  placeholder="Comissão"
                  type="number"
                  {...register("commission")}
                  required
                />
                {errors.commission && (
                  <span className="text-left text-sm text-red-500">
                    {errors.commission.message}
                  </span>
                )}
              </div>

              <div>
                <label>Imposto (%)</label>
                <Input
                  placeholder="Imposto"
                  type="number"
                  {...register("tax")}
                  required
                />
                {errors?.tax && (
                  <span className="text-left text-sm text-red-500">
                    {errors.tax.message}
                  </span>
                )}
              </div>

              <div>
                <label>Taxa do cartão (%)</label>
                <Input
                  placeholder="Taxa do cartão"
                  type="number"
                  {...register("cardTax", { valueAsNumber: true })}
                  required
                />
                {errors?.cardTax && (
                  <span className="text-left text-sm text-red-500">
                    {errors.cardTax.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              className="mt-4 cursor-pointer justify-between bg-purple-500 p-4 hover:bg-purple-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
