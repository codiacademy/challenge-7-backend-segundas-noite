import { Save, X } from "lucide-react";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "../../Pages/Team/Page";
import { useState } from "react";

import { toast } from "sonner";
import { UpdateCollaborator } from "@/http/collaborator/updateCollaborator";

type modalProps = {
  close: () => void;
  user: User | null;
  onEditUser: (user: User) => void;
};

export function AlterarModal({ close, user, onEditUser }: modalProps) {
  const [name, setName] = useState(user?.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [wage, setWage] = useState(user?.wage ?? 0);
  const [sector, setSector] = useState(user?.sector ?? "");
  const [status, setStatus] = useState(user?.status ?? undefined);

  async function handleEditUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      const updatedUser = await UpdateCollaborator({
        id: user!.id,
        name,
        email,
        phoneNumber,
        wage: Number(wage),
        sector,
        status: status as "ATIVO" | "INATIVO" | "FERIAS",
      });

      onEditUser(updatedUser.user);
      toast.success("Colaborador editado com sucesso!");
      close();
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error("Voce nao tem permissao para editar colaboradores");
      } else {
        toast.error("Erro ao editar colaborador");
      }
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-3">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-10">
        <div className="mb-6 flex items-center justify-between text-black">
          <h1 className="text-xl font-semibold">Editar colaborador</h1>
          <button className="cursor-pointer hover:text-red-500" onClick={close}>
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Dados Pessoais:</h1>
          <form className="flex flex-col gap-3">
            <div className="flex w-full gap-3">
              <div className="flex w-1/2 flex-col">
                <label> Nome: </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
                />
              </div>
              <div className="flex w-1/2 flex-col">
                <label>Telefone: </label>
                <input
                  required
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
                />
              </div>
            </div>
            <div className="flex w-full flex-col">
              <label> Email: </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label> Salario:</label>
              <input
                required
                value={wage}
                onChange={(e) => setWage(Number(e.target.value))}
                type="number"
                className="rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
              />
            </div>

            <div>
              <label> Cargo: </label>
              <Select required value={sector} onValueChange={setSector}>
                <SelectTrigger className="border border-gray-300 p-5 shadow-lg">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADIMIN">Adimin</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label> Status:</label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger className="w-full border border-gray-300 p-5 shadow-lg">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATIVO">ATIVO</SelectItem>
                  <SelectItem value="INATIVO">INATIVO</SelectItem>
                  <SelectItem value="FERIAS">FERIAS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              type="submit"
              onClick={handleEditUser}
              className="flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#A243D2] py-3 font-bold text-white"
            >
              <Save /> Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
