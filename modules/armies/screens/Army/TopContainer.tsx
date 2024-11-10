import {
  Badge,
  Card,
  HStack,
  NavigationHeader,
  ScreenTitle,
  Text,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { EllipsisVertical } from 'lucide-react-native'
import { memo, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ref from './ref'

type TopContainerProps = {
  army: Army
}

const TopContainer = ({ army }: TopContainerProps) => {
  const numberOfUnits = useMemo(() => {
    const { characters, leaders, squads, teams, transports, vehicles } =
      army.composition

    return (
      characters.length +
      leaders.length +
      squads.length +
      teams.length * 2 + // every team has 2 units
      transports.length +
      vehicles.length +
      1 // warlord
    )
  }, [army.composition])

  const numberOfModels = useMemo(() => {
    const {
      characters,
      leaders,
      squads,
      teams,
      transports,
      vehicles,
      warlord
    } = army.composition

    const units = [
      ...characters,
      ...leaders,
      ...squads,
      ...teams,
      ...transports,
      ...vehicles,
      warlord
    ]

    return units.reduce((acc, unit) => {
      if (unit.type === 'team') {
        return acc + unit.leader.tier.models + unit.bodyguard.tier.models
      }
      return acc + unit.tier.models
    }, 0)
  }, [army.composition])

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.safeAreaView}
    >
      <VStack className='flex-1 justify-between px-4'>
        <NavigationHeader
          variant='backButton'
          rightButton={{
            onPress: () => ref.current?.present(),
            variant: 'callback',
            icon: EllipsisVertical
          }}
        />
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
                  text={army.composition.detachment.name}
                  variant='tertiary'
                />
              </HStack>
              <HStack space='md'>
                <Text>Warlord:</Text>
                <Text family='body-bold'>
                  {army.composition.warlord.type === 'team'
                    ? army.composition.warlord.leader.name
                    : army.composition.warlord.name}
                </Text>
              </HStack>
              <HStack space='md'>
                <Text>
                  Units: <Text family='body-bold'>{numberOfUnits}</Text>
                </Text>
                <Text>|</Text>
                <Text>
                  Models: <Text family='body-bold'>{numberOfModels}</Text>
                </Text>
              </HStack>
            </VStack>
          </Card>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  }
})

export default memo(TopContainer)
