import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import {
  type ActiveGame,
  type EndedGame,
  type NewGame
} from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGamesSchema } from '../schemas'
import GamesApiTag from '../tags'

const getGameList = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.query<(ActiveGame | EndedGame | NewGame)[], void>({
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
              name
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
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

        if (error) {
          return { error }
        }

        const games = await getGamesSchema.parseAsync(data)

        return {
          data: games.sort(
            ({ id: id1 }, { id: id2 }) => Number(id2) - Number(id1)
          )
        }
      } catch (error) {
        return { error }
      }
    },
    providesTags: [GamesApiTag.GAME_LIST]
  })

export default getGameList
