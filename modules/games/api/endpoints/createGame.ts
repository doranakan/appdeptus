import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { createGameArmy, createGameSchema } from '../schemas'
import type GamesApiTag from '../tags'

const createGame = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.mutation<Army['id'], Army>({
    queryFn: async ({ id: _, codex, ...rest }) => {
      try {
        const { data: gameArmyData, error: gameArmyError } = await supabase
          .from(Table.GAME_ARMIES)
          .insert({
            codex: codex.id,
            ...rest
          })
          .select('id')

        if (gameArmyError) {
          return { error: JSON.stringify(gameArmyError) }
        }

        const { id: gameArmyId } = await createGameArmy.parseAsync(
          mapNullToUndefined(gameArmyData[0])
        )

        const { data: gameData, error: gameError } = await supabase
          .from(Table.GAMES)
          .insert({
            army_one: gameArmyId
          })
          .select('id')

        if (gameError) {
          return { error: JSON.stringify(gameError) }
        }

        const { id } = await createGameSchema.parseAsync(
          mapNullToUndefined(gameData[0])
        )

        return { data: id }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default createGame
