import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import GamesApiTag from '../tags'

const nextTurn = (builder: CoreEndpointBuilder<GamesApiTag>) =>
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
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: (_res, _error, gameId) => [
      GamesApiTag.GAME_LIST,
      {
        type: GamesApiTag.GAME,
        id: gameId
      }
    ]
  })

export default nextTurn
