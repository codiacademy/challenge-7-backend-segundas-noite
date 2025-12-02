import express from 'express'
import { prisma } from '../../lib/prisma.js'
export const router = express.Router()
import { courseSchemaBody } from '../../models/courses-models'

router.post('/courses', async (req, res) => {
  try {
    const { image, status, name, description, value } = courseSchemaBody.parse(
      req.body
    )

    await prisma.courses.create({
      data: {
        image,
        status,
        name,
        description,
        value,
      },
    })
    return res.status(201).json({ message: 'Course created successfully' })
  } catch (error) {
    console.log(error)
  }
})
