import { z } from 'zod'

const tournamentUserSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    created_at: z.string(),
    image: z.string().optional()
  })
  .transform(({ created_at, ...rest }) => ({
    ...rest,
    createdAt: created_at
  }))

const tournamentCommunitySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    created_at: z.string(),
    secret: z.boolean(),
    image: z.string().optional()
  })
  .transform(({ created_at, secret, ...rest }) => ({
    ...rest,
    createdAt: created_at,
    isSecret: secret
  }))

const tournamentArmySchema = z.object({
  id: z.number(),
  name: z.string(),
  points: z.number(),
  codex: z.object({
    id: z.number(),
    name: z.union([
      z.literal('Adepta Sororitas'),
      z.literal('Adeptus Custodes'),
      z.literal('Adeptus Mechanicus'),
      z.literal('Aeldari'),
      z.literal('Astra Militarum'),
      z.literal('Black Templars'),
      z.literal('Blood Angels'),
      z.literal('Chaos Daemons'),
      z.literal('Chaos Knights'),
      z.literal('Chaos Space Marines'),
      z.literal("Emperor's Children"),
      z.literal('Dark Angels'),
      z.literal('Death Guard'),
      z.literal('Drukhari'),
      z.literal('Genestealer Cults'),
      z.literal('Grey Knights'),
      z.literal('Imperial Agents'),
      z.literal('Imperial Knights'),
      z.literal('Leagues Of Votann'),
      z.literal('Necrons'),
      z.literal('Orks'),
      z.literal('Space Marines'),
      z.literal('Space Wolves'),
      z.literal("T'au Empire"),
      z.literal('Thousand Sons'),
      z.literal('Tyranids'),
      z.literal('World Eaters')
    ]),
    faction: z.enum(['imperium', 'chaos', 'xenos'])
  })
})

const tournamentSchema = z
  .object({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    name: z.string(),
    address: z.string(),
    date: z.string(),
    format: z.enum(['single_elimination', 'swiss']),
    status: z.enum(['open', 'ready', 'started', 'ended']),
    points_limit: z.number().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    registration_deadline: z.string().optional(),
    organizer: tournamentUserSchema,
    community: tournamentCommunitySchema.optional()
  })
  .transform(
    ({ created_at, updated_at, points_limit, registration_deadline, ...rest }) => ({
      ...rest,
      createdAt: created_at,
      updatedAt: updated_at,
      pointsLimit: points_limit,
      registrationDeadline: registration_deadline
    })
  )

const tournamentRegistrationSchema = z
  .object({
    id: z.number(),
    created_at: z.string(),
    tournament: z.number(),
    user: tournamentUserSchema,
    army: tournamentArmySchema
  })
  .transform(({ created_at, ...rest }) => ({
    ...rest,
    createdAt: created_at
  }))

const tournamentRoundSchema = z
  .object({
    id: z.number(),
    created_at: z.string(),
    tournament: z.number(),
    round_number: z.number(),
    status: z.enum(['pending', 'active', 'completed'])
  })
  .transform(({ created_at, round_number, ...rest }) => ({
    ...rest,
    createdAt: created_at,
    roundNumber: round_number
  }))

const tournamentMatchSchema = z
  .object({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    round: z.number(),
    player_one: tournamentUserSchema,
    player_two: tournamentUserSchema,
    player_one_score: z.number().optional(),
    player_two_score: z.number().optional(),
    winner: tournamentUserSchema.optional(),
    mode: z.enum(['full', 'light']).optional(),
    status: z.enum(['pending', 'reported', 'confirmed']),
    game: z.number().optional()
  })
  .transform(
    ({
      created_at,
      updated_at,
      player_one,
      player_two,
      player_one_score,
      player_two_score,
      ...rest
    }) => ({
      ...rest,
      createdAt: created_at,
      updatedAt: updated_at,
      playerOne: player_one,
      playerTwo: player_two,
      playerOneScore: player_one_score,
      playerTwoScore: player_two_score
    })
  )

export {
  tournamentMatchSchema,
  tournamentRegistrationSchema,
  tournamentRoundSchema,
  tournamentSchema
}
