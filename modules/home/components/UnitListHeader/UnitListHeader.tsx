import { Box, Text } from '@gluestack-ui/themed'
import { Button, useToast } from 'appdeptus/components'
import { Unit } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { useCreateArmyMutation, useGetCodexesQuery } from '../../api'

type UnitListHeaderProps = {
  army: Record<Unit['id'], Unit['tiers']>
  codexId: string
}

const UnitListHeader = ({ army, codexId }: UnitListHeaderProps) => {
  const totalPoints = useMemo(() => {
    let total = 0
    Object.values(army)
      .flat()
      .forEach(({ points }) => (total += points))

    return total
  }, [army])

  const router = useRouter()

  const { data: codexes } = useGetCodexesQuery()

  const [createArmy, { isLoading }] = useCreateArmyMutation()

  const toast = useToast()

  const handleSubmit = useCallback(async () => {
    const codexName = codexes?.find((codex) => codex.id === codexId)?.name

    let units: Record<string, string[]> = {}

    for (const unit of Object.entries(army)) {
      const [unitId, tiers] = unit

      const tierIds = tiers.map(({ id }) => id)
      units[unitId] = tierIds
    }

    const res = await createArmy({
      codex: codexId,
      name: codexName ?? '',
      totalPoints,
      units
    })

    if ('error' in res) {
      toast({
        description: 'Astropathic communication interrupted',
        title: 'Heresy 😱'
      })

      return
    }

    toast({
      description: 'Your army has been created succesfully',
      title: 'All set ✅'
    })

    router.navigate('home')
  }, [army])

  return (
    <Box
      backgroundColor='$backgroundLight0'
      borderBottomColor='$light200'
      borderBottomWidth='$1'
      flexDirection='row'
      p='$4'
    >
      <Box
        justifyContent='center'
        flex={2}
      >
        <Text fontSize='$3xl'>
          <Text fontWeight='$black'>{totalPoints}</Text>
          <Text> total points</Text>
        </Text>
      </Box>
      <Button
        flex={1}
        iconName='clipboard-list'
        isDisabled={!totalPoints}
        loading={isLoading}
        onPress={handleSubmit}
        text='Create army'
      />
    </Box>
  )
}

export default UnitListHeader
