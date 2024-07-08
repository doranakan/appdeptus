import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { GameStatus, type Game } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { getGameSchema } from '../schemas'

const getGames = (builder: SupabaseEndpointBuilder) =>
  builder.query<Game, string>({
    queryFn: async (gameId) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .select(
            `
            id,
            score_one,
            score_two,
            created_at,
            status,
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
            name: game.player_one.name,
            score: game.score_one
          }
        }

        if (game.status === GameStatus.NEW) {
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

export default getGames
