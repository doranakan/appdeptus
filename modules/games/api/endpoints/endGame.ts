import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type GamesApiTags } from '../tags'

const nextTurn = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<null, ActiveGame['id']>({
    queryFn: async (gameId) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            status: 'ended'
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
    invalidatesTags: (_res, _error, id) => [
      'game-list',
      {
        type: 'game-list',
        id
      }
    ]
  })

export default nextTurn
