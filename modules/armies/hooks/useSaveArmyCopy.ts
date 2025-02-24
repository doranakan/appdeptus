import { useToast } from 'appdeptus/components'
import { type Army, type Unit } from 'appdeptus/models'
import { useCallback } from 'react'
import { useCreateArmyMutation } from '../api'

const useSaveArmyCopy = (): [
  (army: Army) => Promise<void>,
  { isLoading: boolean }
] => {
  const [createArmy, { isLoading }] = useCreateArmyMutation()

  const { show } = useToast()

  const saveArmy = useCallback(
    async (army: Army) => {
      const {
        roster,
        isSecret: _isSecret,
        isValid: _isValid,
        ...restArmy
      } = army

      const units = roster.filter(
        (unit): unit is Unit => unit.type !== 'embarked' && unit.type !== 'team'
      )

      const res = await createArmy({ ...restArmy, units })

      if ('error' in res) {
        show({
          description: String(res.error),
          title: '⚠️ error'
        })
        return
      }

      show({
        description: 'army saved correctly',
        title: '✅ operation completed'
      })
    },
    [createArmy, show]
  )

  return [saveArmy, { isLoading }]
}

export default useSaveArmyCopy
