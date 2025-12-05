import { Save, X } from "lucide-react";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "../../Pages/Team/Page";

type modalProps = {
  close: () => void;
  user: User | null;
};

export function AlterarModal({ close, user }: modalProps) {
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
                  value={user?.name}
                  required
                  className="w-full rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
                />
              </div>
              <div className="flex w-1/2 flex-col">
                <label>Telefone: </label>
                <input
                  required
                  type="text"
                  value={user?.phoneNumber}
                  className="w-full rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
                />
              </div>
            </div>
            <div className="flex w-full flex-col">
              <label> Email: </label>
              <input
                required
                type="email"
                value={user?.email}
                className="rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label> Salario:</label>
              <input
                required
                value={user?.wage}
                type="number"
                className="rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
              />
            </div>

            <div>
              <label> Cargo: </label>
              <Select required>
                <SelectTrigger
                  value={user?.sector}
                  className="border border-gray-300 p-5 shadow-lg"
                >
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Desenvolvedor">Desenvolvedor</SelectItem>
                  <SelectItem value="Mentor">Mentor</SelectItem>
                  <SelectItem value="CEO">CEO</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Receptionista">Receptionista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label> Status:</label>
              <Select value={user?.status} required>
                <SelectTrigger className="w-full border border-gray-300 p-5 shadow-lg">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ATIVO</SelectItem>
                  <SelectItem value="INACTIVE">INATIVO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              type="submit"
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
