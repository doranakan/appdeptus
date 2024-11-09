import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type NewGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getNewGameSchema } from '../schemas'
import type GamesApiTag from '../tags'

const getNewGame = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.query<NewGame, number>({
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
            )
            `
          )
          .eq('id', gameId)

        if (error) {
          return { error }
        }

        const game = await getNewGameSchema.parseAsync(data[0])

        return {
          data: game
        }
      } catch (error) {
        return { error }
      }
    }
  })

export default getNewGame
