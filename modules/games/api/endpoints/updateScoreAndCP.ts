import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import GamesApiTag from '../tags'

type UpdateScoreAndCPParams = {
  gameId: ActiveGame['id']
  pOneScore: number
  pOneCP: number
  pTwoScore: number
  pTwoCP: number
}

const updateScoreAndCP = (builder: SupabaseEndpointBuilder<GamesApiTag>) =>
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

        console.log({ data, error })

        if (error) {
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    },
    invalidatesTags: (_error, _res, { gameId }) => [
      GamesApiTag.GAME_LIST,
      {
        type: GamesApiTag.GAME,
        id: gameId
      }
    ]
  })

export default updateScoreAndCP
