import { type ArmyForm } from 'appdeptus/models'
import { Stack } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

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
      <Stack screenOptions={{ animation: 'fade' }}>
        <Stack.Screen
          name='codex-selection'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='unit-selection'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='tier-selection'
          options={{ headerBackTitle: 'Back', title: 'Customize units' }}
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