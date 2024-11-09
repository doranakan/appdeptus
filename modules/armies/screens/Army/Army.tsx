import {
  ArmyBackground,
  Badge,
  Card,
  Error,
  HStack,
  Loading,
  NavigationHeader,
  resetTheme,
  ScreenContainer,
  ScreenTitle,
  setTheme,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import { QrCode } from 'lucide-react-native'
import { useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { useGetArmyListQuery } from '../../api'
import CompositionTab from './CompositionTab'

const ArmyScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { army } = useGetArmyListQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      army: data?.find(({ id: armyId }) => armyId === Number(id)),
      ...rest
    })
  })

  if (!id) {
    return (
      <ScreenContainer
        safeAreaInsets={['bottom']}
        className='items-center justify-center'
      >
        <Error />
      </ScreenContainer>
    )
  }

  if (!army) {
    return (
      <ScreenContainer
        safeAreaInsets={['bottom']}
        className='items-center justify-center'
      >
        <Loading />
      </ScreenContainer>
    )
  }

  return <ArmyContainer army={army} />
}

type ArmyContainerProps = {
  army: Army
}

const ArmyContainer = ({ army }: ArmyContainerProps) => {
  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(setTheme(army.codex.name))
    return () => {
      dispatch(resetTheme())
    }
  })

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <VStack
        className='flex-1'
        space='md'
      >
        <VStack className='flex-1'>
          <ArmyBackground codex={army.codex.name} />
          <LinearGradient
            colors={[
              `${themeColors[army.codex.name].primary[950]}00`,
              themeColors[army.codex.name].primary[950]
            ]}
            style={styles.gradient}
          />
          <SafeAreaView
            edges={['top']}
            style={styles.safeAreaView}
          >
            <VStack className='flex-1 justify-between px-4'>
              <NavigationHeader
                variant='backButton'
                rightButton={{
                  href: '',
                  variant: 'link',
                  disabled: true,
                  icon: QrCode
                }}
              />
              <VStack space='md'>
                <ScreenTitle>{army.name}</ScreenTitle>
                <Card mode='blur'>
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
        </VStack>
        <VStack className='flex-1 px-4'>
          <CompositionTab composition={army.composition} />
        </VStack>
      </VStack>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  safeAreaView: {
    flex: 1
  }
})

export default ArmyScreen
