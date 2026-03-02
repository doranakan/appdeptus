import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Tournament, type TournamentStatus } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type UpdateTournamentStatus = {
  id: Tournament['id']
  status: TournamentStatus
}

const updateTournamentStatus = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, UpdateTournamentStatus>({
    queryFn: async ({ id, status }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENTS)
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
    invalidatesTags: (_, err, { id }) =>
      !err ? ['tournament-list', { type: 'tournament-list', id }] : []
  })

export default updateTournamentStatus
