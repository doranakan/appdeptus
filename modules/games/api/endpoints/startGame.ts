import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type Army } from 'appdeptus/models'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { createGameArmy } from '../schemas'
import GamesApiTag from '../tags'

type StartGameRequest = {
  army: Army
  gameId: number
}

const startGame = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.mutation<null, StartGameRequest>({
    queryFn: async ({ army, gameId }) => {
      try {
        const { id: _, codex, ...rest } = army

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

        const userId = await getUserId()

        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            army_two: gameArmyId,
            player_two: userId,
            status: 'turn1_p1'
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
    invalidatesTags: [GamesApiTag.GAME_LIST, GamesApiTag.GAME]
  })

export default startGame
