import { Aside } from "@/components/Aside";

import { CourseCard } from "@/components/Courses/CourseCard";

import { AllCourses } from "@/http/courses/allCourses";
import { DeleteCourse } from "@/http/courses/deleteCourse";

import { toast } from "sonner";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock,
  Star,
  UserPlus,
  UsersRound,
} from "lucide-react";

import { useEffect, useState } from "react";
import { NewCourseModal } from "@/components/Courses/newCoursesModal";
import { AlterarModal } from "@/components/Courses/EditCourseModal";
import { CardsReportsCourse } from "@/components/Courses/CardsReportCourse";

export type Courses = {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
  value: number;
};
export function Courses() {
  const [courses, setCourses] = useState<Courses[]>([]);

  const filteredCourses = (courses ?? []).filter((course) =>
    ["ATIVO", "INATIVO"].includes(course?.status?.toUpperCase() ?? ""),
  );

  function handleEditCourse(updatedCourse: Courses) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course,
      ),
    );
  }
  async function handleDeleteCourse(id: string) {
    const confirmDelete = window.confirm(
      "tem certeza que deseja deletar o curso?",
    );
    if (!confirmDelete) return;
    try {
      await DeleteCourse({ id });
      setCourses((prev) => prev.filter((course) => course.id !== id));
      toast.success("Despesa deletada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar despesa");
    }
  }

  useEffect(() => {
    async function loadCollaborators() {
      try {
        const data = await AllCourses();
        setCourses(data); // preenche sua lista com o banco
      } catch (error) {
        console.error("Erro ao carregar colaboradores:", error);
      }
    }
    loadCollaborators();
  }, []);

  const [isOpenNew, setIsOpenNew] = useState(false);
  function handleOpenModalNew() {
    setIsOpenNew(!isOpenNew);
  }
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Courses | null>(null);
  function handleOpenModalEdit(courseId: string) {
    setSelectedCourse(courses.find((course) => course.id === courseId) || null);
    setIsOpenEdit(true);
  }
  function closeEditModal() {
    setIsOpenEdit(false);
    setSelectedCourse(null);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Aside />
      <div className="flex w-full flex-col gap-2 overflow-auto p-5">
        {/*Header*/}
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">Cursos</h1>
            <p className="text-[18px] text-gray-500">
              Gerencie o catálogo de cursos da escola
            </p>
          </div>

          <div className="w-full lg:w-fit">
            <button
              onClick={handleOpenModalNew}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#A243D2] px-5 py-3 text-white"
            >
              <UserPlus />
              <span>Novo Curso</span>
            </button>
          </div>
        </div>
        {/*Cards com os tipos de despesas*/}
        <section className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <CardsReportsCourse
            title={"Total de cursos"}
            value={courses.length}
            color={"white"}
            icon={BookOpen}
            bgColor={"white"}
            iconColor="blue-500"
          />
          <CardsReportsCourse
            title={"Cursos Ativos"}
            value={courses.filter((course) => course.status === "ATIVO").length}
            color={"white"}
            icon={CircleDot}
            bgColor={"white"}
            iconColor="green-500"
          />
          <CardsReportsCourse
            title={"Total de alunos"}
            value={1}
            color={"white"}
            icon={UsersRound}
            bgColor={"white"}
            iconColor="purple-500"
          />
          <CardsReportsCourse
            title={"Avaliação média"}
            value={4.7}
            color={"white"}
            icon={Star}
            bgColor={"white"}
            iconColor="yellow-500"
          />
        </section>
        <section className="grid gap-3 lg:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.name}
              imageUrl={course.image}
              status={course.status}
              description={course.description}
              price={course.value}
              icon={UsersRound}
              iconMain={Clock}
              iconSecundary={Star}
              hours={200}
              rating={4.5}
              students={1000}
              id={course.id}
              openEdit={() => handleOpenModalEdit(course.id)}
              onDelete={(id) => handleDeleteCourse(id)}
            />
          ))}
        </section>
        {/*Botões de paginação*/}
        <div className="mt-1 mr-1 flex justify-end gap-1">
          <ChevronLeft className="h-10 w-10 rounded-[8px] border-2 transition duration-[2s] hover:bg-gray-400" />
          <ChevronRight className="h-10 w-10 rounded-[8px] border-2 transition duration-[2s] hover:bg-gray-400" />
        </div>
      </div>
      <div>
        {isOpenNew && (
          <NewCourseModal
            handleOpenModalNew={handleOpenModalNew}
            onAddCourse={(course) => setCourses((prev) => [...prev, course])}
          />
        )}
        {isOpenEdit && (
          <AlterarModal
            close={closeEditModal}
            course={selectedCourse}
            onEditCourse={handleEditCourse}
          />
        )}
      </div>
    </div>
  );
}
