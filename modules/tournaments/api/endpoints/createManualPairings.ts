import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type CreateManualPairings = {
  roundId: number
  tournamentId: number
  pairs: [string, string][]
}

const createManualPairings = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, CreateManualPairings>({
    queryFn: async ({ roundId, pairs }) => {
      try {
        const matchInserts = pairs.map(([p1, p2]) => ({
          round: roundId,
          player_one: p1,
          player_two: p2
        }))

        const { error } = await supabase
          .from(Table.TOURNAMENT_MATCHES)
          .insert(matchInserts)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: null }
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

export default createManualPairings
