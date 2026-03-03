import { z } from 'zod'

const createTournamentSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    date: z.date({ required_error: 'Date is required' }),
    format: z.enum(['single_elimination', 'swiss']),
    numberOfRounds: z.string().optional(),
    pointsLimit: z.string().optional(),
    price: z.string().optional(),
    description: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.format === 'swiss' && !data.numberOfRounds) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Number of rounds is required for Swiss format',
        path: ['numberOfRounds']
      })
    }
  })

type CreateTournamentForm = z.infer<typeof createTournamentSchema>

export { createTournamentSchema }
export type { CreateTournamentForm }
