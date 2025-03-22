import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type EndedGame } from 'appdeptus/models/game'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getEndedGameListSchema } from '../schemas'
import { type GamesApiTags } from '../tags'

const getEndedGameList = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.query<EndedGame[], void>({
    queryFn: async () => {
      try {
        const userId = await getUserId()

        if (typeof userId === 'object') {
          throw userId.error
        }

        const { data, error } = await supabase
          .from(Table.GAMES)
          .select(
            `
            *,
            player_one (
              *
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
              *
            ),
            army_two (
              *,
              codex!inner(
                *
              )
            ),
            community (
              *
            )
            `
          )
          .or(`player_one.eq.${userId},player_two.eq.${userId}`)
          .limit(10)
          .eq('status', 'ended')

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const games = await getEndedGameListSchema.parseAsync(
          mapNullToUndefined(data)
        )

        return {
          data: games.sort(({ id: id1 }, { id: id2 }) => id2 - id1)
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: ['game-list']
  })

export default getEndedGameList
