import { getUserId, type CoreEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame, type EndedGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGameSchema } from '../schemas'
import GamesApiTag from '../tags'

const getGame = (builder: CoreEndpointBuilder<GamesApiTag>) =>
  builder.query<ActiveGame | EndedGame | null, ActiveGame['id'] | void>({
    queryFn: async (gameId) => {
      try {
        const { data, error } = gameId
          ? await getGameWithId(gameId)
          : await getGameWithouId()

        if (error) {
          return { error }
        }

        if (!data?.length) {
          return { data: null }
        }

        if (!data[0]) {
          return { data: null }
        }

        const game = await getGameSchema.parseAsync(data[0])

        return { data: game }
      } catch (error) {
        return { error }
      }
    },
    providesTags: [GamesApiTag.GAME_LIST]
  })

const getGameWithId = async (gameId: ActiveGame['id']) =>
  await supabase
    .from(Table.GAMES)
    .select(
      `
            *,
            player_one (
              id,
              name
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
              id,
              name
            ),
            army_two (
              *,
              codex!inner(
                *
              )
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
              id,
              name
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
              id,
              name
            ),
            army_two (
              *,
              codex!inner(
                *
              )
            )
            `
    )
    .or(`player_one.eq.${userId},player_two.eq.${userId}`)
    .not('status', 'eq', 'new')
    .not('status', 'eq', 'ended')
    .limit(1)
}

export default getGame
