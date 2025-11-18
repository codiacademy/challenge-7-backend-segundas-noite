import express from 'express'
export const router = express.Router()

import { prisma } from '../../lib/prisma.js'

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params

    const franchise = await prisma.franchises.delete({
      where: { id },
    })

    return res.status(200).json({
      message: 'Franquia deletada com sucesso',
      franchise,
    })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Franquia nao encontrado' })
    }

    console.error(error)
    return res.status(500).json({ message: 'Erro ao deletar franquia' })
  }
})
