import { supabase } from 'appdeptus/utils'
import { useEffect } from 'react'
import { gameUpdates } from '../realtime'

const useGameUpdateListener = (args: Parameters<typeof gameUpdates>[0]) => {
  useEffect(() => {
    const channel = gameUpdates(args)
    channel.subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  })
}

export default useGameUpdateListener
