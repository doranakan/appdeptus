import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Tournament } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

const deleteTournament = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, Tournament['id']>({
    queryFn: async (tournamentId) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENTS)
          .delete()
          .eq('id', tournamentId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err) => (!err ? ['tournament-list'] : [])
  })

export default deleteTournament
