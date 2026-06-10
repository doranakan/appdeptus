import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentRound } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentRoundSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

const getTournamentRoundList = (
  builder: CoreEndpointBuilder<TournamentsApiTags>
) =>
  builder.query<TournamentRound[], number>({
    queryFn: async (tournamentId) => {
      try {
        const { data, error } = await supabase
          .from(Table.TOURNAMENT_ROUNDS)
          .select('*')
          .eq('tournament', tournamentId)
          .order('round_number', { ascending: true })

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const rounds = data.map((item) =>
          tournamentRoundSchema.parse(mapNullToUndefined(item))
        )

        return { data: rounds }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, tournamentId) => [
      'tournament-round-list',
      { type: 'tournament-round-list', id: tournamentId }
    ]
  })

export default getTournamentRoundList
