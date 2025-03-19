import {
  ArmyBackground,
  ArmyRoster,
  Error,
  Loading,
  NavigationHeader,
  PlayerTag,
  ScreenContainer,
  ScreenSubtitle,
  setTheme,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { useAppDispatch } from 'appdeptus/store'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { RotateCcw, Save } from 'lucide-react-native'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useGetArmyQuery } from '../../api'
import { RosterTopContainer } from '../../components'
import { useSaveArmyCopy } from '../../hooks'

const ShareScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const {
    data: army,
    isLoading,
    isFetching,
    isError,
    isUninitialized,
    refetch
  } = useGetArmyQuery(id)

  const [saveArmy, { isLoading: isSaving }] = useSaveArmyCopy()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (army) {
      dispatch(setTheme(army.codex.name))
    }
  })

  if (isLoading || isFetching || isUninitialized) {
    return (
      <ScreenContainer
        className='items-center justify-center p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader variant='backButton' />
        <Loading />
      </ScreenContainer>
    )
  }

  if (isError) {
    return (
      <ScreenContainer
        className='items-center justify-center p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          variant='backButton'
          rightButton={{
            variant: 'callback',
            onPress: refetch,
            icon: RotateCcw
          }}
        />
        <Error />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer safeAreaInsets={['bottom', 'top']}>
      <VStack className='absolute h-full w-full'>
        <VStack className='flex-1'>
          <ArmyBackground codex={army.codex.name} />
          <LinearGradient
            colors={[
              `${themeColors[army.codex.name].primary[950]}00`,
              themeColors[army.codex.name].primary[950]
            ]}
            style={styles.gradient}
          />
        </VStack>
        <VStack className='flex-1' />
      </VStack>
      <VStack
        className='flex-1 px-4'
        space='md'
      >
        <NavigationHeader
          variant='closeButton'
          rightButton={{
            onPress: async () => {
              await saveArmy(army)

              if (router.canGoBack()) {
                router.back()
                return
              }

              router.replace('/')
            },
            variant: 'callback',
            icon: Save,
            disabled: isSaving,
            loading: isSaving
          }}
        />
        <ArmyRoster
          ListHeaderComponent={
            <VStack space='md'>
              <ScreenSubtitle>shared by:</ScreenSubtitle>
              <PlayerTag player={army.user} />
              <RosterTopContainer army={army} />
              <Text
                className='uppercase'
                family='body-bold'
              >
                units
              </Text>
              <VStack />
            </VStack>
          }
          roster={army.roster}
        />
      </VStack>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%'
  }
})

export default ShareScreen
