import { type CoreEndpointBuilder } from 'appdeptus/api'
import {
  type ActiveGame,
  type EndedGame,
  type NewGame
} from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGameSchema } from '../schemas'
import GamesApiTag from '../tags'

const getGame = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.query<ActiveGame | EndedGame | NewGame, string>({
    queryFn: async (gameId) => {
      try {
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
          .eq('id', gameId)

        if (error) {
          return { error }
        }

        const game = await getGameSchema.parseAsync(data[0])

        return {
          data: {
            id: game.id,
            lastUpdate: game.updated_at,
            playerOne: {
              army: game.army_one,
              cp: game.cp_one,
              name: game.player_one.name,
              score: game.score_one
            },
            playerTwo: {
              army: game.army_two,
              cp: game.cp_two,
              name: game.player_two.name,
              score: game.score_two
            },
            status: game.status
          }
        }
      } catch (error) {
        return { error }
      }
    },
    providesTags: (_err, _res, gameId) => [
      {
        type: GamesApiTag.GAME,
        id: gameId
      }
    ]
  })

export default getGame
