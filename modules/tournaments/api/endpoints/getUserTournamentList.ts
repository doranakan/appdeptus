import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Tournament } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

const getUserTournamentList = (
  builder: CoreEndpointBuilder<TournamentsApiTags>
) =>
  builder.query<Tournament[], void>({
    queryFn: async () => {
      try {
        const userId = await getUserId()

        if (typeof userId === 'object') {
          return { error: userId.error }
        }

        const { data, error } = await supabase
          .from(Table.TOURNAMENTS)
          .select(
            `
              *,
              organizer (*),
              community (*)
            `
          )
          .eq('organizer', userId)
          .order('date', { ascending: true })

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const tournaments = data.map((item) =>
          tournamentSchema.parse(mapNullToUndefined(item))
        )

        return { data: tournaments }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: ['tournament-list']
  })

export default getUserTournamentList
