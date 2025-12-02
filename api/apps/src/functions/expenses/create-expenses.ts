import express from 'express'
import { prisma } from '../../lib/prisma.js'
export const router = express.Router()
import { expenseSchemaBody } from '../../models/expenses-models'

router.post('/expenses', async (req, res) => {
  try {
    const { name, description, value, type, date } = expenseSchemaBody.parse(
      req.body
    )

    await prisma.expenses.create({
      data: {
        name,
        description,
        value,
        type,
        date: new Date(date),
      },
    })
    return res.status(201).json({ message: 'Expense created successfully' })
  } catch (error) {
    console.log(error)
  }
})
