import { useUnmount } from 'ahooks'
import { resetTheme, selectThemeName } from 'appdeptus/components'
import { type NewArmy } from 'appdeptus/models'
import { Stack } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const ArmyBuilderLayout = () => {
  const form = useForm<NewArmy>({
    defaultValues: {
      codex: undefined,
      composition: undefined,
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
        <Stack.Screen name='composition-selection' />
      </Stack>
    </FormProvider>
  )
}

export default ArmyBuilderLayout
