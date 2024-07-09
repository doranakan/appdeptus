import { getUserId, type SupabaseEndpointBuilder } from 'appdeptus/api'
import { GameStatus, type Game, type NewGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGamesSchema } from '../schemas'
import GamesApiTag from '../tags'

const isNonNewGame = (game: NewGame | Game): game is Game =>
  game.status !== GameStatus.NEW

const getGames = (builder: SupabaseEndpointBuilder<GamesApiTag>) =>
  builder.query<Game[], void>({
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
            id,
            score_one,
            score_two,
            created_at,
            status,
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
            .map<NewGame | Game>((rawGame) => {
              const game = {
                created: rawGame.created_at,
                id: rawGame.id,
                playerOne: {
                  army: rawGame.army_one,
                  name: rawGame.player_one.name,
                  score: rawGame.score_one
                }
              }

              if (rawGame.status === GameStatus.NEW) {
                return {
                  ...game,
                  status: rawGame.status
                }
              }

              return {
                ...game,
                playerTwo: {
                  army: rawGame.army_two,
                  name: rawGame.player_two.name,
                  score: rawGame.score_two
                },
                status: rawGame.status
              }
            })
            .filter<Game>(isNonNewGame)
            .sort(({ id: id1 }, { id: id2 }) => Number(id2) - Number(id1))
        }
      } catch (error) {
        return { error }
      }
    },
    providesTags: [GamesApiTag.GAME_LIST]
  })

export default getGames
