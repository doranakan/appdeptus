import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type GamesApiTags } from '../tags'

type UpdateScoreAndCPParams = {
  gameId: ActiveGame['id']
  pOneScore: number
  pOneCP: number
  pTwoScore: number
  pTwoCP: number
}

const updateScoreAndCP = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<null, UpdateScoreAndCPParams>({
    queryFn: async ({ gameId, pOneScore, pOneCP, pTwoScore, pTwoCP }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            cp_one: pOneCP,
            cp_two: pTwoCP,
            score_one: pOneScore,
            score_two: pTwoScore
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

export default updateScoreAndCP
