import express from 'express'
import { prisma } from '../../lib/prisma'
export const router = express.Router()
import { saleSchemaBody } from '../../models/sales-model.js'

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
    } = saleSchemaBody.parse(req.body)

    await prisma.sale.create({
      data: {
        modalidade,
        courseId,
        nomeAluno,
        email,
        telefone,
        valorBruto,
        valorLiquido,
        course: {
          connect: { id: '27f2a25e-0972-4d4a-a3ab-775449989351' }, // id de um curso existente
        },
      },
    })

    return res.status(201).json({ message: 'Sale created successfully' })
  } catch (error) {
    console.log(error)
  }
})
