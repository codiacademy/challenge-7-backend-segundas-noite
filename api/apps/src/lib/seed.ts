import { prisma } from "./prisma.ts";
import { hash } from "bcryptjs";

async function Seed() {
  const passwordHash = await hash("123456", 10);

  await prisma.collaborator.createMany({
    data: [
      {
        name: "Bruno",
        phoneNumber: "123456781",
        email: "bruno@email.com",
        wage: 2500,
        sector: "ADIMIN",
        status: "ATIVO",
        password: passwordHash,
      },
      {
        name: "Manager",
        phoneNumber: "123456782",
        email: "manager@gmail.com",
        wage: 1850,
        sector: "MANAGER",
        status: "ATIVO",
        password: passwordHash,
      },
      {
        name: "Accountant",
        phoneNumber: "123456783",
        email: "accountant@gmail.com",
        wage: 1500,
        sector: "ACCOUNTANT",
        status: "ATIVO",
        password: passwordHash,
      },
    ],
  });
}

Seed()
  .then(() => {
    console.log("Seed executada com sucesso 💉");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
