import { type ActiveGame } from 'appdeptus/models/game'
import { useAppDispatch } from 'appdeptus/store'
import { mapNullToUndefined } from 'appdeptus/utils'
import gamesApi from '../api'
import { realtimeGameArmySchema } from '../schemas'
import useGameArmyUpdateListener from './useGameArmyUpdateListener'

const useGameArmyUpdates = ({ id, playerOne, playerTwo }: ActiveGame) => {
  const dispatch = useAppDispatch()

  useGameArmyUpdateListener({
    eventHandler: ({ new: newData }) => {
      dispatch(
        gamesApi.util.updateQueryData(
          'getGame',
          id,
          (data) => {
            if (!data) {
              return data
            }

            const parsedData = realtimeGameArmySchema.parse(
              mapNullToUndefined(newData)
            )

            const playerOne =
              data.playerOne.army.id === parsedData.id
                ? {
                    ...data.playerOne,
                    army: {
                      ...data.playerOne.army,
                      roster: parsedData.roster
                    }
                  }
                : data.playerOne

            const playerTwo =
              data.playerTwo.army.id === parsedData.id
                ? {
                    ...data.playerTwo,
                    army: {
                      ...data.playerTwo.army,
                      roster: parsedData.roster
                    }
                  }
                : data.playerTwo

            return {
              ...data,
              playerOne,
              playerTwo
            }
          },
          true
        )
      )
      return newData
    },
    armyOneId: playerOne.army.id,
    armyTwoId: playerTwo.army.id
  })
}

export default useGameArmyUpdates
