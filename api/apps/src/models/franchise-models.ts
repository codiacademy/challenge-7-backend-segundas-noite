import { email, z } from 'zod'
import { id } from 'zod/v4/locales'

export const franchiseSchemaBody = z.object({
  id: z.string({ message: 'Id inválido' }),
  name: z
    .string({ message: 'O nome deve conter no mínimo 5 caracteres' })
    .min(5),
  city: z
    .string({ message: 'A cidade deve conter no mínimo 3 caracteres' })
    .min(3),
  state: z
    .string({ message: 'O estado deve conter no mínimo 2 caracteres' })
    .min(2),
  responsible: z
    .string({
      message: 'O nome do responsável deve conter no mínimo 3 caracteres',
    })
    .min(3),
  phoneNumber: z
    .string({ message: 'Digite um número de telefone válido' })
    .min(10)
    .max(11),
  email: z.string({ message: 'Digite um e-mail valido' }),
  status: z.enum(['ATIVO', 'INATIVO']),
})
