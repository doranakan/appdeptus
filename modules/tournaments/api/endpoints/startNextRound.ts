import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { createRoundResponseSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'
import { pair, shuffle } from '../utils'

type StartNextRound = {
  tournamentId: number
  completedRoundId: number
  nextRoundNumber: number
  pairingMode?: 'auto' | 'manual'
}

const startNextRound = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<{ roundId: number }, StartNextRound>({
    queryFn: async ({
      tournamentId,
      completedRoundId,
      nextRoundNumber,
      pairingMode = 'auto'
    }) => {
      try {
        // Fetch tournament format
        const { data: tournament, error: tournamentError } = await supabase
          .from(Table.TOURNAMENTS)
          .select('format')
          .eq('id', tournamentId)
          .single()

        if (tournamentError ?? !tournament) {
          return { error: 'Tournament not found' }
        }

        // Create the new round
        const { data: roundData, error: roundError } = await supabase
          .from(Table.TOURNAMENT_ROUNDS)
          .insert({ tournament: tournamentId, round_number: nextRoundNumber })
          .select('id')
          .single()

        if (roundError ?? !roundData) {
          return { error: 'Failed to create next round' }
        }

        const roundResult = createRoundResponseSchema.safeParse(roundData)

        if (!roundResult.success) {
          return { error: roundResult.error.message }
        }

        const newRoundId = roundResult.data.id

        // Generate pairings
        let playerIds: string[] = []

        if (tournament.format === 'single_elimination') {
          const { data: matches, error: matchError } = await supabase
            .from(Table.TOURNAMENT_MATCHES)
            .select('winner')
            .eq('round', completedRoundId)
            .not('winner', 'is', null)

          if (matchError) {
            return { error: 'Failed to fetch match results' }
          }

          playerIds = shuffle(
            matches.flatMap((m) => (m.winner ? [m.winner as string] : []))
          )
        } else {
          // Swiss: fetch all rounds for this tournament to tally wins
          const { data: allRounds, error: roundsError } = await supabase
            .from(Table.TOURNAMENT_ROUNDS)
            .select('id')
            .eq('tournament', tournamentId)

          if (roundsError) {
            return { error: 'Failed to fetch rounds' }
          }

          const roundIds = allRounds.map((r) => r.id as number)

          const { data: allMatches, error: allMatchesError } = await supabase
            .from(Table.TOURNAMENT_MATCHES)
            .select('winner')
            .in('round', roundIds)
            .not('winner', 'is', null)

          if (allMatchesError) {
            return { error: 'Failed to fetch match history' }
          }

          const winCounts = new Map<string, number>()
          for (const m of allMatches) {
            if (m.winner) {
              const w = m.winner as string
              winCounts.set(w, (winCounts.get(w) ?? 0) + 1)
            }
          }

          const { data: registrations, error: regError } = await supabase
            .from(Table.TOURNAMENT_REGISTRATIONS)
            .select('user')
            .eq('tournament', tournamentId)

          if (regError) {
            return { error: 'Failed to fetch registrations' }
          }

          playerIds = (registrations as { user: string }[])
            .map((r) => r.user)
            .sort((a, b) => (winCounts.get(b) ?? 0) - (winCounts.get(a) ?? 0))
        }

        if (pairingMode === 'auto') {
          // Create matches for the new round
          const pairs = pair(playerIds)

          const matchInserts = pairs.map(([p1, p2]) => ({
            round: newRoundId,
            player_one: p1,
            player_two: p2
          }))

          if (matchInserts.length > 0) {
            const { error: matchError } = await supabase
              .from(Table.TOURNAMENT_MATCHES)
              .insert(matchInserts)

            if (matchError) {
              return { error: 'Failed to create matches' }
            }
          }
        }

        return { data: { roundId: newRoundId } }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err, { tournamentId }) =>
      !err
        ? [
            'tournament-round-list',
            { type: 'tournament-round-list', id: tournamentId },
            'tournament-match-list'
          ]
        : []
  })

export default startNextRound
