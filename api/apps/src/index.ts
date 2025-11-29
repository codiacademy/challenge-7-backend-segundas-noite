import express from 'express'

// import router from './functions/users/delete-users'
import { router as createUser } from './functions/users/create-users'
import { router as getAll } from './functions/users/get-all-users'
import { router as deleteUser } from './functions/users/delete-users'
import { router as updateUser } from './functions/users/update-users'

import { router as createSales } from './functions/sales/create-sales'
import { router as getAllSales } from './functions/sales/get-all-sales'
import { router as deleteSales } from './functions/sales/delete-sales'
import { router as updateSales } from './functions/sales/update-sales'

import { router as createExpenses } from './functions/expenses/create-expenses'
import { router as getAllExpenses } from './functions/expenses/get-all-expenses'
import { router as deleteExpenses } from './functions/expenses/delete-expenses'
import { router as updateExpenses } from './functions/expenses/update-expenses'

import { router as createCourses } from './functions/Courses/create-courses'
import { router as getAllCourses } from './functions/Courses/get-all-courses'
import { router as deleteCourses } from './functions/Courses/delete-courses'
import { router as updateCourses } from './functions/Courses/update-courses'

import { router as createFranchise } from './functions/franchises/create-franchises'
import { router as getAllFranchise } from './functions/franchises/get-all-franchises'
import { router as deleteFranchise } from './functions/franchises/delete-franchises'
import { router as updateFranchise } from './functions/franchises/update-franchises'

import { router as getExpensesDay } from './functions/metrics/metrics-expenses/filter-expenses-day'
import { router as getExpensesMonth } from './functions/metrics/metrics-expenses/filter-expenses-month'
import { router as getExpensesYear } from './functions/metrics/metrics-expenses/filter-expenses-year'

const app = express()

app.use(express.json())
//Router Collaborator
// app.use(router)
app.use(createUser)
app.use(getAll)
app.use(deleteUser)
app.use(updateUser)

//Router Sales
app.use(createSales)
app.use(getAllSales)
app.use(deleteSales)
app.use(updateSales)

//Router Expenses
app.use(createExpenses)
app.use(getAllExpenses)
app.use(deleteExpenses)
app.use(updateExpenses)

//Router Courses
app.use(createCourses)
app.use(getAllCourses)
app.use(deleteCourses)
app.use(updateCourses)

//Router Franchise
app.use(createFranchise)
app.use(getAllFranchise)
app.use(deleteFranchise)
app.use(updateFranchise)

//Metrics Expenses
app.use(getExpensesDay)
app.use(getExpensesMonth)
app.use(getExpensesYear)

// Informando onde o servidor estará rodando
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
