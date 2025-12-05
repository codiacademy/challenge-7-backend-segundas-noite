import { X } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
type modalProps = {
  haandleOpenModalNew: () => void;
  onAddUser: (user: User) => void;
};
import type { User } from "../../Pages/Team/Page";
import { CreateCollaborator } from "@/http/collaborator/createCollaborator";
import { toast } from "sonner";

export function NewUserModal({ haandleOpenModalNew, onAddUser }: modalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salario, setSalario] = useState("");
  const [sector, setSector] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();

    const newUser: User = await CreateCollaborator({
      id: String(Date.now()),
      name,
      email,
      phoneNumber,
      wage: Number(salario),
      sector,
      status,
      password,
    });

    onAddUser(newUser);
    toast.success("Colaborador criado com sucesso!");
    haandleOpenModalNew();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-3">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-10">
        <div className="mb-6 flex items-center justify-between text-black">
          <h1 className="text-xl font-semibold">Adicionar Colaborador</h1>
          <button
            className="cursor-pointer hover:text-red-500"
            onClick={haandleOpenModalNew}
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Dados Pessoais:</h1>
          <form className="flex flex-col gap-3" onSubmit={handleAddUser}>
            <div className="flex w-full gap-3">
              <div className="flex w-1/2 flex-col">
                <label> Nome: </label>
                <input
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
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
                type="number"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                className="rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
              />
            </div>

            <div>
              <label> Cargo:</label>
              <Select value={sector} onValueChange={setSector} required>
                <SelectTrigger className="border border-gray-300 p-5 shadow-lg">
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
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger className="w-full border border-gray-300 p-5 shadow-lg">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATIVO">ATIVO</SelectItem>
                  <SelectItem value="INATIVO">INATIVO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label> Senha:</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-gray-300 p-1 shadow-lg outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex cursor-pointer items-center justify-center rounded-lg bg-[#A243D2] py-3"
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
