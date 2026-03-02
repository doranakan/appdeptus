import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentRegistration } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentRegistrationSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

const getUserRegistrationList = (
  builder: CoreEndpointBuilder<TournamentsApiTags>
) =>
  builder.query<TournamentRegistration[], void>({
    queryFn: async () => {
      try {
        const userId = await getUserId()

        if (typeof userId === 'object') {
          return { error: userId.error }
        }

        const { data, error } = await supabase
          .from(Table.TOURNAMENT_REGISTRATIONS)
          .select(
            `
              *,
              user (*),
              army (*, codex (*))
            `
          )
          .eq('user', userId)

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
    providesTags: ['tournament-registration-list']
  })

export default getUserRegistrationList
