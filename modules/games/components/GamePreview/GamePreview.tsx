import {
  Badge,
  GameDataTable,
  HStack,
  Text,
  VStack
} from 'appdeptus/components'
import { shortCodexNames } from 'appdeptus/constants'

import { type Army } from 'appdeptus/models'
import { type ComponentProps, memo, useMemo } from 'react'

type GamePreviewProps = {
  armyOne: Army

  armyTwo?: Army
}

const GamePreview = ({ armyOne, armyTwo }: GamePreviewProps) => {
  const data = useMemo<ComponentProps<typeof GameDataTable>['data']>(
    () => [
      {
        title: 'Warlord',
        valueL:
          armyOne.composition.warlord.type === 'team'
            ? armyOne.composition.warlord.leader.name
            : armyOne.composition.warlord.name,
        valueR: armyTwo
          ? armyTwo.composition.warlord.type === 'team'
            ? armyTwo.composition.warlord.leader.name
            : armyTwo.composition.warlord.name
          : ''
      },
      {
        title: 'Points',
        valueL: `${armyOne.points}PTS`,
        valueR: armyTwo ? `${armyTwo.points}PTS` : ''
      }
    ],
    [armyOne, armyTwo]
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
          text={armyOne.composition.detachment.name}
          codex={armyOne.codex.name}
        />
        {armyTwo ? (
          <Badge
            text={armyTwo.composition.detachment.name}
            codex={armyTwo.codex.name}
          />
        ) : null}
      </HStack>
      <GameDataTable data={data} />
    </VStack>
  )
}

export default memo(GamePreview)
