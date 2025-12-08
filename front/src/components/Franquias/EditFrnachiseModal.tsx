import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { updateFranchise } from "@/services/unitsService";
import { toast } from "sonner";
import { Controller } from "react-hook-form";
import { Select } from "react-day-picker";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EditFranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  franchise: any;
  onSuccess: () => void;
}

export function EditFranchiseModal({
  isOpen,
  onClose,
  franchise,
  onSuccess,
}: EditFranchiseModalProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (franchise) {
      setName(franchise.name || "");
      setCity(franchise.city || "");
    }
  }, [franchise]);

  const handleSave = async () => {
    try {
      await updateFranchise(franchise.id, { name, city });
      toast.success("Franquia atualizada com sucesso!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Erro ao atualizar franquia");
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Franquia</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label>Nome da Unidade</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label>Cidade</label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label>Estado</label>
            <Input value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label>Responsabel</label>
            <Input
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Telefone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
