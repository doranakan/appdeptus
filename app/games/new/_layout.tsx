import { useUnmount } from 'ahooks'
import {
  type Button,
  NavigationHeader,
  resetTheme,
  ScreenContainer,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { useCreateGameMutation } from 'appdeptus/modules/games/api'
import {
  NewGameBottomSheet,
  newGameBottomSheetRef
} from 'appdeptus/modules/games/components'
import { useAppDispatch } from 'appdeptus/store'
import { Stack, useSegments } from 'expo-router'
import { ChevronRight, QrCode } from 'lucide-react-native'
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

  const { setValue, watch } = form
  const selectedArmy = watch('playerOne.army')

  const segments = useSegments()

  const routeName = segments[segments.length - 1]

  const [createGame, { isLoading }] = useCreateGameMutation()

  const currentStep = useMemo(() => {
    switch (routeName) {
      case 'army-selection':
        return !selectedArmy ? 1 : 2

      case 'leader-selection':
        return 3

      case 'embarked-selection':
        return 4

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

      default:
        return ''
    }
  }, [routeName, selectedArmy])

  const rightButton = useMemo<ComponentProps<typeof Button> | undefined>(() => {
    switch (routeName) {
      case 'army-selection':
        return {
          disabled: !selectedArmy || isLoading,
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
          icon: QrCode,
          loading: isLoading,
          onPress: async () => {
            const res = await createGame(selectedArmy)

            if ('error' in res) {
              return
            }

            setValue('id', res.data)

            newGameBottomSheetRef.current?.present()
          },
          variant: 'callback'
        }

      default:
        return undefined
    }
  }, [createGame, isLoading, routeName, selectedArmy, setValue])

  const dispatch = useAppDispatch()

  useUnmount(() => dispatch(resetTheme()))

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
            steps: 4,
            text
          }}
          rightButton={rightButton}
        />
      </VStack>
      <FormProvider {...form}>
        <Stack
          initialRouteName='army-selection'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='army-selection' />
          <Stack.Screen name='leader-selection' />
          <Stack.Screen name='embarked-selection' />
        </Stack>
        <NewGameBottomSheet />
      </FormProvider>
    </ScreenContainer>
  )
}

export default NewGameLayout
