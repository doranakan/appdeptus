import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type CreateTournament } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

type UpdateTournament = Partial<CreateTournament> & { id: number }

const updateTournament = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, UpdateTournament>({
    queryFn: async ({
      id,
      numberOfRounds,
      pointsLimit,
      registrationDeadline,
      ...rest
    }) => {
      try {
        const { error } = await supabase
          .from(Table.TOURNAMENTS)
          .update({
            ...rest,
            number_of_rounds: numberOfRounds,
            points_limit: pointsLimit,
            registration_deadline: registrationDeadline
          })
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

export default updateTournament
