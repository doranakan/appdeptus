import { Box, Text } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type CodexUnit } from 'appdeptus/models'
import React, { useCallback, useMemo } from 'react'
import { useGetCodexesQuery } from '../../api'

type UnitListHeaderProps = {
  army: Record<CodexUnit['id'], CodexUnit['tiers']>
  codexId: string
  loading: boolean
  onSubmit: (args: {
    totalPoints: number
    codexId: string
    name: string
    units: Record<string, string[]>
  }) => void
  submitTitle: string
}

const UnitListHeader = ({
  army,
  codexId,
  loading,
  onSubmit,
  submitTitle
}: UnitListHeaderProps) => {
  const totalPoints = useMemo(() => {
    let total = 0
    Object.values(army)
      .flat()
      .forEach(({ points }) => (total += points))

    return total
  }, [army])

  const { data: codexes } = useGetCodexesQuery()

  const handleSubmit = useCallback(() => {
    const name = codexes?.find((codex) => codex.id === codexId)?.name ?? ''

    const units: Record<string, string[]> = {}

    for (const unit of Object.entries(army)) {
      const [unitId, tiers] = unit

      const tierIds = tiers.map(({ id }) => id)
      units[unitId] = tierIds
    }

    onSubmit({ totalPoints, codexId, name, units })
  }, [army, codexId, codexes, onSubmit, totalPoints])

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
        onPress={handleSubmit}
        text={submitTitle}
      />
    </Box>
  )
}

export default UnitListHeader
