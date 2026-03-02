import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentStatusCheckSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

type RegisterForTournament = {
  tournamentId: number
}

const registerForTournament = (
  builder: CoreEndpointBuilder<TournamentsApiTags>
) =>
  builder.mutation<null, RegisterForTournament>({
    queryFn: async ({ tournamentId }) => {
      try {
        const userId = await getUserId()

        if (typeof userId === 'object') {
          return { error: userId.error }
        }

        const { data: tournamentData, error: tournamentError } = await supabase
          .from(Table.TOURNAMENTS)
          .select('status, registration_deadline')
          .eq('id', tournamentId)
          .single()

        if (tournamentError ?? !tournamentData) {
          return { error: 'Tournament not found' }
        }

        const tournament = tournamentStatusCheckSchema.parse(
          mapNullToUndefined(tournamentData)
        )

        if (tournament.status !== 'open') {
          return { error: 'Tournament registration is closed' }
        }

        if (
          tournament.registration_deadline &&
          new Date(tournament.registration_deadline) < new Date()
        ) {
          return { error: 'Registration deadline has passed' }
        }

        const { error } = await supabase
          .from(Table.TOURNAMENT_REGISTRATIONS)
          .insert({ tournament: tournamentId, user: userId })

        if (error) {
          if (error.code === '23505') {
            return { error: 'You are already registered for this tournament' }
          }
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
