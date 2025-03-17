import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type GamesApiTags } from '../tags'

type SetFirstPlayerRequest = {
  firstPlayer: 'one' | 'two'
  gameId: number
}

const setFirstPlayer = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<null, SetFirstPlayerRequest>({
    queryFn: async ({ firstPlayer, gameId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            active_player: firstPlayer
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

export default setFirstPlayer
