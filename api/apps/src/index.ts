import express from "express";

// import router from './functions/users/delete-users'
import { router as createUser } from "./functions/users/create-users";
import { router as getAll } from "./functions/users/get-all-users";

import { router as createExpenses } from "./functions/expenses/create-expenses";
import { router as getAllExpenses } from "./functions/expenses/get-all-expenses";

import { router as updateExpenses } from "./functions/expenses/update-expenses";
const app = express();

app.use(express.json());
//Router Collaborator
// app.use(router)
app.use(createUser);
app.use(getAll);

//Router Expenses
app.use(createExpenses);
app.use(getAllExpenses);

app.use(updateExpenses);

// Informando onde o servidor estará rodando
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
