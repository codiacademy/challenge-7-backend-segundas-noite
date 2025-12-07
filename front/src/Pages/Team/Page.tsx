import { Aside } from "@/components/Aside";
import { NewUserModal } from "@/components/Team/NewUserModal";
import { AlterarModal } from "@/components/Team/EditUserModal";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { UserCard } from "@/components/Team/TeamCard";
import { Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

import { AllCollaborators } from "@/http/collaborator/allCollaborators";
import { DeleteUser } from "@/http/collaborator/deleteCollaborator";
import { toast } from "sonner";

{
  /* tipos dos dados dos usuarios */
}
export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  sector: string;
  status: string;
  wage: number;
  password: string;
};

export function Team() {
  const [users, setUsers] = useState<User[]>([]);

  const [userList, setUserList] = useState<User[]>([]);
  function handleEditUser(updatedUser: User) {
    setUserList((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  }

  async function handleDeleteUser(id: string) {
    const confirmDelete = window.confirm(
      "tem certeza que deseja deletar a despesa?",
    );
    if (!confirmDelete) return;
    try {
      await DeleteUser({ id });
      setUserList((prev) => prev.filter((user) => user.id !== id));
      toast.success("Despesa deletada com sucesso!");
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error("Voce nao tem permissao para deletar colaboradores");
      } else {
        toast.error("Erro ao deletar colaborador");
      }
    }
  }

  useEffect(() => {
    async function loadCollaborators() {
      try {
        const data = await AllCollaborators();
        setUserList(data); // preenche sua lista com o banco
      } catch (error) {
        console.error("Erro ao carregar colaboradores:", error);
      }
    }

    loadCollaborators();
  }, []);

  {
    /* Cadastro de novo user */
  }
  const [isOpenNew, setIsOpenNew] = useState(false);
  function handleOpenModalNew() {
    setIsOpenNew(!isOpenNew);
  }

  {
    /* Achar user */
  }
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  {
    /* Modal de editar usuario */
  }
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  function handleOpenModalEdit(userId: string) {
    setIsOpenEdit(!isOpenEdit);
    setSelectedUser(userList.find((user) => user.id === userId) || null);
  }
  function closeEditModal() {
    setIsOpenEdit(false);
    setSelectedUser(null);
  }
  {
    /* Sistema de filtro */
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCargo, setSelectedCargo] = useState<string>("all");
  const filteredUsers = userList.filter((user) => {
    const matchesCargo =
      selectedCargo === "all" || user.sector === selectedCargo;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      user?.name?.toLowerCase().includes(search) ||
      user?.email?.toLowerCase().includes(search);

    return matchesCargo && matchesSearch;
  });

  {
    /* Calculos dos totais de membros, membros ativos, departamentos, folha de pagamento */
  }
  const totalMembros = filteredUsers.length;
  const membrosAtivos = filteredUsers.filter(
    (user) => user.status === "ATIVO",
  ).length;
  const departamentosUnicos = new Set(filteredUsers.map((user) => user.sector));
  const totalDepartamentos = departamentosUnicos.size;
  const folhaPagamento = filteredUsers.reduce(
    (acc, user) => acc + user.wage,
    0,
  );

  return (
    <div className="flex h-screen">
      <Aside />

      <div className="flex w-full flex-col gap-8 overflow-auto bg-gray-100 p-5">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">Gestão de Equipe</h1>
            <p className="text-[18px] text-gray-500">
              Gerencie membros da equipe e suas informações
            </p>
          </div>
          <div className="w-full lg:w-fit">
            <button
              onClick={handleOpenModalNew}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#A243D2] px-5 py-3 text-white"
            >
              <UserPlus />
              <span>Novo Membro</span>
            </button>
          </div>
        </div>

        {/* input */}
        <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 shadow lg:flex-row">
          <div className="flex items-center gap-3 rounded-lg border px-3 py-2 md:w-full lg:w-5/6">
            <Search />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou e-mail..."
              className="w-full outline-none"
            />
          </div>
          <div className="h-full md:w-full lg:w-1/6">
            <Select
              value={selectedCargo}
              onValueChange={(value) => setSelectedCargo(value)}
            >
              <SelectTrigger className="flex w-full cursor-pointer p-5">
                <SelectValue placeholder="Todos os cargos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os cargos</SelectItem>
                <SelectItem value="Instrutor">Instrutor</SelectItem>
                <SelectItem value="Coordenador">Coordenador</SelectItem>
                <SelectItem value="Assistente">Assistente</SelectItem>
                <SelectItem value="Gerente">Gerente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              departament={user.sector}
              email={user.email}
              phone={user.phoneNumber}
              status={user.status}
              cargo={user.sector}
              openEdit={() => handleOpenModalEdit(user.id)}
              onDelete={() => handleDeleteUser(user.id)}
            />
          ))}
        </div>

        {/* Dados */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="flex h-34 flex-col items-center justify-center rounded-lg border bg-white">
            <span className="text-4xl font-bold text-[#A243D2]">
              {totalMembros}
            </span>
            <span>Total de Membros</span>
          </div>
          <div className="flex h-34 flex-col items-center justify-center rounded-lg border bg-white">
            <span className="text-4xl font-bold text-green-600">
              {membrosAtivos}{" "}
            </span>
            <span>Membros ativos</span>
          </div>
          <div className="flex h-34 flex-col items-center justify-center rounded-lg border bg-white">
            <span className="text-4xl font-bold text-blue-600">
              {totalDepartamentos}
            </span>
            <span>Departamentos</span>
          </div>
          <div className="flex h-34 flex-col items-center justify-center rounded-lg border bg-white">
            <span className="text-xl font-bold text-orange-600 lg:text-4xl">
              {folhaPagamento.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="text-[14px] lg:text-[18px]">
              Folha de pagamento
            </span>
          </div>
        </div>
      </div>

      {/* Renderizando os modais na tela */}
      <div>
        {isOpenNew && (
          <NewUserModal
            haandleOpenModalNew={handleOpenModalNew}
            onAddUser={(user) => setUserList((prev) => [...prev, user])}
          />
        )}
        {isOpenEdit && (
          <AlterarModal
            close={closeEditModal}
            user={selectedUser}
            onEditUser={handleEditUser}
          />
        )}
      </div>
    </div>
  );
}
