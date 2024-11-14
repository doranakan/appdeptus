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
  useDeleteGameMutation,
  useEndGameMutation,
  useGetGameListQuery,
  useGetNewGameQuery,
  useNextTurnMutation,
  useStartGameMutation,
  useUpdateScoreAndCPMutation
} = gamesApi

export {
  useCreateGameMutation,
  useDeleteGameMutation,
  useEndGameMutation,
  useGameUpdateListener,
  useGetGameListQuery,
  useGetNewGameQuery,
  useNextTurnMutation,
  useStartGameMutation,
  useUpdateScoreAndCPMutation
}
