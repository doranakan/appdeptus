import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentMatch } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type ConfirmMatch = {
  id: TournamentMatch['id']
  roundId: number
}

const confirmMatch = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, ConfirmMatch>({
    queryFn: async ({ id }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENT_MATCHES)
          .update({ status: 'confirmed' })
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

export default confirmMatch
