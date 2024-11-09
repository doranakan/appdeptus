import { NavigationHeader } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { router } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import { memo, useCallback } from 'react'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import { useCreateArmyMutation } from '../../api'

const Header = () => {
  const { formState, handleSubmit, watch } = useFormContext<ArmyBuilder>()

  const name = watch('name')

  const warlord = watch('warlord')

  const [createArmy] = useCreateArmyMutation()

  const onSubmit = useCallback<SubmitHandler<ArmyBuilder>>(
    async (armyBuilder) => {
      const res = await createArmy(armyBuilder)

      if ('error' in res) {
        return
      }

      router.navigate('army-library')
    },
    [createArmy]
  )

  return (
    <NavigationHeader
      variant='backButton'
      progress={{
        currentStep: 8 + (name ? 1 : 0) + (warlord ? 1 : 0),
        steps: 10,
        text: 'select name & warlord'
      }}
      rightButton={{
        disabled: formState.isSubmitting || !name || !warlord,
        icon: ChevronRight,
        loading: formState.isSubmitting,
        onPress: handleSubmit(onSubmit),
        variant: 'callback'
      }}
    />
  )
}

export default memo(Header)
