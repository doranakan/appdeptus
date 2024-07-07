import { type ArmyForm } from 'appdeptus/models'
import { Stack } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { Platform } from 'react-native'

const ArmiesLayout = () => {
  const form = useForm<ArmyForm>({
    defaultValues: {
      codexId: '',
      name: '',
      totalPoints: 0,
      units: []
    }
  })

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='unit-selection' />
        <Stack.Screen
          name='tier-selection'
          options={{
            animation:
              Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
            presentation: Platform.OS === 'ios' ? 'modal' : undefined,
            fullScreenGestureEnabled: true
          }}
        />
        <Stack.Screen
          name='option-selection'
          options={{ headerBackTitle: 'Back', title: 'Customize wargear' }}
        />
      </Stack>
    </FormProvider>
  )
}

export default ArmiesLayout
