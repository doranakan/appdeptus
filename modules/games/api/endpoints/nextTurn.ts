import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { round } from 'lodash'
import { type GamesApiTags } from '../tags'

type NextTurnParams = {
  currentActivePlayer: 'one' | 'two'
  currentTurn: ActiveGame['turn']
  gameId: ActiveGame['id']
}

const nextTurn = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<null, NextTurnParams>({
    queryFn: async ({ currentActivePlayer, currentTurn, gameId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            active_player: currentActivePlayer === 'one' ? 'two' : 'one',
            turn: currentTurn + 1,
            round:
              currentTurn % 2 === 0
                ? currentTurn / 2 + 1
                : round(currentTurn / 2)
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
    invalidatesTags: (_res, _error, { gameId: id }) => [
      'game-list',
      {
        type: 'game-list',
        id
      }
    ]
  })

export default nextTurn
