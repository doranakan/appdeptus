import { GameStatus } from 'appdeptus/models/game'
import { armySchema } from 'appdeptus/modules/armies/api/schemas'
import { z } from 'zod'

const idSchema = z.number().transform(String)

const playerSchema = z.object({
  name: z.string()
})

const createGameSchema = z.object({
  id: idSchema
})

const gameSchema = z
  .object({
    id: idSchema,
    player_one: playerSchema,
    army_one: armySchema.transform(({ units: _, ...rest }) => rest),
    score_one: z.number(),
    created_at: z.string()
  })
  .and(
    z.discriminatedUnion('status', [
      z.object({
        status: z.literal(GameStatus.NEW)
      }),
      z.object({
        status: z.enum([
          GameStatus.READY,
          GameStatus.TURN_1,
          GameStatus.TURN_2,
          GameStatus.TURN_3,
          GameStatus.TURN_4,
          GameStatus.TURN_5,
          GameStatus.ENDED
        ]),
        player_two: playerSchema,
        army_two: armySchema.transform(({ units: _, ...rest }) => rest),
        score_two: z.number()
      })
    ])
  )

const getGamesSchema = z.array(gameSchema)

export { createGameSchema, getGamesSchema }
