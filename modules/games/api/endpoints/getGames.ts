import { getUserId, type SupabaseEndpointBuilder } from 'appdeptus/api'
import { GameStatus, type Game } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGamesSchema } from '../schemas'

const getGames = (builder: SupabaseEndpointBuilder) =>
  builder.query<Game[], void>({
    queryFn: async () => {
      try {
        const userId = await getUserId()

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
          .eq('player_one', userId)

        if (error) {
          return { error }
        }

        const games = await getGamesSchema.parseAsync(data)

        return {
          data: games.map<Game>((rawGame) => {
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
        }
      } catch (error) {
        return { error }
      }
    }
  })

export default getGames
