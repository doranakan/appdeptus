import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { skipToken } from '@reduxjs/toolkit/query'
import { useUnmount } from 'ahooks'
import {
  type Button,
  Error,
  Loading,
  NavigationHeader,
  resetTheme,
  ScreenContainer,
  VStack
} from 'appdeptus/components'
import { defaultScreenOptions, formSheetOptions } from 'appdeptus/constants'
import { useCanCreateTeams, useCanEmbarkUnits } from 'appdeptus/hooks'
import { type CreateGame } from 'appdeptus/models/game'
import { useGetArmyQuery } from 'appdeptus/modules/armies/api'
import {
  NewGameBottomSheet,
  newGameBottomSheetRef
} from 'appdeptus/modules/games/components'
import { useAppDispatch } from 'appdeptus/store'
import { Stack, useGlobalSearchParams, useSegments } from 'expo-router'
import { ChevronRight, Dices } from 'lucide-react-native'
import { type ComponentProps, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const NewGameLayout = () => {
  const { preselectedArmyId } = useGlobalSearchParams<{
    preselectedArmyId: string
  }>()

  const form = useForm<CreateGame>({
    defaultValues: {
      playerOne: {
        army: undefined
      }
    }
  })

  const { watch } = form
  const selectedArmy = watch('playerOne.army')

  const segments = useSegments()

  const routeName = segments[segments.length - 1]

  const canCreateTeams = useCanCreateTeams(selectedArmy?.roster ?? [])
  const canEmbarkUnits = useCanEmbarkUnits(selectedArmy?.roster ?? [])

  const currentStep = useMemo(() => {
    switch (routeName) {
      case '[id]': {
        if (canCreateTeams) {
          return 3
        }
        if (canEmbarkUnits) {
          return 4
        }
        return 5
      }

      case 'new-game':
        return !selectedArmy ? 1 : 2

      case 'leader-selection':
        return 3

      case 'embarked-selection':
        return 4

      case 'camera':
      case 'qr-code':
      case 'double-check':
        return 5

      default:
        return 0
    }
  }, [canCreateTeams, canEmbarkUnits, routeName, selectedArmy])

  const text = useMemo(() => {
    switch (routeName) {
      case 'new-game':
        return !selectedArmy ? 'select army' : selectedArmy.name

      case '[id]':
      case 'leader-selection':
        return 'select leaders'

      case 'embarked-selection':
        return 'select units to embark'

      case 'double-check':
        return 'Awaiting the call to war'

      case 'camera':
      case 'qr-code':
        return 'Awaiting the call to war'

      default:
        return ''
    }
  }, [routeName, selectedArmy])

  const rightButton = useMemo<ComponentProps<typeof Button> | undefined>(() => {
    switch (routeName) {
      case 'new-game':
        return {
          disabled: !selectedArmy,
          icon: ChevronRight,
          href: canCreateTeams
            ? `new-game/${selectedArmy?.id}`
            : canEmbarkUnits
              ? 'new-game/embarked-selection'
              : 'new-game/double-check',
          variant: 'link'
        }

      case '[id]':
      case 'leader-selection':
        return {
          icon: ChevronRight,
          href: canEmbarkUnits
            ? 'new-game/embarked-selection'
            : 'new-game/double-check',
          variant: 'link'
        }

      case 'embarked-selection':
        return {
          icon: ChevronRight,
          href: 'new-game/double-check',
          variant: 'link'
        }

      case 'double-check':
        return {
          icon: Dices,
          onPress: () => {
            newGameBottomSheetRef.current?.present()
          },
          variant: 'callback'
        }

      case 'camera':
      case 'qr-code':
        return {
          icon: Dices,
          disabled: true,
          onPress: () => {},
          variant: 'callback'
        }

      default:
        return undefined
    }
  }, [canCreateTeams, canEmbarkUnits, routeName, selectedArmy])

  const dispatch = useAppDispatch()

  useUnmount(() => {
    if (!preselectedArmyId) dispatch(resetTheme())
  })

  const { data, isError, isLoading, isUninitialized } = useGetArmyQuery(
    preselectedArmyId ?? skipToken
  )

  useEffect(() => {
    if (data && !selectedArmy) {
      const { user: _user, ...army } = data
      console.log(army)
      form.setValue('playerOne.army', army)
    }
  }, [data, form, selectedArmy])

  if (isError) {
    return (
      <ScreenContainer
        className='bg-primary-950 p-4'
        space='md'
      >
        <Error />
      </ScreenContainer>
    )
  }

  if ((isUninitialized && preselectedArmyId) || isLoading) {
    return (
      <ScreenContainer
        className='bg-primary-950 p-4'
        space='md'
      >
        <Loading />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <VStack className='px-4'>
        <NavigationHeader
          variant='backButton'
          progress={{
            currentStep,
            steps: 5,
            text
          }}
          rightButton={rightButton}
        />
      </VStack>
      <ThemeProvider
        value={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'transparent'
          }
        }}
      >
        <FormProvider {...form}>
          <Stack
            initialRouteName='index'
            screenOptions={defaultScreenOptions}
          >
            <Stack.Screen name='index' />
            <Stack.Screen name='[id]' />
            <Stack.Screen name='leader-selection' />
            <Stack.Screen name='embarked-selection' />
            <Stack.Screen name='double-check' />
            <Stack.Screen
              name='camera'
              options={formSheetOptions}
            />
            <Stack.Screen
              name='qr-code'
              options={formSheetOptions}
            />
          </Stack>
          <NewGameBottomSheet />
        </FormProvider>
      </ThemeProvider>
    </ScreenContainer>
  )
}

export default NewGameLayout
