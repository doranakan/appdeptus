import { useEffect } from 'react'
import { gameArmyUpdates } from '../realtime'

const useGameArmyUpdateListener = (
  args: Parameters<typeof gameArmyUpdates>[0]
) => {
  useEffect(() => {
    const sub = gameArmyUpdates(args).subscribe()

    return () => {
      sub.unsubscribe()
    }
  })
}

export default useGameArmyUpdateListener
