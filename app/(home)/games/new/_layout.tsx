import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useUnmount } from 'ahooks'
import {
  type Button,
  NavigationHeader,
  resetTheme,
  ScreenContainer,
  VStack
} from 'appdeptus/components'
import { defaultScreenOptions, formSheetOptions } from 'appdeptus/constants'
import { type NewGame } from 'appdeptus/models/game'
import {
  NewGameBottomSheet,
  newGameBottomSheetRef
} from 'appdeptus/modules/games/components'
import { useAppDispatch } from 'appdeptus/store'
import { Stack, useSegments } from 'expo-router'
import { ChevronRight, Dices } from 'lucide-react-native'
import { type ComponentProps, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const NewGameLayout = () => {
  const form = useForm<NewGame>({
    defaultValues: {
      status: 'new',
      playerOne: {
        army: undefined
      }
    }
  })

  const { watch } = form
  const selectedArmy = watch('playerOne.army')

  const segments = useSegments()

  const routeName = segments[segments.length - 1]

  const currentStep = useMemo(() => {
    switch (routeName) {
      case 'army-selection':
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
  }, [routeName, selectedArmy])

  const text = useMemo(() => {
    switch (routeName) {
      case 'army-selection':
        return !selectedArmy ? 'select army' : selectedArmy.name

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
      case 'army-selection':
        return {
          disabled: !selectedArmy,
          icon: ChevronRight,
          href: 'games/new/leader-selection',
          variant: 'link'
        }

      case 'leader-selection':
        return {
          icon: ChevronRight,
          href: 'games/new/embarked-selection',
          variant: 'link'
        }

      case 'embarked-selection':
        return {
          icon: ChevronRight,
          href: 'games/new/double-check',
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
  }, [routeName, selectedArmy])

  const dispatch = useAppDispatch()

  useUnmount(() => dispatch(resetTheme()))

  return (
    <ScreenContainer
      className='bg-primary-950'
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
            initialRouteName='army-selection'
            screenOptions={defaultScreenOptions}
          >
            <Stack.Screen name='army-selection' />
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
