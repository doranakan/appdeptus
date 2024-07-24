import { armySchema } from 'appdeptus/modules/armies/api/schemas'
import { z } from 'zod'

const idSchema = z.number().transform(String)

const playerSchema = z.object({
  name: z.string()
})

const createGameSchema = z.object({
  id: idSchema
})

const baseGameSchema = z.object({
  id: idSchema,
  army_one: armySchema.transform(({ units: _, ...rest }) => rest),
  cp_one: z.number(),
  player_one: playerSchema,
  score_one: z.number(),
  updated_at: z.string()
})

const gameSchema = baseGameSchema.and(
  z.object({
    status: z.enum([
      'turn1_p1',
      'turn1_p2',
      'turn2_p1',
      'turn2_p2',
      'turn3_p1',
      'turn3_p2',
      'turn4_p1',
      'turn4_p2',
      'turn5_p1',
      'turn5_p2',
      'ended'
    ]),
    army_two: armySchema.transform(({ units: _, ...rest }) => rest),
    cp_two: z.number(),
    player_two: playerSchema,
    score_two: z.number()
  })
)

const newGameSchema = baseGameSchema.and(
  z.object({
    status: z.literal('new')
  })
)

const getGamesSchema = z.array(gameSchema)

const getGameSchema = gameSchema

const getNewGameSchema = newGameSchema

export { createGameSchema, getGameSchema, getGamesSchema, getNewGameSchema }
