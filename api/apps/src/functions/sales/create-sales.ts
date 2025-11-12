import express from 'express'
import { prisma } from '../../lib/prisma'
export const router = express.Router()

router.post('/sales', async (req, res) => {
  try {
    const {
      modalidade,
      courseId,
      nomeAluno,
      email,
      telefone,
      valorBruto,
      valorLiquido,
    } = req.body

    await prisma.sale.create({
      data: {
        modalidade,
        courseId,
        nomeAluno,
        email,
        telefone,
        valorBruto,
        valorLiquido,
      },
    })

    return res.status(201).json({ message: 'Sale created successfully' })
  } catch (error) {}
})
