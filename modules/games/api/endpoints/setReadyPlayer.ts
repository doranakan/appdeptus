import { type CoreEndpointBuilder } from 'appdeptus/api'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type GamesApiTags } from '../tags'

type SetReadyPlayerRequest = {
  player: 'one' | 'two'
  ready: boolean
  gameId: number
}

const setReadyPlayer = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<null, SetReadyPlayerRequest>({
    queryFn: async ({ player, ready, gameId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            [`ready_${player}`]: ready
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

export default setReadyPlayer
