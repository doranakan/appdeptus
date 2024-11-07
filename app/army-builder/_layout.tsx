import { useUnmount } from 'ahooks'
import { resetTheme, selectThemeName } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { Stack } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const ArmyBuilderLayout = () => {
  const form = useForm<ArmyBuilder>({
    defaultValues: {
      codex: undefined,
      units: [],
      detachment: undefined,
      name: '',
      points: 0
    }
  })

  const themeName = useSelector(selectThemeName)

  const dispatch = useDispatch()

  useUnmount(() => {
    if (themeName !== 'default') {
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
        <Stack.Screen name='enhancement-selection' />
        <Stack.Screen name='leader-selection' />
        <Stack.Screen name='unit-selection' />
        <Stack.Screen name='warlord-selection' />
      </Stack>
    </FormProvider>
  )
}

export default ArmyBuilderLayout
