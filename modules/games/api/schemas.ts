import { baseArmySchema } from 'appdeptus/modules/armies/api/schemas'
import { z } from 'zod'

const idSchema = z.number()

const activeGameStatusSchema = z.union([
  z.literal('turn1_p1'),
  z.literal('turn1_p2'),
  z.literal('turn2_p1'),
  z.literal('turn2_p2'),
  z.literal('turn3_p1'),
  z.literal('turn3_p2'),
  z.literal('turn4_p1'),
  z.literal('turn4_p2'),
  z.literal('turn5_p1'),
  z.literal('turn5_p2')
])

const endedGameStatusSchema = z.literal('ended')

const playerSchema = z
  .object({
    created_at: z.string(),
    id: z.string(),
    name: z.string()
  })
  .transform(({ created_at, ...rest }) => ({ ...rest, createdAt: created_at }))

const createGameArmy = z.object({
  id: idSchema
})
const createGameSchema = z.object({
  id: idSchema
})

const baseGameSchema = z
  .object({
    id: idSchema,
    army_one: baseArmySchema,
    cp_one: z.number(),
    player_one: playerSchema,
    score_one: z.number(),
    updated_at: z.string().optional()
  })
  .transform(
    ({ army_one, player_one, cp_one, score_one, updated_at, ...rest }) => ({
      ...rest,
      playerOne: {
        cp: cp_one,
        profile: player_one,
        army: army_one,
        score: score_one
      },
      lastUpdate: updated_at ?? new Date().toISOString()
    })
  )

const endedGameSchema = baseGameSchema.and(
  z
    .object({
      status: endedGameStatusSchema,
      army_two: baseArmySchema,
      cp_two: z.number(),
      player_two: playerSchema,
      score_two: z.number()
    })
    .transform(({ army_two, cp_two, player_two, score_two, ...rest }) => ({
      ...rest,
      playerTwo: {
        cp: cp_two,
        profile: player_two,
        army: army_two,
        score: score_two
      }
    }))
)

const activeGameSchema = baseGameSchema.and(
  z
    .object({
      status: activeGameStatusSchema,
      army_two: baseArmySchema,
      cp_two: z.number(),
      player_two: playerSchema,
      score_two: z.number()
    })
    .transform(({ army_two, cp_two, player_two, score_two, ...rest }) => ({
      ...rest,
      playerTwo: {
        cp: cp_two,
        profile: player_two,
        army: army_two,
        score: score_two
      }
    }))
)

const realtimeGameSchema = z
  .object({
    cp_one: z.number(),
    cp_two: z.number(),
    score_one: z.number(),
    score_two: z.number(),
    status: activeGameStatusSchema.or(endedGameStatusSchema),
    updated_at: z.string()
  })
  .transform(
    ({ cp_one, cp_two, score_one, score_two, status, updated_at }) => ({
      status,
      lastUpdate: updated_at,
      playerOne: {
        cp: cp_one,
        score: score_one
      },
      playerTwo: {
        cp: cp_two,
        score: score_two
      }
    })
  )
const newGameSchema = baseGameSchema.and(
  z.object({
    status: z.literal('new')
  })
)

const getGameSchema = activeGameSchema.or(endedGameSchema)

const getEndedGameListSchema = z.array(endedGameSchema)

const getNewGameSchema = newGameSchema

export {
  activeGameSchema,
  createGameArmy,
  createGameSchema,
  getEndedGameListSchema,
  getGameSchema,
  getNewGameSchema,
  realtimeGameSchema
}
