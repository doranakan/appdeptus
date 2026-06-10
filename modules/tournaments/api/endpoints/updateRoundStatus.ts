import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentRound, type TournamentRoundStatus } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type UpdateRoundStatus = {
  id: TournamentRound['id']
  tournamentId: number
  status: TournamentRoundStatus
}

const updateRoundStatus = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, UpdateRoundStatus>({
    queryFn: async ({ id, status }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENT_ROUNDS)
          .update({ status })
          .eq('id', id)

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

export default updateRoundStatus
