import { armySchema } from 'appdeptus/modules/armies/api/schemas'
import { z } from 'zod'

const idSchema = z.number()

const playerSchema = z.object({
  name: z.string()
})

const createGameSchema = z.object({
  id: idSchema
})

const baseGameSchema = z
  .object({
    id: idSchema,
    army_one: armySchema,
    cp_one: z.number(),
    player_one: playerSchema,
    score_one: z.number(),
    updated_at: z.string()
  })
  .transform(
    ({ army_one, player_one, cp_one, score_one, updated_at, ...rest }) => ({
      ...rest,
      playerOne: {
        cp: cp_one,
        name: player_one.name,
        army: army_one,
        score: score_one
      },
      lastUpdate: updated_at
    })
  )

const gameSchema = baseGameSchema.and(
  z
    .object({
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
      army_two: armySchema,
      cp_two: z.number(),
      player_two: playerSchema,
      score_two: z.number()
    })
    .transform(({ army_two, cp_two, player_two, score_two, ...rest }) => ({
      ...rest,
      playerTwo: {
        cp: cp_two,
        name: player_two.name,
        army: army_two,
        score: score_two
      }
    }))
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
