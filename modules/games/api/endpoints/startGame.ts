import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { createGameArmy } from '../schemas'
import { type GamesApiTags } from '../tags'
import { mapArmyToGameArmy } from '../util'

type StartGameRequest = {
  army: Omit<Army, 'user'>
  gameId: number
}

const startGame = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<null, StartGameRequest>({
    queryFn: async ({ army, gameId }) => {
      try {
        const {
          id: _,
          isValid: _isValid,
          isSecret: _isSecret,
          codex,
          ...rest
        } = army

        const roster = mapArmyToGameArmy(rest.roster)

        const { data: gameArmyData, error: gameArmyError } = await supabase
          .from(Table.GAME_ARMIES)
          .insert({
            codex: codex.id,
            ...rest,
            roster
          })
          .select('id')

        if (gameArmyError) {
          return { error: JSON.stringify(gameArmyError) }
        }

        const { id: gameArmyId } = await createGameArmy.parseAsync(
          mapNullToUndefined(gameArmyData[0])
        )

        const userId = await getUserId()

        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            army_two: gameArmyId,
            player_two: userId,
            status: 'active'
          })
          .eq('id', gameId)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_, err, { gameId: id }) =>
      !err ? [{ type: 'game-list', id }] : []
  })

export default startGame
