import express from 'express'
import { prisma } from '../../lib/prisma.js'
export const router = express.Router()

router.get('/sales', async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: {
        dataVenda: 'desc',
      },
    })
    return res.status(200).json(sales)
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
})
