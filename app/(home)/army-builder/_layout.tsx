import { useUnmount } from 'ahooks'
import {
  type Button,
  NavigationHeader,
  resetTheme,
  ScreenContainer,
  selectThemeName,
  useToast,
  VStack
} from 'appdeptus/components'
import { defaultScreenOptions } from 'appdeptus/constants'
import { useWarlord } from 'appdeptus/hooks'
import { type ArmyBuilder } from 'appdeptus/models'
import {
  useCreateArmyMutation,
  useUpdateArmyMutation
} from 'appdeptus/modules/armies/api'
import { useAppDispatch } from 'appdeptus/store'
import { router, Stack, useGlobalSearchParams, useSegments } from 'expo-router'
import { Check, ChevronRight } from 'lucide-react-native'
import { type ComponentProps, useCallback, useMemo } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const ArmyBuilderLayout = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const form = useForm<ArmyBuilder>({
    defaultValues: {
      codex: undefined,
      detachment: undefined,
      name: '',
      points: 0,
      units: []
    }
  })

  const themeName = useSelector(selectThemeName)

  const dispatch = useAppDispatch()

  const { formState, handleSubmit, watch } = form

  const [createArmy] = useCreateArmyMutation()

  const [updateArmy] = useUpdateArmyMutation()

  const { show } = useToast()

  const newArmy = useCallback<SubmitHandler<ArmyBuilder>>(
    async (armyBuilder) => {
      const res = await createArmy(armyBuilder)
      if ('error' in res) {
        show({ title: '⚠️ error', description: String(res.error) })
        return
      }

      if (router.canDismiss()) {
        router.dismissAll()
      }

      router.replace('/')
    },
    [createArmy, show]
  )

  const editArmy = useCallback<SubmitHandler<ArmyBuilder>>(
    async (armyBuilder) => {
      const res = await updateArmy(armyBuilder)

      if ('error' in res) {
        show({ title: '⚠️ error', description: String(res.error) })
        return
      }

      if (router.canDismiss()) {
        router.dismissAll()
      }
      router.navigate(`army/${id}`)
    },
    [id, show, updateArmy]
  )

  const codex = watch('codex')
  const detachment = watch('detachment')
  const units = watch('units')
  const name = watch('name')
  const warlord = useWarlord(units ?? [])

  const unitSelectionButtonDisabled = useMemo(
    () =>
      !units?.filter(({ type }) => type === 'leader').length &&
      !units?.filter(({ type }) => type === 'character').length,
    [units]
  )

  const segments = useSegments()

  const routeName = segments[segments.length - 1]

  const currentStep = useMemo(() => {
    switch (routeName) {
      case 'army-builder': {
        return !codex ? 1 : 2
      }
      case '[id]':
      case 'unit-selection': {
        return unitSelectionButtonDisabled ? 3 : 4
      }
      case 'detachment-selection': {
        return !detachment ? 5 : 6
      }
      case 'enhancement-selection': {
        return 7
      }
      case 'warlord-selection': {
        return 8 + (name ? 1 : 0) + (warlord ? 1 : 0)
      }
      default:
        return 0
    }
  }, [codex, detachment, name, routeName, unitSelectionButtonDisabled, warlord])

  const text = useMemo(() => {
    switch (routeName) {
      case 'army-builder': {
        return codex ? `selected: ${codex.name}` : 'select codex'
      }
      case '[id]':
      case 'unit-selection': {
        return 'select units'
      }
      case 'detachment-selection': {
        return detachment ? `selected: ${detachment.name}` : 'select detachment'
      }
      case 'enhancement-selection': {
        return 'select enhancements'
      }
      case 'warlord-selection': {
        return 'select name & warlord'
      }
      default:
        return ''
    }
  }, [codex, detachment, routeName])

  const rightButton = useMemo<ComponentProps<typeof Button> | undefined>(() => {
    switch (routeName) {
      case 'army-builder': {
        return {
          disabled: !codex,
          icon: ChevronRight,
          href: 'army-builder/unit-selection',
          variant: 'link'
        }
      }
      case '[id]':
      case 'unit-selection': {
        return {
          disabled: unitSelectionButtonDisabled,
          icon: ChevronRight,
          href: 'army-builder/detachment-selection',
          variant: 'link'
        }
      }
      case 'detachment-selection': {
        return {
          disabled: !detachment,
          icon: ChevronRight,
          href: 'army-builder/enhancement-selection',
          variant: 'link'
        }
      }
      case 'enhancement-selection': {
        return {
          icon: ChevronRight,
          href: 'army-builder/warlord-selection',
          variant: 'link'
        }
      }
      case 'warlord-selection': {
        return {
          disabled: formState.isSubmitting || !name || !warlord,
          icon: Check,
          loading: formState.isSubmitting,
          onPress: handleSubmit(id ? editArmy : newArmy),
          variant: 'callback'
        }
      }
      default:
        return undefined
    }
  }, [
    codex,
    detachment,
    editArmy,
    formState.isSubmitting,
    handleSubmit,
    id,
    name,
    newArmy,
    routeName,
    unitSelectionButtonDisabled,
    warlord
  ])

  useUnmount(() => {
    if (themeName !== 'default' && !id) {
      dispatch(resetTheme())
    }
  })

  return (
    <ScreenContainer
      safeAreaInsets={['top']}
      space='md'
    >
      <VStack className='px-4'>
        <NavigationHeader
          variant='backButton'
          progress={{
            currentStep,
            steps: 10,
            text
          }}
          rightButton={rightButton}
        />
      </VStack>
      <FormProvider {...form}>
        <Stack
          initialRouteName='index'
          screenOptions={defaultScreenOptions}
        >
          <Stack.Screen name='index' />
          <Stack.Screen name='detachment-selection' />
          <Stack.Screen name='[id]' />
          <Stack.Screen name='enhancement-selection' />
          <Stack.Screen name='unit-selection' />
          <Stack.Screen name='warlord-selection' />
        </Stack>
      </FormProvider>
    </ScreenContainer>
  )
}

export default ArmyBuilderLayout
