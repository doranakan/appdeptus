import { type NewArmy } from 'appdeptus/models'
import { Stack } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
const ArmyBuilderLayout = () => {
  const form = useForm<NewArmy>({})

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
