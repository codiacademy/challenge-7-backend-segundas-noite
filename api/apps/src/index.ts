import express from 'express'

// import router from './functions/users/delete-users'
import { router as createUser } from './functions/users/create-users'
import { router as getAll } from './functions/users/get-all-users'

import { router as createSales } from './functions/sales/create-sales'
import { router as getAllSales } from './functions/sales/get-all-sales'

import { router as createExpenses } from './functions/expenses/create-expenses'
import { router as getAllExpenses } from './functions/expenses/get-all-expenses'

import { router as createCourses } from './functions/Courses/create-courses'
import { router as getAllCourses } from './functions/Courses/get-all-courses'

import { router as createFranchise } from './functions/franchises/create-franchise'

const app = express()

app.use(express.json())
//Router Collaborator
// app.use(router)
app.use(createUser)
app.use(getAll)

//Router Sales
app.use(createSales)
app.use(getAllSales)

//Router Expenses
app.use(createExpenses)
app.use(getAllExpenses)

//Router Courses
app.use(createCourses)
app.use(getAllCourses)

//Router Franchise
app.use(createFranchise)

// Informando onde o servidor estará rodando
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
