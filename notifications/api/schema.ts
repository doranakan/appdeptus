import { z } from 'zod'

const notificationsSchema = z.object({
  armies: z
    .number()
    .optional()
    .transform((v) => v ?? 0),
  communities: z
    .number()
    .optional()
    .transform((v) => v ?? 0),
  games: z
    .number()
    .optional()
    .transform((v) => v ?? 0)
})

export { notificationsSchema }
