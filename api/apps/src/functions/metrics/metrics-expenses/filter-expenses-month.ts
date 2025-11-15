import express from 'express'
import { prisma } from '../../../lib/prisma.js'
export const router = express.Router()

router.get('/expenses/:date', async (req, res) => {
  try {
    const dateQuery = new Date(req.params.date)
    const firstDay = new Date(
      dateQuery.getFullYear(),
      dateQuery.getMonth(),
      1,
      0,
      0,
      0,
      0
    )
    const lastDay = new Date(
      dateQuery.getFullYear(),
      dateQuery.getMonth() + 1,
      0,
      23,
      59,
      59
    )

    const expenses = await prisma.expenses.findMany({
      where: {
        date: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    })

    return res.status(200).json(expenses)
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
})
