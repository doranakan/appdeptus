import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Tournament } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

const getTournament = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.query<Tournament, number>({
    queryFn: async (id) => {
      try {
        const res = await supabase
          .from(Table.TOURNAMENTS)
          .select(
            `
              *,
              organizer (*),
              community (*)
            `
          )
          .eq('id', id)
          .single()

        if ('error' in res && res.error) {
          return { error: JSON.stringify(res.error) }
        }

        const tournament = tournamentSchema.parse(mapNullToUndefined(res.data))

        return { data: tournament }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, id) => [
      'tournament-list',
      { type: 'tournament-list', id }
    ]
  })

export default getTournament
