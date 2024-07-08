import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

type StartGameRequest = {
  armyId: string
  gameId: string
}

const startGame = (builder: SupabaseEndpointBuilder) =>
  builder.mutation<null, StartGameRequest>({
    queryFn: async ({ armyId, gameId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            army_two: armyId
          })
          .eq('id', gameId)

        if (error) {
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    }
  })

export default startGame
