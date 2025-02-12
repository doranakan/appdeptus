import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { createGameArmy, createGameSchema } from '../schemas'
import { type GamesApiTags } from '../tags'
import { mapArmyToGameArmy } from '../util'

const createGame = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<Army['id'], Omit<Army, 'user'>>({
    queryFn: async ({ id: _id, isValid: _isValid, codex, roster, ...rest }) => {
      const gameArmyRoster = mapArmyToGameArmy(roster)

      try {
        const { data: gameArmyData, error: gameArmyError } = await supabase
          .from(Table.GAME_ARMIES)
          .insert({
            codex: codex.id,
            roster: gameArmyRoster,
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
    },
    invalidatesTags: (_, err) => (!err ? ['game-list'] : [])
  })

export default createGame
