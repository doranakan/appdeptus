import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import {
  type ActiveGame,
  type EndedGame,
  type NewGame
} from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGameSchema } from '../schemas'
import type GamesApiTag from '../tags'

const getGame = (builder: SupabaseEndpointBuilder<GamesApiTag>) =>
  builder.query<ActiveGame | EndedGame | NewGame, string>({
    queryFn: async (gameId) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .select(
            `
            *,
            player_one (
              name
            ),
            army_one (
              *,
              codex!inner(
                *
              )
            ),
            player_two (
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

        if (error) {
          return { error }
        }

        const game = await getGameSchema.parseAsync(data[0])

        const baseGame = {
          created: game.created_at,
          id: game.id,
          playerOne: {
            army: game.army_one,
            cp: game.cp_one,
            name: game.player_one.name,
            score: game.score_one
          }
        }

        if (game.status === 'new') {
          return {
            data: {
              ...baseGame,
              status: game.status
            }
          }
        }

        return {
          data: {
            ...baseGame,
            playerTwo: {
              army: game.army_two,
              cp: game.cp_two,
              name: game.player_two.name,
              score: game.score_two
            },
            status: game.status
          }
        }
      } catch (error) {
        return { error }
      }
    }
  })

export default getGame
