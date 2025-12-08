import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  sub: string
  email: string
  role: string
}

export function authenticateSector(requiredSector: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Token mal formatado' })
    }

    try {
      const secret = process.env.JWT_SECRET || 'changeme'
      const payload = jwt.verify(token, secret) as JwtPayload

      if (payload.role !== requiredSector) {
        return res
          .status(403)
          .json({ message: 'Acesso negado: role insuficiente' })
      }

      // opcional: anexar usuário ao req
      req.user = payload

      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' })
    }
  }
}
