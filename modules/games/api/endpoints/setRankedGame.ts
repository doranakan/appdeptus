import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type GamesApiTags } from '../tags'

type SetRankedGameRequest = {
  gameId: number

  communityId?: Community['id']
}

const setRankedGame = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.mutation<null, SetRankedGameRequest>({
    queryFn: async ({ gameId, communityId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            community: communityId ?? null,
            ready_one: false,
            ready_two: false
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

export default setRankedGame
