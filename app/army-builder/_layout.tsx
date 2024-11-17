import { useUnmount } from 'ahooks'
import { resetTheme, selectThemeName } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const ArmyBuilderLayout = () => {
  const { id } = useGlobalSearchParams()

  const form = useForm<ArmyBuilder>({
    defaultValues: {
      codex: undefined,
      detachment: undefined,
      name: '',
      points: 0,
      units: [],
      warlord: undefined
    }
  })

  const themeName = useSelector(selectThemeName)

  const dispatch = useAppDispatch()

  useUnmount(() => {
    if (themeName !== 'default' && !id) {
      dispatch(resetTheme())
    }
  })

  return (
    <FormProvider {...form}>
      <Stack
        initialRouteName='index'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='detachment-selection' />
        <Stack.Screen name='[id]' />
        <Stack.Screen name='enhancement-selection' />
        <Stack.Screen name='leader-selection' />
        <Stack.Screen name='unit-selection' />
        <Stack.Screen name='warlord-selection' />
      </Stack>
    </FormProvider>
  )
}

export default ArmyBuilderLayout
