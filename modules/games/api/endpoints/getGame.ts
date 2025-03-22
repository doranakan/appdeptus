import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame, type EndedGame } from 'appdeptus/models/game'
import { mapNullToUndefined, supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGameSchema } from '../schemas'
import { type GamesApiTags } from '../tags'

const getGame = (builder: CoreEndpointBuilder<GamesApiTags>) =>
  builder.query<ActiveGame | EndedGame | null, ActiveGame['id'] | void>({
    queryFn: async (gameId) => {
      try {
        const { data, error } = gameId
          ? await getGameWithId(gameId)
          : await getGameWithouId()

        if (error) {
          return { error: JSON.stringify(error) }
        }

        if (!data?.[0]) {
          return { data: null }
        }

        const game = await getGameSchema.parseAsync(mapNullToUndefined(data[0]))

        return { data: game }
      } catch (error) {
        return { error: JSON.stringify(error) }
      }
    },
    providesTags: (_res, _err, id) => [
      'game-list',
      {
        type: 'game-list',
        id: id ?? undefined
      }
    ]
  })

const getGameWithId = async (gameId: ActiveGame['id']) =>
  await supabase
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
    .eq('id', gameId)

const getGameWithouId = async () => {
  const userId = await getUserId()

  if (typeof userId === 'object') {
    throw userId.error
  }

  return await supabase
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
    .or(`player_one.eq.${userId},player_two.eq.${userId}`)
    .not('status', 'eq', 'new')
    .not('status', 'eq', 'ended')
    .limit(1)
}

export default getGame
