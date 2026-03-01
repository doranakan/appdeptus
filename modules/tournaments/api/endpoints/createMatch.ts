import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentMatchMode } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type CreateMatch = {
  roundId: number
  playerOneId: string
  playerTwoId: string
  mode: TournamentMatchMode
}

const createMatch = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, CreateMatch>({
    queryFn: async ({ roundId, playerOneId, playerTwoId, mode }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENT_MATCHES)
          .insert({
            round: roundId,
            player_one: playerOneId,
            player_two: playerTwoId,
            mode
          })

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

export default createMatch
