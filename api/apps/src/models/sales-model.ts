import { z } from 'zod'

export const saleSchemaBody = z.object({
  id: z.string({ message: 'Id inválido' }),
  modalidade: z.enum(['ONLINE', 'PRESENCIAL']),
  courseId: z.string({ message: 'Id do curso inválido' }),
  nomeAluno: z
    .string({ message: 'O nome do aluno deve conter no mínimo 3 caracteres' })
    .min(3),
  email: z.string({ message: 'Digite um e-mail valido' }),
  telefone: z
    .string({ message: 'Digite um número de telefone válido' })
    .min(10)
    .max(11),
  valorBruto: z
    .number({ message: 'O valor bruto deve ser um valor numérico' })
    .min(0),
  valorLiquido: z
    .number({ message: 'O valor liquido deve ser um valor numérico' })
    .min(0),
})
