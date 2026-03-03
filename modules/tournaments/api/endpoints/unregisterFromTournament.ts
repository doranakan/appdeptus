import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentRegistration } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

const unregisterFromTournament = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, TournamentRegistration['id']>({
    queryFn: async (registrationId) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENT_REGISTRATIONS)
          .delete()
          .eq('id', registrationId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data: null }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err) => (!err ? ['tournament-registration-list'] : [])
  })

export default unregisterFromTournament
