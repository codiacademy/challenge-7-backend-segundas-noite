## 🚀 _1. Clonar o Repositório_

bash
git clone https://github.com/codiacademy/ChallengeVII-noite-rio-branco-segundas.git

bash
cd api

---

## 📦 _2. Instalar Dependências_

bash
npm install

---

## 🔧 _3. Variáveis de Ambiente_

Acesse o arquivo _.env.example, revise as configurações e crie seu arquivo \*\*.env_:
bash
cp .env.example .env

---

## 🗄 _4. Configurar o Banco de Dados (Migrations + Seed)_

### ✔ Rodar migrations

bash
npx prisma migrate dev

### ✔ Gerar seed

bash
npx prisma db seed

O seed cria usuários iniciais com papéis _Admin, \*\*Manager_ e _Accountant_.

---

## ▶ _5. Executar o Projeto_

### Ambiente de desenvolvimento

bash
npm run dev

### Ambiente de produção

bash
npm run build
npm start

---

## 🔑 _6. Autenticação (Admin / Manager / Accountant)_

O sistema utiliza autenticação baseada em _JWT_, com controle de permissões baseado no papel do usuário.

Roles disponíveis:

- _Admin_
- _Manager_
- _Accountant_

#Login $ Email: bruno@email.com $ Senha: 123456
O seed inicial já cria usuários com esses papéis.

---

## 📘 _7. Scripts Úteis_

json
npm run dev → executa o servidor em desenvolvimento
npm run build → gera build de produção
npm start → inicia o servidor em produção
npx prisma studio → abre interface visual do banco

---

## 🗂 _8. Estrutura Simplificada do Projeto_

root
├── apps
│ └── src
│ ├── modules
│ ├── middlewares
│ ├── routes
│ ├── seed
│ └── server.ts
├── prisma
│ ├── schema.prisma
│ └── seed.ts
├── package.json
├── .env.example
└── README.md

---

## 🧪 _9. Testar Endpoints_

### 🔗 Endpoints disponíveis

- _Users_: criar, listar, atualizar e deletar usuários
- _Sales_: registrar vendas, listar, atualizar e deletar
- _Expenses_: registrar despesas, listar, atualizar e deletar
- _Courses_: gerenciar cursos
- _Franchises_: gerenciar franquias
- _Metrics_: filtros diários, mensais e anuais de vendas e despesas
- *Autenticação: login por nível de acesso (*Admin / Manager / Accountant)

### 🧰 Dicas para teste

1. Certifique-se de que o servidor está rodando em http://localhost:3000.
2. Use os exemplos da seção _Migrations & Seed_ para ter dados iniciais.
3. Autentique-se primeiro (rota /login) quando necessário.
4. Caso utilize token JWT, configure como _Bearer Token_.

## 🐳 10. Executando com Docker

### _▶ Subir o projeto com Docker_

bash
docker-compose up --build

O backend iniciará automaticamente em: _http://localhost:3000_

### _▶ Rodar migrations + seed dentro do container_

Após o container subir, execute:
bash
docker exec -it challenge-7-backend-segundas-noite npx prisma migrate dev

bash
docker exec -it challenge-7-backend-segundas-noite npx prisma db seed

---

## 📦 Arquivos Docker adicionados

### _Dockerfile_

Dockerfile
FROM node:18

WORKDIR /app

COPY package\*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]

### _docker-compose.yml_

yaml
version: "3.9"
services:
api:
container_name: challenge-7-backend-segundas-noite
build: .
ports:

- "3000:3000"
  volumes:
- .:/app
  environment:
  DATABASE_URL: "file:./dev.db"
  command: sh -c "npm install && npx prisma migrate dev && npx prisma db seed && npm run dev"

## 📄 _11. Licença_

Este projeto está sob a licença MIT. Veja o arquivo LICENSE.md para mais detalhes.
