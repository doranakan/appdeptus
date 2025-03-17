import { DoubleDataTable, Scoreboard, VStack } from 'appdeptus/components'
import { useModelCount, useUnitCount, useWarlord } from 'appdeptus/hooks'
import { type ActiveGame } from 'appdeptus/models/game'
import { memo } from 'react'

type DataTableProps = {
  playerOne: ActiveGame['playerOne']
  playerTwo: ActiveGame['playerTwo']
}

const DataTable = ({ playerOne, playerTwo }: DataTableProps) => {
  const warlordOne = useWarlord(playerOne.army.roster)
  const warlordTwo = useWarlord(playerTwo.army.roster)

  const unitCountOne = useUnitCount(playerOne.army.roster)
  const unitCountTwo = useUnitCount(playerTwo.army.roster)

  const modelCountOne = useModelCount(playerOne.army.roster)
  const modelCountTwo = useModelCount(playerTwo.army.roster)

  return (
    <VStack space='md'>
      <Scoreboard
        playerOne={playerOne}
        playerTwo={playerTwo}
        status='in_lobby'
      />
      <DoubleDataTable
        data={[
          {
            title: 'Points',
            valueL: String(playerOne.army.points),
            valueR: String(playerTwo.army.points)
          },
          {
            title: 'Warlord',
            valueL: warlordOne?.name ?? '',
            valueR: warlordTwo?.name ?? ''
          },
          {
            title: 'Units',
            valueL: String(unitCountOne),
            valueR: String(unitCountTwo)
          },
          {
            title: 'Models',
            valueL: String(modelCountOne),
            valueR: String(modelCountTwo)
          }
        ]}
      />
    </VStack>
  )
}

export default memo(DataTable)
