import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type TournamentMatch } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { tournamentMatchSchema } from '../schemas'
import { type TournamentsApiTags } from '../tags'

const getTournamentMatchList = (
  builder: CoreEndpointBuilder<TournamentsApiTags>
) =>
  builder.query<TournamentMatch[], number>({
    queryFn: async (roundId) => {
      try {
        const { data, error } = await supabase
          .from(Table.TOURNAMENT_MATCHES)
          .select(
            `
              *,
              player_one (*),
              player_two (*),
              winner (*)
            `
          )
          .eq('round', roundId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const matches = data.map((item) =>
          tournamentMatchSchema.parse(mapNullToUndefined(item))
        )

        return { data: matches }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, roundId) => [
      'tournament-match-list',
      { type: 'tournament-match-list', id: roundId }
    ]
  })

export default getTournamentMatchList
