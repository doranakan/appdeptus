import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type RegisterForTournament = {
  tournamentId: number
  armyId: number
}

const registerForTournament = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, RegisterForTournament>({
    queryFn: async ({ tournamentId, armyId }) => {
      try {
        const userId = await getUserId()

        if (typeof userId === 'object') {
          return { error: userId.error }
        }

        const { error } = await supabase
          .from(Table.TOURNAMENT_REGISTRATIONS)
          .insert({
            tournament: tournamentId,
            user: userId,
            army: armyId
          })

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

export default registerForTournament
