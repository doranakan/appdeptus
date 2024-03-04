import { Box, Text } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetCodexUnitsQuery } from '../../api'

type UnitListHeaderProps = {
  codexId: string
  loading: boolean
  onSubmit: () => void
  submitTitle: string
}

const UnitListHeader = ({
  codexId,
  loading,
  onSubmit,
  submitTitle
}: UnitListHeaderProps) => {
  const { data } = useGetCodexUnitsQuery(codexId)

  const { setValue, watch } = useFormContext<ArmyForm>()

  const units = watch('units')

  const totalPoints = useMemo(() => {
    let points = 0
    for (const { unit, tier } of units) {
      points +=
        data?.find(({ id }) => id === unit)?.tiers.find(({ id }) => id === tier)
          ?.points ?? 0
    }

    return points
  }, [data, units])

  useEffect(() => {
    setValue('totalPoints', totalPoints)
  }, [setValue, totalPoints])

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
        onPress={onSubmit}
        text={submitTitle}
      />
    </Box>
  )
}

export default UnitListHeader
