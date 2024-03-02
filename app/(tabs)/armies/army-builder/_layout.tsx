import { type ArmyForm } from 'appdeptus/models'
import { Stack } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

const ArmiesLayout = () => {
  const methods = useForm<ArmyForm>()

  return (
    <FormProvider {...methods}>
      <Stack>
        <Stack.Screen
          name='codex-selection'
          options={{ headerBackTitle: 'Back', title: 'New army list' }}
        />
        <Stack.Screen
          name='unit-selection'
          options={{ headerBackTitle: 'Back', title: 'Select units' }}
        />
        <Stack.Screen
          name='tier-selection'
          options={{ headerBackTitle: 'Back', title: 'Customize choices' }}
        />
      </Stack>
    </FormProvider>
  )
}

export default ArmiesLayout
