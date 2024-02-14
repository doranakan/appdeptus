import { useToast } from 'appdeptus/components'
import { type CodexUnit } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { useUpdateArmyMutation } from '../../api'
import UnitListHeader from './Header'

type UpdateArmyHeaderProps = {
  army: Record<CodexUnit['id'], CodexUnit['tiers']>
  armyId: string
  codexId: string
}

const UpdateArmyHeader = ({ army, armyId, codexId }: UpdateArmyHeaderProps) => {
  const router = useRouter()

  const [updateArmy, { isLoading }] = useUpdateArmyMutation()

  const toast = useToast()

  const handleSubmit = useCallback(
    async ({
      codexId: _,
      ...args
    }: {
      totalPoints: number
      codexId: string
      name: string
      units: Record<string, string[]>
    }) => {
      const res = await updateArmy({ ...args, armyId })

      if ('error' in res) {
        toast({
          description: 'Astropathic communication interrupted',
          title: 'Heresy 😱'
        })

        return
      }

      toast({
        description: 'Army updated succesfully',
        title: 'All good ✅'
      })

      router.back()
    },
    [armyId, router, toast, updateArmy]
  )

  return (
    <UnitListHeader
      army={army}
      codexId={codexId}
      loading={isLoading}
      onSubmit={handleSubmit}
      submitTitle='Save changes'
    />
  )
}

export default UpdateArmyHeader
