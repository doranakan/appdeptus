import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type CreateRound = {
  tournamentId: number
  roundNumber: number
}

const createRound = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, CreateRound>({
    queryFn: async ({ tournamentId, roundNumber }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENT_ROUNDS)
          .insert({
            tournament: tournamentId,
            round_number: roundNumber
          })

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
            { type: 'tournament-round-list', id: tournamentId }
          ]
        : []
  })

export default createRound
