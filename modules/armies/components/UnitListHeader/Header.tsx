import { Box, Text } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetCodexesQuery } from '../../api'

type UnitListHeaderProps = {
  codexId: string
  loading: boolean
  onSubmit: (args: {
    totalPoints: number
    codexId: string
    name: string
    units: Record<string, string[]>
  }) => Promise<void>
  submitTitle: string
}

const UnitListHeader = ({
  codexId,
  loading,
  onSubmit,
  submitTitle
}: UnitListHeaderProps) => {
  const { data: codexes } = useGetCodexesQuery()

  const { getValues } = useFormContext<ArmyForm>()

  const { totalPoints } = getValues()

  // const handleSubmit = useCallback(async () => {
  //   const name = codexes?.find((codex) => codex.id === codexId)?.name ?? ''

  //   const units: Record<string, string[]> = {}

  //   for (const { unit } of Object.values(choices)) {
  //     if (units[unit.id]) {
  //       units[unit.id]?.push(unit.tier.id)
  //     } else {
  //       units[unit.id] = [unit.tier.id]
  //     }
  //   }

  //   await onSubmit({ totalPoints, codexId, name, units })
  // }, [choices, codexId, codexes, onSubmit, totalPoints])

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
        loading={loading}
        // onPress={handleSubmit}
        text={submitTitle}
      />
    </Box>
  )
}

export default UnitListHeader
