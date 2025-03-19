import { type CoreEndpointBuilder } from 'appdeptus/api'
import { type Community } from 'appdeptus/models'
import { type EndedGame } from 'appdeptus/models/game'
import { getEndedGameListSchema } from 'appdeptus/modules/games/api/schemas'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type CommunitiesApiTags } from '../tags'

const getCommunityGameList = (
  builder: CoreEndpointBuilder<CommunitiesApiTags>
) =>
  builder.query<EndedGame[], Community['id']>({
    queryFn: async (id) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .select(
            `
            *,
            player_one (
              *
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
              *
            ),
            army_two (
              *,
              codex!inner(
                *
              )
            ),
            community (
              *
            )
            `
          )
          .eq('community', id)
          .eq('status', 'ended')

        if (error) {
          return { error: JSON.stringify(error) }
        }

        const games = getEndedGameListSchema.parse(mapNullToUndefined(data))

        return {
          data: games
        }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    }
  })

export default getCommunityGameList
