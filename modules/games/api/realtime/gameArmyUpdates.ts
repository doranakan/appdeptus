import { type RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { type GameArmy } from 'appdeptus/models'
import { supabase } from 'appdeptus/utils'
import { Table } from 'appdeptus/utils/supabase'

type GameArmyUpdatesParams = {
  eventHandler: (
    payload: RealtimePostgresUpdatePayload<{ roster: GameArmy['roster'] }>
  ) => void
  armyOneId: GameArmy['id']
  armyTwoId: GameArmy['id']
}

const gameArmyUpdates = ({
  eventHandler,
  armyOneId,
  armyTwoId
}: GameArmyUpdatesParams) =>
  supabase.channel(Table.GAME_ARMIES).on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: Table.GAME_ARMIES,
      filter: `id=in.(${armyOneId}, ${armyTwoId})`
    },
    eventHandler
  )

export default gameArmyUpdates
