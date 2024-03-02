import { useToast } from 'appdeptus/components'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { useUpdateArmyMutation } from '../../api'
import UnitListHeader from './Header'

type UpdateArmyHeaderProps = {
  armyId: string
  codexId: string
}

const UpdateArmyHeader = ({ armyId, codexId }: UpdateArmyHeaderProps) => {
  const router = useRouter()

  const [updateArmy, { isLoading }] = useUpdateArmyMutation()

  const toast = useToast()

  const handleSubmit = useCallback(
    async (args: {
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
      codexId={codexId}
      loading={isLoading}
      onSubmit={handleSubmit}
      submitTitle='Save changes'
    />
  )
}

export default UpdateArmyHeader
