import { type ActiveGame } from 'appdeptus/models/game'
import { useAppDispatch } from 'appdeptus/store'
import { mapNullToUndefined } from 'appdeptus/utils'
import { useEffect } from 'react'
import gamesApi from '../api'
import { gameUpdates } from '../realtime'
import { realtimeGameSchema } from '../schemas'

const useGameUpdateListener = (args: Parameters<typeof gameUpdates>[0]) => {
  useEffect(() => {
    const sub = gameUpdates(args).subscribe()

    return () => {
      sub.unsubscribe()
    }
  })
}

const useGameUpdates = (gameId: ActiveGame['id']) => {
  const dispatch = useAppDispatch()

  useGameUpdateListener({
    eventHandler: ({ new: newData }) => {
      dispatch(
        gamesApi.util.updateQueryData(
          'getGame',
          gameId,
          (data) => {
            if (!data) {
              return data
            }

            const parsedData = realtimeGameSchema.parse(
              mapNullToUndefined(newData)
            )

            return {
              ...data,
              lastUpdate: parsedData.lastUpdate,
              playerOne: {
                ...data.playerOne,
                ...parsedData.playerOne
              },
              playerTwo: {
                ...data.playerTwo,
                ...parsedData.playerTwo
              },
              status: parsedData.status
            }
          },
          true
        )
      )
      return newData
    },
    gameId
  })
}

export default useGameUpdates
