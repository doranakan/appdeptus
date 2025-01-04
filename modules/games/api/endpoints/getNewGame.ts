import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type NewGame } from 'appdeptus/models/game'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
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
              *
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
          return { error: JSON.stringify(error) }
        }

        const game = await getNewGameSchema.parseAsync(
          mapNullToUndefined(data[0])
        )

        return {
          data: game
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getNewGame
