import { type SupabaseEndpointBuilder } from 'appdeptus/api'
import { type ActiveGame, type EndedGame } from 'appdeptus/models/game'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import type GamesApiTag from '../tags'

type NextTurnParams = {
  currentStatus: ActiveGame['status']
  gameId: ActiveGame['id']
}

const nextTurn = (builder: SupabaseEndpointBuilder<GamesApiTag>) =>
  builder.mutation<null, NextTurnParams>({
    queryFn: async ({ currentStatus, gameId }) => {
      try {
        const { data, error } = await supabase
          .from(Table.GAMES)
          .update({
            status: mapNextTurn[currentStatus]
          })
          .eq('id', gameId)

        if (error) {
          return { error }
        }

        return { data }
      } catch (error) {
        return { error }
      }
    }
  })

const mapNextTurn: Record<
  ActiveGame['status'],
  ActiveGame['status'] | EndedGame['status']
> = {
  turn1_p1: 'turn1_p2',
  turn1_p2: 'turn2_p1',
  turn2_p1: 'turn2_p2',
  turn2_p2: 'turn3_p1',
  turn3_p1: 'turn3_p2',
  turn3_p2: 'turn4_p1',
  turn4_p1: 'turn4_p2',
  turn4_p2: 'turn5_p1',
  turn5_p1: 'turn5_p2',
  turn5_p2: 'ended'
}

export default nextTurn
