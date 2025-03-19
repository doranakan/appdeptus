import {
  gameArmySchema,
  gameRosterSchema
} from 'appdeptus/modules/armies/api/schemas'
import { baseCommunitySchema } from 'appdeptus/modules/communities/api/schemas'
import { z } from 'zod'

const idSchema = z.number()

const activeGameStatusSchema = z.union([
  z.literal('in_lobby'),
  z.literal('active')
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

const gameRoundSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5)
])
const gameTurnSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
  z.literal(10)
])

const baseGameSchema = z
  .object({
    id: idSchema,
    army_one: gameArmySchema,
    cp_one: z.number(),
    player_one: playerSchema,
    ready_one: z.boolean(),
    score_one: z.number(),
    updated_at: z.string().optional(),
    round: gameRoundSchema,
    turn: gameTurnSchema,
    community: baseCommunitySchema.optional(),
    active_player: z.union([z.literal('one'), z.literal('two')])
  })
  .transform(
    ({
      army_one,
      player_one,
      cp_one,
      score_one,
      updated_at,
      active_player,
      ready_one,
      ...rest
    }) => ({
      ...rest,
      playerOne: {
        cp: cp_one,
        profile: player_one,
        army: army_one,
        score: score_one,
        isReady: ready_one,
        isActive: active_player === 'one'
      },
      lastUpdate: updated_at ?? new Date().toISOString()
    })
  )

const baseActiveGameSchema = baseGameSchema
  .and(
    z.object({
      army_two: gameArmySchema,
      cp_two: z.number(),
      player_two: playerSchema,
      score_two: z.number(),
      ready_two: z.boolean()
    })
  )
  .transform(
    ({
      army_two,
      cp_two,
      player_two,
      score_two,
      ready_two,
      playerOne,
      ...rest
    }) => ({
      ...rest,
      playerOne,
      playerTwo: {
        cp: cp_two,
        profile: player_two,
        army: army_two,
        score: score_two,
        isReady: ready_two,
        isActive: !playerOne.isActive
      }
    })
  )

const endedGameSchema = baseActiveGameSchema.and(
  z.object({
    status: endedGameStatusSchema
  })
)

const activeGameSchema = baseActiveGameSchema.and(
  z.object({
    status: activeGameStatusSchema
  })
)

const realtimeGameSchema = z
  .object({
    cp_one: z.number(),
    cp_two: z.number(),
    score_one: z.number(),
    score_two: z.number(),
    status: activeGameStatusSchema.or(endedGameStatusSchema),
    updated_at: z.string(),
    ready_one: z.boolean(),
    ready_two: z.boolean(),
    active_player: z.union([z.literal('one'), z.literal('two')]),
    round: gameRoundSchema,
    turn: gameTurnSchema,
    communityId: idSchema.optional()
  })
  .transform(
    ({
      cp_one,
      cp_two,
      score_one,
      score_two,
      updated_at,
      active_player,
      ready_one,
      ready_two,
      ...rest
    }) => ({
      ...rest,
      lastUpdate: updated_at,
      playerOne: {
        cp: cp_one,
        score: score_one,
        isActive: active_player === 'one',
        isReady: ready_one
      },
      playerTwo: {
        cp: cp_two,
        score: score_two,
        isActive: active_player === 'two',
        isReady: ready_two
      }
    })
  )

const realtimeGameArmySchema = z.object({
  id: idSchema,
  roster: gameRosterSchema
})

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
  realtimeGameArmySchema,
  realtimeGameSchema
}
