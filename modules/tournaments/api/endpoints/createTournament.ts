import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type CreateTournament } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type TournamentsApiTags } from '../tags'

const createTournament = (builder: CoreEndpointBuilder<TournamentsApiTags>) =>
  builder.mutation<null, CreateTournament>({
    queryFn: async ({ communityId, pointsLimit, registrationDeadline, ...rest }) => {
      try {
        const userId = await getUserId()

        if (typeof userId === 'object') {
          return { error: userId.error }
        }

        const { error } = await supabase
          .from(Table.TOURNAMENTS)
          .insert({
            ...rest,
            organizer: userId,
            community: communityId,
            points_limit: pointsLimit,
            registration_deadline: registrationDeadline
          })

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

export default createTournament
