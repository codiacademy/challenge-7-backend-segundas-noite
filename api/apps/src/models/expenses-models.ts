import { z } from 'zod'

export const expenseSchemaBody = z.object({
  id: z.string({ message: 'Id inválido' }),
  name: z
    .string({ message: 'O nome deve conter no mínimo 3 caracteres' })
    .min(3),
  description: z
    .string({ message: 'A descrição deve conter no mínimo 5 caracteres' })
    .min(5),
  value: z.number({ message: 'O valor deve ser um valor numérico' }).min(0),
  type: z.string({}),
  date: z.date({}),
})
