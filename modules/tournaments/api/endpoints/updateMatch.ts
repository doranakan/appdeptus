import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentMatch } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type UpdateMatch = {
  id: TournamentMatch['id']
  roundId: number
  playerOneScore: number
  playerTwoScore: number
  winnerId?: string
}

const updateMatch = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, UpdateMatch>({
    queryFn: async ({ id, playerOneScore, playerTwoScore, winnerId }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENT_MATCHES)
          .update({
            player_one_score: playerOneScore,
            player_two_score: playerTwoScore,
            winner: winnerId,
            status: 'reported'
          })
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err, { roundId }) =>
      !err
        ? [
            'tournament-match-list',
            { type: 'tournament-match-list', id: roundId }
          ]
        : []
  })

export default updateMatch
