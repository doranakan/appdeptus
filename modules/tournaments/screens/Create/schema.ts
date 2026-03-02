import { z } from 'zod'

const createTournamentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  date: z.date({ required_error: 'Date is required' }),
  format: z.enum(['single_elimination', 'swiss']),
  pointsLimit: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  communityId: z.number().int().optional()
})

type CreateTournamentForm = z.infer<typeof createTournamentSchema>

export { createTournamentSchema }
export type { CreateTournamentForm }
