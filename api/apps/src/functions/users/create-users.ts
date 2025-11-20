import express from 'express'
export const router = express.Router()
import { prisma } from '../../lib/prisma.js'
import { userSchemaBody } from '../../models/users-model.js'
router.post('/users', async (req, res) => {
  try {
    const { name, phoneNumber, email, wage, sector, status } =
      userSchemaBody.parse(req.body)
    await prisma.collaborator.create({
      data: {
        name,
        phoneNumber,
        email,
        wage,
        sector,
        status,
      },
    })
    return res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
})
