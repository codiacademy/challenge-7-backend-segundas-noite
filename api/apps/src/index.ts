import express from 'express'

// import router from './functions/users/delete-users'
import { router as createUser } from './functions/users/create-users'
import { router as getAll } from './functions/users/get-all-users'
import { router as deleteUser } from './functions/users/delete-users'

import { router as createSales } from './functions/sales/create-sales'
import { router as getAllSales } from './functions/sales/get-all-sales'
import { router as deleteSales } from './functions/sales/delete-sales'

import { router as createExpenses } from './functions/expenses/create-expenses'
import { router as getAllExpenses } from './functions/expenses/get-all-expenses'
import { router as deleteExpenses } from './functions/expenses/delete-expenses'

import { router as createCourses } from './functions/Courses/create-courses'
import { router as getAllCourses } from './functions/Courses/get-all-courses'
<<<<<<< HEAD

import { router as createFranchise } from './functions/franchises/create-franchise'
import { router as getAllFranchise } from './functions/franchises/get-all-franchises'

=======
import { router as deleteCourses } from './functions/Courses/delete-courses'
>>>>>>> d1b86b6102cc063cbe59a6a115c57ad569f5b8fd
const app = express()

app.use(express.json())
//Router Collaborator
// app.use(router)
app.use(createUser)
app.use(getAll)
app.use(deleteUser)

//Router Sales
app.use(createSales)
app.use(getAllSales)
app.use(deleteSales)

//Router Expenses
app.use(createExpenses)
app.use(getAllExpenses)
app.use(deleteExpenses)

//Router Courses
app.use(createCourses)
app.use(getAllCourses)
app.use(deleteCourses)

//Router Franchise
app.use(createFranchise)
app.use(getAllFranchise)

// Informando onde o servidor estará rodando
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
