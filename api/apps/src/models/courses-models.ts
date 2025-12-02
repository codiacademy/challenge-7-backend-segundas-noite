import { z } from 'zod'

export const courseSchemaBody = z.object({
  id: z.string({ message: 'Id inválido' }),
  status: z.enum(['ATIVO', 'INATIVO']),
  name: z
    .string({ message: 'O nome deve conter no mínimo 3 caracteres' })
    .min(3),
  description: z
    .string({ message: 'A descrição deve conter no mínimo 5 caracteres' })
    .min(5),
  value: z.number({ message: 'O valor deve ser um valor numérico' }).min(0),
  image: z.string({}),
})
