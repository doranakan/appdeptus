import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type GameArmy } from 'appdeptus/models'
import { type ActiveGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import GamesApiTag from '../tags'

type UpdateGameArmyParams = {
  gameId: ActiveGame['id']
  id: GameArmy['id']
  roster: GameArmy['roster']
}

const updateGameArmy = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.mutation<null, UpdateGameArmyParams>({
    queryFn: async ({ id, roster }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAME_ARMIES)
          .update({
            id,
            roster
          })
          .eq('id', id)

        if (error) {
          return { error: JSON.stringify(error) }
        }

        return { data }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    invalidatesTags: (_res, _error, { gameId }) => [
      GamesApiTag.GAME_LIST,
      {
        type: GamesApiTag.GAME,
        id: gameId
      }
    ]
  })

export default updateGameArmy
