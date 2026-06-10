import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentRegistration } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentRegistrationSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

const getTournamentRegistrationList = (
  builder: CoreEndpointBuilder<TournamentsApiTags>
) =>
  builder.query<TournamentRegistration[], number>({
    queryFn: async (tournamentId) => {
      try {
        const { data, error } = await supabase
          .from(Table.TOURNAMENT_REGISTRATIONS)
          .select(
            `
              *,
              user (*),
              army (*, codex (*))
            `
          )
          .eq('tournament', tournamentId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const registrations = data.map((item) =>
          tournamentRegistrationSchema.parse(mapNullToUndefined(item))
        )

        return { data: registrations }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, tournamentId) => [
      'tournament-registration-list',
      { type: 'tournament-registration-list', id: tournamentId }
    ]
  })

export default getTournamentRegistrationList
