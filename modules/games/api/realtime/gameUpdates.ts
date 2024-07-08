import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'
import { type RealTimeGame } from '../types'

type GameUpdatesParams = {
  eventHandler: (payload: RealtimePostgresUpdatePayload<RealTimeGame>) => void
  gameId: string
}

const gameUpdates = ({ eventHandler, gameId }: GameUpdatesParams) =>
  supabase.channel(Table.GAMES).on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'games',
      filter: `id=eq.${gameId}`
    },
    eventHandler
  )

export default gameUpdates
