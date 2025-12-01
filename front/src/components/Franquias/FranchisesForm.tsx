//Formulário de vendas
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
  SelectGroup,
  SelectItem,
  SelectLabel,
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

interface FranchisesProps {
  name: string;
  city?: string;
  state?: string;
  responsible?: string;
  phone?: string;
  email?: string;
  trigger?: string;
  status?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const formSchema = z.object({
  status: z.enum(["ATIVO", "INATIVO"], {
    message: "O campo status da franquia é obrigatório",
  }),

  name: z
    .string({ message: "O campo nome é obrigatório" })
    .min(5, { message: "O nome deve conter no mínimo 5 caracteres" }),

  email: z
    .string({ message: "O campo email é obrigatório" })
    .email({ message: "Digite um email válido" }),

  phone: z
    .string({ message: "O campo telefone é obrigatório" })
    .min(11, { message: "O número deve conter no mínimo 11 dígitos" }),

  city: z
    .string({ message: "O campo city é obrigatório" })
    .min(5, { message: "O nome deve conter no mínimo 5 caracteres" }),
  state: z
    .string({ message: "O campo state é obrigatório" })
    .min(5, { message: "O nome deve conter no mínimo 5 caracteres" }),
  responsible: z
    .string({ message: "O campo responsavel é obrigatório" })
    .min(5, { message: "O nome deve conter no mínimo 5 caracteres" }),
});

type formSchema = z.infer<typeof formSchema>;

export function FranchisesForm({
  name,
  city,
  state,
  responsible,
  phone,
  email,
  status,
  trigger,
  icon: Icon,
}: FranchisesProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  async function confirmFranquia(data: formSchema) {
    try {
      console.log(data);

      toast.success("Franquia cadastrada com sucesso!");

      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error("Erro ao cadastrar venda");
      }
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`${
              trigger === "Nova Franquia"
                ? "bg-[#A243D2] px-5 py-3 text-white transition duration-[1s] hover:bg-purple-700"
                : "flex h-9 w-9 items-center justify-center rounded-sm border bg-white transition duration-[0.5s] hover:bg-gray-300"
            } flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg`}
          >
            <div className="flex items-center justify-center">
              {Icon && <Icon />}
            </div>

            {trigger}
          </Button>
        </DialogTrigger>

        <DialogContent className="p-3">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{name}</DialogDescription>
          <form onSubmit={handleSubmit(confirmFranquia)}>
            <div>
              <label className="text-left">Nome da Franquia</label>
              <Input
                placeholder="Nome da Franquia"
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
              <label htmlFor="">Cidade</label>
              <Input
                placeholder="Cidade"
                type="text"
                {...register("city")}
                required
              />
              {errors?.city && (
                <span className="text-left text-sm text-red-500">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="">Estado</label>
              <Input
                placeholder="Estado"
                type="text"
                {...register("state")}
                required
              />
              {errors?.state && (
                <span className="text-left text-sm text-red-500">
                  {errors.state.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="">Responsalve</label>
                <Input
                  placeholder="Responsavel pela franquia"
                  type="text"
                  {...register("responsible")}
                  required
                />
                {errors?.responsible && (
                  <span className="text-left text-sm text-red-500">
                    {errors.responsible.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="">Telefone da Franquia</label>
                <Input
                  placeholder="Telefone da Franquia"
                  type="tel"
                  {...register("phone")}
                  required
                />
                {errors.phone && (
                  <span className="text-left text-sm text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="">Email</label>
                <Input
                  placeholder="Email da Franquia"
                  type="email"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <span className="text-left text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="">Status</label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="ATIVO">Ativa</SelectItem>
                          <SelectItem value="INATIVO">Inativa</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <Button className="mt-4 w-fit cursor-pointer justify-between bg-purple-500 p-4 hover:bg-purple-600">
                Salvar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
