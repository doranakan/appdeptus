import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type EndedGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getEndedGameListSchema } from '../schemas'
import GamesApiTag from '../tags'

const getEndedGameList = (builder: CoreEndpointBuilder<GamesApiTag>) =>
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
              id,
              name
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
              id,
              name
            ),
            army_two (
              *,
              codex!inner(
                *
              )
            )
            `
          )
          .or(`player_one.eq.${userId},player_two.eq.${userId}`)
          .limit(10)
          .eq('status', 'ended')

        if (error) {
          return { error }
        }

        const games = await getEndedGameListSchema.parseAsync(data)

        return {
          data: games.sort(({ id: id1 }, { id: id2 }) => id2 - id1)
        }
      } catch (error) {
        return { error }
      }
    },
    providesTags: [GamesApiTag.GAME_LIST]
  })

export default getEndedGameList
