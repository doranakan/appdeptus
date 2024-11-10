import { NavigationHeader } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { router } from 'expo-router'
import { Check } from 'lucide-react-native'
import { memo, useCallback } from 'react'
import { type SubmitHandler, useFormContext } from 'react-hook-form'
import { useCreateArmyMutation, useUpdateArmyMutation } from '../../api'

const Header = () => {
  const { formState, handleSubmit, watch } = useFormContext<ArmyBuilder>()

  const id = watch('id')

  const name = watch('name')

  const warlord = watch('warlord')

  const [createArmy] = useCreateArmyMutation()

  const [updateArmy] = useUpdateArmyMutation()

  const newArmy = useCallback<SubmitHandler<ArmyBuilder>>(
    async (armyBuilder) => {
      const res = await createArmy(armyBuilder)
      if ('error' in res) {
        return
      }

      router.navigate('army-library')
    },
    [createArmy]
  )

  const editArmy = useCallback<SubmitHandler<ArmyBuilder>>(
    async (armyBuilder) => {
      const res = await updateArmy(armyBuilder)

      if ('error' in res) {
        return
      }

      router.navigate(`army/${id}`)
    },
    [id, updateArmy]
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
        icon: Check,
        loading: formState.isSubmitting,
        onPress: handleSubmit(id ? editArmy : newArmy),
        variant: 'callback'
      }}
    />
  )
}

export default memo(Header)
