import { useToast } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useCreateArmyMutation } from '../../api'
import UnitListHeader from './Header'

type CreateArmyHeaderProps = {
  codexId: string
}

const CreateArmyHeader = ({ codexId }: CreateArmyHeaderProps) => {
  const router = useRouter()

  const [createArmy, { isLoading }] = useCreateArmyMutation()

  const toast = useToast()

  const { getValues } = useFormContext<ArmyForm>()

  const handleSubmit = useCallback(async () => {
    const res = await createArmy(getValues())

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
  }, [createArmy, getValues, router, toast])

  return (
    <UnitListHeader
      codexId={codexId}
      loading={isLoading}
      onSubmit={handleSubmit}
      submitTitle='Create army'
    />
  )
}

export default CreateArmyHeader
