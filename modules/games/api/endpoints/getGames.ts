import { getUserId, type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame, type EndedGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGamesSchema } from '../schemas'
import GamesApiTag from '../tags'

const getGames = (builder: SupabaseEndpointBuilder<GamesApiTag>) =>
  builder.query<(ActiveGame | EndedGame)[], void>({
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
          data: games
            .map<ActiveGame | EndedGame | undefined>((game) => {
              const baseGame = {
                id: game.id,
                lastUpdate: game.updated_at,
                playerOne: {
                  army: game.army_one,
                  cp: game.cp_one,
                  name: game.player_one.name,
                  score: game.score_one
                }
              }

              if (game.status === 'new') {
                return undefined
              }

              return {
                ...baseGame,
                playerTwo: {
                  army: game.army_two,
                  cp: game.cp_two,
                  name: game.player_two.name,
                  score: game.score_two
                },
                status: game.status
              }
            })
            .filter<ActiveGame | EndedGame>(isActiveOrEndedGame)
            .sort(({ id: id1 }, { id: id2 }) => Number(id2) - Number(id1))
        }
      } catch (error) {
        return { error }
      }
    },
    providesTags: [GamesApiTag.GAME_LIST]
  })

const isActiveOrEndedGame = (
  game: ActiveGame | EndedGame | undefined
): game is ActiveGame | EndedGame => !!game

export default getGames
