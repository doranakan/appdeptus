import {
  Badge,
  GameDataTable,
  HStack,
  Text,
  VStack
} from 'appdeptus/components'
import { shortCodexNames } from 'appdeptus/constants'

import { type Army } from 'appdeptus/models'
import { useWarlord } from 'appdeptus/modules/armies/hooks'
import { type ComponentProps, memo, useMemo } from 'react'

type GamePreviewProps = {
  armyOne: Army

  armyTwo?: Army
}

const GamePreview = ({ armyOne, armyTwo }: GamePreviewProps) => {
  const warlordOne = useWarlord(armyOne.units)
  const warlordTwo = useWarlord(armyTwo?.units ?? [])

  const data = useMemo<ComponentProps<typeof GameDataTable>['data']>(
    () => [
      {
        title: 'Warlord',
        valueL: warlordOne?.name ?? '',
        valueR: warlordTwo?.name ?? ''
      },
      {
        title: 'Points',
        valueL: `${armyOne.points}PTS`,
        valueR: armyTwo ? `${armyTwo.points}PTS` : ''
      }
    ],
    [armyOne.points, armyTwo, warlordOne, warlordTwo]
  )

  return (
    <VStack space='md'>
      <HStack className='justify-between'>
        <Text
          className='uppercase'
          family='body-bold'
          size='4xl'
        >
          {shortCodexNames[armyOne.codex.name]}
        </Text>
        {armyTwo ? (
          <Text
            className='uppercase'
            family='body-bold'
            size='4xl'
          >
            {shortCodexNames[armyTwo.codex.name]}
          </Text>
        ) : null}
      </HStack>
      <HStack className='justify-between'>
        <Badge
          text={armyOne.detachment.name}
          codex={armyOne.codex.name}
        />
        {armyTwo ? (
          <Badge
            text={armyTwo.detachment.name}
            codex={armyTwo.codex.name}
          />
        ) : null}
      </HStack>
      <GameDataTable data={data} />
    </VStack>
  )
}

export default memo(GamePreview)
