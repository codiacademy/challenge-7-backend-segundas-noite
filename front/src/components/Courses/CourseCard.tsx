import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import type { IconBaseProps } from "react-icons";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
type CourseCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  status: string;
  description: string;
  students: number;
  hours: number;
  rating: number;
  icon?: React.ComponentType<IconBaseProps>;
  iconMain?: React.ComponentType<IconBaseProps>;
  iconSecundary?: React.ComponentType<IconBaseProps>;
  price: number;
  openEdit: () => void;
  onDelete: (id: string) => void;
};
export function CourseCard({
  id,
  imageUrl,
  title,
  status,
  description,
  students,
  hours,
  rating,
  icon: Icon,
  iconMain: IconMain,
  iconSecundary: IconSecundary,
  price,
  openEdit,
  onDelete,
}: CourseCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <Card className="relative flex w-full flex-col gap-4 overflow-hidden lg:w-76">
        <CardHeader className="w-full border">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="absolute top-0 left-0 h-45 w-full object-cover"
              alt={`Imagem do curso ${title}`}
            />
          ) : (
            <div className="absolute top-0 left-0 flex h-45 w-full items-center justify-center bg-gray-200 text-gray-500">
              Sem imagem
            </div>
          )}
        </CardHeader>

        <CardContent className="mt-36">
          <div className="flex justify-between">
            <CardTitle className="bold">{title}</CardTitle>
            <span className="bold w-14 rounded-full bg-sky-400 text-center text-white">
              {status}
            </span>
          </div>

          <CardDescription className="mt-2 text-zinc-400">
            {description}
          </CardDescription>
          <CardDescription className="mt-4 flex justify-between">
            <span className="flex flex-row gap-1">
              {Icon && <Icon size={18} className="text-zinc-500" />}
              {students}
            </span>
            <span className="flex flex-row gap-1">
              {IconMain && <IconMain size={18} className="text-zinc-500" />}
              {hours}
            </span>
          </CardDescription>
          <CardDescription className="mt-3 flex justify-between">
            <span className="flex flex-row gap-1">
              {IconSecundary && (
                <IconSecundary
                  size={18}
                  className="fill-yellow-500 text-yellow-500"
                />
              )}{" "}
              {rating}
            </span>
            <span className="text-[20px] font-bold text-blue-500">
              R$ {price}
            </span>
          </CardDescription>
          <CardDescription>
            <div className="flex gap-2">
              <button
                onClick={openEdit}
                className="flex w-11/12 cursor-pointer items-center justify-center gap-3 rounded-lg border p-2 font-bold hover:bg-gray-100"
              >
                <SquarePen />
                Editar
              </button>
              <button
                onClick={() => id && onDelete(id)}
                disabled={!id || isDeleting}
                className="flex cursor-pointer items-center justify-center rounded-lg border p-2 font-bold text-red-500 hover:bg-gray-100"
              >
                <Trash2 />
              </button>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
