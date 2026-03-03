import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Tournament } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { merge } from 'lodash'
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

        const select = '*, organizer (*), community (*)'

        const [organizedResult, participantResult] = await Promise.all([
          supabase
            .from(Table.TOURNAMENTS)
            .select(select)
            .eq('organizer', userId)
            .order('date', { ascending: true }),
          supabase
            .from(Table.TOURNAMENTS)
            .select(`${select}, tournament_registrations!inner (user)`)
            .eq('tournament_registrations.user', userId)
            .order('date', { ascending: true })
        ])

        if (organizedResult.error) {
          return { error: JSON.stringify(organizedResult.error) }
        }

        if (participantResult.error) {
          return { error: JSON.stringify(participantResult.error) }
        }

        const parsedOrganized: Tournament[] = []

        for (const item of organizedResult.data) {
          const result = tournamentSchema.safeParse(mapNullToUndefined(item))

          if (!result.success) {
            return { error: result.error.message }
          }

          parsedOrganized.push(result.data)
        }

        const parsedParticipant: Tournament[] = []

        for (const item of participantResult.data) {
          const result = tournamentSchema.safeParse(mapNullToUndefined(item))

          if (!result.success) {
            return { error: result.error.message }
          }

          parsedParticipant.push(result.data)
        }

        const seen = new Set<number>()
        const tournaments = merge(parsedOrganized, parsedParticipant)
          .filter((item) => {
            if (seen.has(item.id)) return false
            seen.add(item.id)
            return true
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )

        return { data: tournaments }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: ['tournament-list']
  })

export default getUserTournamentList
