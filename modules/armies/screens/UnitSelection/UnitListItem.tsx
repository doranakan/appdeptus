import { Box, ButtonGroup, Text } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type ArmyForm, type CodexUnit } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

type UnitListItemProps = {
  codexId?: string
  unit: CodexUnit
  unitIndex: number
}

const UnitListItem = ({ codexId, unit, unitIndex }: UnitListItemProps) => {
  const router = useRouter()

  const { append } = useFieldArray<ArmyForm, 'units', string>({
    name: 'units',
    keyName: `${unit.id}-${unitIndex}`
  })

  const { watch } = useFormContext<ArmyForm>()
  const allunits = watch('units')

  const units = useMemo(
    () => allunits.filter(({ unit: unitId }) => unitId === unit.id),
    [allunits, unit.id]
  )

  const count = units.length

  const points = useMemo(() => {
    let points = 0
    for (const choice of units) {
      const tier = unit.tiers.find((t) => t.id === choice.tier)
      if (tier) {
        points += tier.points
      }
    }
    return points || unit.tiers[0]?.points
  }, [units, unit.tiers])

  return (
    <>
      <Box
        backgroundColor={count ? '$primary100' : '$backgroundLight0'}
        borderColor={count ? '$primary500' : '$backgroundLight0'}
        borderWidth='$1'
        gap='$4'
        p='$4'
        shadowOpacity={0}
      >
        <Text>
          <Text fontWeight='$black'>{unit.name}</Text>
          {unit.caption && <Text fontSize='$sm'>{` ${unit.caption}`}</Text>}
        </Text>

        <ButtonGroup
          $disabled-bgColor='$primary300'
          flex={1}
        >
          <Button
            $active-bgColor='$primary300'
            backgroundColor='$primary500'
            flex={1}
            iconName='plus-square'
            isDisabled={count >= unit.limit}
            onPress={() => {
              append({
                options: [],
                tier: unit.tiers[0]?.id ?? '',
                unit: unit.id
              })
            }}
            text='Add'
          />

          <Button
            $active-bgColor='$primary300'
            backgroundColor='$primary500'
            flex={1}
            isDisabled={!count}
            onPress={() => {
              router.push({
                params: {
                  codexId,
                  unitIndex: String(unitIndex),
                  unitId: unit.id
                },
                pathname: './tier-selection'
              })
            }}
            text='Edit'
          />
          <Box
            alignItems='center'
            flex={1}
            justifyContent='center'
          >
            <Text fontWeight={count ? '$black' : '$medium'}>{points}</Text>
          </Box>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default UnitListItem
