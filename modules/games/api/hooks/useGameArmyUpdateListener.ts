import { supabase } from 'appdeptus/utils'
import { useEffect } from 'react'
import { gameArmyUpdates } from '../realtime'

const useGameArmyUpdateListener = (
  args: Parameters<typeof gameArmyUpdates>[0]
) => {
  useEffect(() => {
    const channel = gameArmyUpdates(args)

    channel.subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  })
}

export default useGameArmyUpdateListener
