import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { GameStatus } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import GamesApiTag from '../tags'

type StartGameRequest = {
  armyId: string
  gameId: string
}

const startGame = (builder: SupabaseEndpointBuilder<GamesApiTag>) =>
  builder.mutation<null, StartGameRequest>({
    queryFn: async ({ armyId, gameId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            army_two: armyId,
            status: GameStatus.READY
          })
          .eq('id', gameId)

        if (error) {
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: [GamesApiTag.GAME_LIST]
  })

export default startGame