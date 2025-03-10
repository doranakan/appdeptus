import {
  Badge,
  Card,
  HStack,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import InnerBorder from 'appdeptus/components/InnerBorder'
import { useModelCount, useUnitCount, useWarlord } from 'appdeptus/hooks'
import { type Army, type UserProfile } from 'appdeptus/models'
import { memo } from 'react'

type RosterTopContainerProps = {
  army: Army

  user?: UserProfile
}

const RosterTopContainer = ({ army }: RosterTopContainerProps) => {
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
          {!army.isValid ? (
            <InnerBorder>
              <VStack
                className='rounded-3xl bg-warning-700 p-4'
                space='md'
              >
                <Text
                  family='body-bold'
                  size='lg'
                >
                  ⚠️ Inquisition Warning
                </Text>
                <Text
                  className='text-justify'
                  family='body-regular-italic'
                  size='sm'
                >
                  This army has been updated. You need to apply changes and save
                  it to use it in your games again.
                </Text>
              </VStack>
            </InnerBorder>
          ) : null}
        </VStack>
      </Card>
    </VStack>
  )
}

export default memo(RosterTopContainer)
