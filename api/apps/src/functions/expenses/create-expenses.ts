import express from 'express'
import { prisma } from '../../lib/prisma.js'
import { parse } from 'path'
export const router = express.Router()

router.post('/expenses', async (req, res) => {
  try {
    const { name, description, value, type, date } = req.body
    console.log(date)
    const parseDate = new Date(date)
    console.log(parseDate)
    await prisma.expenses.create({
      data: {
        name,
        description,
        value,
        type,
        date: parseDate,
      },
    })
    return res.status(201).json({ message: 'Expense created successfully' })
  } catch (error) {
    console.log(error)
  }
})
