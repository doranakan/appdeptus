import { useEffect } from 'react'
import gamesApi from './api'
import { gameUpdates } from './realtime'

const useGameUpdateListener = (args: Parameters<typeof gameUpdates>[0]) => {
  useEffect(() => {
    const sub = gameUpdates(args).subscribe()

    return () => {
      sub.unsubscribe()
    }
  })
}

const {
  useCreateGameMutation,
  useGetGameArmyQuery,
  useGetGameQuery,
  useGetGamesQuery,
  useNextTurnMutation,
  useStartGameMutation,
  useUpdateScoreAndCPMutation
} = gamesApi

export {
  useCreateGameMutation,
  useGameUpdateListener,
  useGetGameArmyQuery,
  useGetGameQuery,
  useGetGamesQuery,
  useNextTurnMutation,
  useStartGameMutation,
  useUpdateScoreAndCPMutation
}
