import express from "express";
export const router = express.Router();
import { prisma } from "../../lib/prisma.js";
import { hash } from "bcryptjs";
import { authenticateSector } from "../middlewares/authenticateSector.ts";
import { userSchemaBody } from "../../models/users-models.ts";

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Endpoint para criar um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               wage:
 *                 type: number
 *               sector:
 *                 type: string
 *               status:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro ao criar usuário
 */

router.post(
  "/users",
  authenticateSector("ADIMIN"),
  authenticateSector("MANAGER"),
  async (req, res) => {
    try {
      const { name, phoneNumber, email, wage, sector, status, password } =
        userSchemaBody.parse(req.body);
      const passwordHash = await hash(password, 6);
      await prisma.collaborator.create({
        data: {
          name,
          phoneNumber,
          email,
          wage,
          sector,
          status,
          password: passwordHash,
        },
      });
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }
);
