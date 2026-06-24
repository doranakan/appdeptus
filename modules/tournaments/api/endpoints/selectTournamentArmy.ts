import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type SelectTournamentArmy = {
  registrationId: number
  armyId: number
}

const selectTournamentArmy = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, SelectTournamentArmy>({
    queryFn: async ({ registrationId, armyId }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENT_REGISTRATIONS)
          .update({ army: armyId })
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

export default selectTournamentArmy
