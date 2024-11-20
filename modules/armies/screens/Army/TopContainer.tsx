import {
  Badge,
  Card,
  HStack,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { memo } from 'react'
import { useModelCount, useUnitCount, useWarlord } from '../../hooks'

type TopContainerProps = {
  army: Army
}

const TopContainer = ({ army }: TopContainerProps) => {
  const unitCount = useUnitCount(army.roster)

  const numberOfModels = useModelCount(army.roster)

  const warlord = useWarlord(army.roster)

  return (
    <VStack space='md'>
      <ScreenTitle>{army.name}</ScreenTitle>
      <Card>
        <VStack
          className='p-4'
          space='md'
        >
          <HStack className='items-center justify-between'>
            <Text
              className='uppercase'
              family='body-bold'
              size='xl'
            >
              {army.codex.name}
            </Text>
            <Badge text={`${army.points}PTS`} />
          </HStack>
          <HStack
            className='items-center'
            space='md'
          >
            <Text>Detachment:</Text>
            <Badge
              text={army.detachment.name}
              variant='tertiary'
            />
          </HStack>
          <HStack space='md'>
            <Text>Warlord:</Text>
            <Text family='body-bold'>{warlord?.name}</Text>
          </HStack>
          <HStack space='md'>
            <Text>
              Units: <Text family='body-bold'>{unitCount}</Text>
            </Text>
            <Text>|</Text>
            <Text>
              Models: <Text family='body-bold'>{numberOfModels}</Text>
            </Text>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  )
}

export default memo(TopContainer)
