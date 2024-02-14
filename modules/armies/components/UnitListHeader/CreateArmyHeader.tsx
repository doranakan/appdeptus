import { useToast } from 'appdeptus/components'
import { type CodexUnit } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { useCreateArmyMutation } from '../../api'
import UnitListHeader from './Header'

type CreateArmyHeaderProps = {
  army: Record<CodexUnit['id'], CodexUnit['tiers']>
  codexId: string
}

const CreateArmyHeader = ({ army, codexId }: CreateArmyHeaderProps) => {
  const router = useRouter()

  const [createArmy, { isLoading }] = useCreateArmyMutation()

  const toast = useToast()

  const handleSubmit = useCallback(
    async (args: {
      totalPoints: number
      codexId: string
      name: string
      units: Record<string, string[]>
    }) => {
      const res = await createArmy(args)

      if ('error' in res) {
        toast({
          description: 'Astropathic communication interrupted',
          title: 'Heresy 😱'
        })

        return
      }

      toast({
        description: 'Army created succesfully',
        title: 'All set ✅'
      })

      router.navigate('armies')
    },
    [createArmy, router, toast]
  )

  return (
    <UnitListHeader
      army={army}
      codexId={codexId}
      loading={isLoading}
      onSubmit={handleSubmit}
      submitTitle='Create army'
    />
  )
}

export default CreateArmyHeader
