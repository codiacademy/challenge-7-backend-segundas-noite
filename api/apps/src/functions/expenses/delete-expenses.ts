import express from 'express'
export const router = express.Router()

import { prisma } from '../../lib/prisma.js'

router.delete('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params

    const sale = await prisma.expenses.delete({
      where: { id },
    })

    return res.status(200).json({
      message: 'Despesa deletada com sucesso',
      sale,
    })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Despesa não encontrada' })
    }

    console.error(error)
    return res.status(500).json({ message: 'Erro ao deletar despesa' })
  }
})
