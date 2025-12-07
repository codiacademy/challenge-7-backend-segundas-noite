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

import { createFranchise } from "@/services/unitsService";

interface FranchisesProps {
  name: string;
  trigger?: string;
  icon?: React.ComponentType<IconBaseProps>;
  onSuccess?: () => void;
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
    .min(11, { message: "O telefone deve conter no mínimo 11 dígitos" }),

  city: z
    .string({ message: "O campo cidade é obrigatório" })
    .min(3, { message: "A cidade deve conter no mínimo 3 caracteres" }),

  state: z
    .string({ message: "O campo estado é obrigatório" })
    .min(2, { message: "O estado deve conter no mínimo 2 caracteres" }),

  responsible: z
    .string({ message: "O campo responsável é obrigatório" })
    .min(3, { message: "O responsável deve conter no mínimo 3 caracteres" }),
});

type formSchema = z.infer<typeof formSchema>;

export function FranchisesForm({
  name,
  trigger,
  icon: Icon,
  onSuccess,
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
      await createFranchise({
        name: data.name,
        city: data.city,
        state: data.state,
        responsible: data.responsible,
        phoneNumber: data.phone,
        email: data.email,
        status: data.status,
      });

      toast.success("Franquia cadastrada com sucesso!");

      reset();

      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Erro ao cadastrar franquia");
      console.error(error);
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
            {Icon && <Icon />}
            {trigger}
          </Button>
        </DialogTrigger>

        <DialogContent className="p-3">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{name}</DialogDescription>

          <form onSubmit={handleSubmit(confirmFranquia)}>
            <div>
              <label>Nome da Franquia</label>
              <Input placeholder="Nome" {...register("name")} />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label>Cidade</label>
              <Input placeholder="Cidade" {...register("city")} />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </div>

            <div>
              <label>Estado</label>
              <Input placeholder="Estado" {...register("state")} />
              {errors.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <label>Responsável</label>
                <Input placeholder="Responsável" {...register("responsible")} />
                {errors.responsible && (
                  <span className="text-red-500">
                    {errors.responsible.message}
                  </span>
                )}
              </div>

              <div>
                <label>Telefone</label>
                <Input placeholder="Telefone" {...register("phone")} />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>

              <div>
                <label>Email</label>
                <Input placeholder="Email" {...register("email")} />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div>
                <label>Status</label>
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
                {errors.status && (
                  <span className="text-red-500">{errors.status.message}</span>
                )}
              </div>

              <Button
                type="submit"
                className="mt-4 w-fit cursor-pointer bg-purple-500 p-4 hover:bg-purple-600"
              >
                Salvar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
