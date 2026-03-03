import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Tournament } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { createRoundResponseSchema, tournamentRegistrationArmyCheckSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const pair = <T>(items: T[]): [T, T][] => {
  const pairs: [T, T][] = []
  for (let i = 0; i + 1 < items.length; i += 2) {
    pairs.push([items[i], items[i + 1]])
  }
  return pairs
}

type StartTournament = {
  id: Tournament['id']
}

const startTournament = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, StartTournament>({
    queryFn: async ({ id }) => {
      try {
        // Validate all registrations have armies
        const { data: registrations, error: regError } = await supabase
          .from(Table.TOURNAMENT_REGISTRATIONS)
          .select('army, user')
          .eq('tournament', id)

        if (regError) {
          return { error: JSON.stringify(regError) }
        }

        if (!registrations?.length) {
          return { error: 'Cannot start a tournament with no registered players' }
        }

        const parsed = registrations.map((r) =>
          tournamentRegistrationArmyCheckSchema.parse(r)
        )

        const missingArmy = parsed.some((r) => !r.army)

        if (missingArmy) {
          return { error: 'All players must select an army before the tournament can start' }
        }

        // Update tournament status to started
        const { error: statusError } = await supabase
          .from(Table.TOURNAMENTS)
          .update({ status: 'started' })
          .eq('id', id)

        if (statusError) {
          return { error: JSON.stringify(statusError) }
        }

        // Terminate pending games for all participants
        const userIds = registrations.map((r) => r.user as string)

        await supabase
          .from(Table.GAMES)
          .update({ status: 'ended' })
          .in('player_one', userIds)
          .not('status', 'eq', 'ended')

        await supabase
          .from(Table.GAMES)
          .update({ status: 'ended' })
          .in('player_two', userIds)
          .not('status', 'eq', 'ended')

        // Create round 1
        const { data: roundData, error: roundError } = await supabase
          .from(Table.TOURNAMENT_ROUNDS)
          .insert({ tournament: id, round_number: 1 })
          .select('id')
          .single()

        if (roundError ?? !roundData) {
          return { error: 'Failed to create round 1' }
        }

        const roundResult = createRoundResponseSchema.safeParse(roundData)

        if (!roundResult.success) {
          return { error: roundResult.error.message }
        }

        // Generate random pairings
        const playerIds = shuffle(registrations.map((r) => r.user as string))
        const pairs = pair(playerIds)

        const matchInserts = pairs.map(([p1, p2]) => ({
          round: roundResult.data.id,
          player_one: p1,
          player_two: p2
        }))

        if (matchInserts.length > 0) {
          const { error: matchError } = await supabase
            .from(Table.TOURNAMENT_MATCHES)
            .insert(matchInserts)

          if (matchError) {
            return { error: 'Failed to create round 1 matches' }
          }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err, { id }) =>
      !err
        ? [
            'tournament-list',
            { type: 'tournament-list', id },
            'tournament-round-list',
            { type: 'tournament-round-list', id },
            'tournament-match-list'
          ]
        : []
  })

export default startTournament
