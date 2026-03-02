import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Tournament, type TournamentStatus } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentRegistrationArmyCheckSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

type UpdateTournamentStatus = {
  id: Tournament['id']
  status: TournamentStatus
}

const updateTournamentStatus = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, UpdateTournamentStatus>({
    queryFn: async ({ id, status }) => {
      try {
        if (status === 'started') {
          const { data: registrations, error: regError } = await supabase
            .from(Table.TOURNAMENT_REGISTRATIONS)
            .select('army')
            .eq('tournament', id)

          if (regError) {
            return { error: JSON.stringify(regError) }
          }

          if (!registrations?.length) {
            return { error: 'Cannot start a tournament with no registered players' }
          }

          const parsed = registrations.map((r) =>
            tournamentRegistrationArmyCheckSchema.parse(r)
          )

          const missingArmy = parsed.some((r) => !r.army)

          if (missingArmy) {
            return { error: 'All players must select an army before the tournament can start' }
          }
        }

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
