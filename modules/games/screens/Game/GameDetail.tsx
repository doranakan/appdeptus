import {
  Badge,
  GameDataTable,
  HStack,
  PlayerTag,
  VStack
} from 'appdeptus/components'
import { type Player } from 'appdeptus/models/game'
import {
  useModelCount,
  useUnitCount,
  useWarlord
} from 'appdeptus/modules/armies/hooks'
import { type ComponentProps, memo, useMemo } from 'react'

type GameDetailProps = {
  playerOne: Player
  playerTwo: Player
}

const GameDetail = ({ playerOne, playerTwo }: GameDetailProps) => {
  const warlordOne = useWarlord(playerTwo.army.units)
  const warlordTwo = useWarlord(playerTwo.army.units ?? [])

  const unitCountOne = useUnitCount(playerOne.army.units)
  const unitCountTwo = useUnitCount(playerTwo.army.units)

  const modelCountOne = useModelCount(playerOne.army.units)
  const modelCountTwo = useModelCount(playerTwo.army.units)

  const data = useMemo<ComponentProps<typeof GameDataTable>['data']>(
    () => [
      {
        title: 'Warlord',
        valueL: warlordOne?.name ?? '',
        valueR: warlordTwo?.name ?? ''
      },
      {
        title: 'Points',
        valueL: `${playerOne.army.points}PTS`,
        valueR: `${playerOne.army.points}PTS`
      },
      {
        title: 'Command points',
        valueL: String(playerOne.cp),
        valueR: String(playerTwo.cp)
      },
      {
        title: 'Kills',
        valueL: String(0),
        valueR: String(0)
      },
      {
        title: 'Units Destroyed',
        valueL: String(0),
        valueR: String(0)
      },
      {
        title: 'Units',
        valueL: String(unitCountOne),
        valueR: String(unitCountTwo)
      },
      {
        title: 'Units Left',
        valueL: String(unitCountOne),
        valueR: String(unitCountTwo)
      },
      {
        title: 'Models',
        valueL: String(modelCountOne),
        valueR: String(modelCountTwo)
      },
      {
        title: 'Models Left',
        valueL: String(modelCountOne),
        valueR: String(modelCountTwo)
      }
    ],
    [
      playerOne,
      playerTwo,
      warlordOne,
      warlordTwo,
      unitCountOne,
      unitCountTwo,
      modelCountOne,
      modelCountTwo
    ]
  )

  return (
    <VStack space='md'>
      <HStack className='justify-between'>
        <PlayerTag player={playerOne.profile} />
        <PlayerTag
          player={playerTwo.profile}
          reversed
        />
      </HStack>
      <HStack className='justify-between'>
        <Badge
          text={playerOne.army.detachment.name}
          codex={playerOne.army.codex.name}
        />

        <Badge
          text={playerTwo.army.detachment.name}
          codex={playerTwo.army.codex.name}
        />
      </HStack>
      <GameDataTable data={data} />
    </VStack>
  )
}

export default memo(GameDetail)