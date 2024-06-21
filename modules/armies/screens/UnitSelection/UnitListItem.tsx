import { Box, ButtonGroup } from '@gluestack-ui/themed'
import { Button, Card } from 'appdeptus/components'
import { Heading, Text } from 'appdeptus/designSystem'
import { type ArmyForm, type CodexUnit } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import { Edit, Plus } from 'lucide-react-native'
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
    <Card
      backgroundColor={count ? '$secondary200' : '$secondary100'}
      borderColor={count ? '$secondary300' : '$secondary200'}
      borderWidth='$1'
      gap='$4'
      shadowOpacity={0}
    >
      <Text>
        <Heading>{unit.name}</Heading>
        {unit.caption && <Text fontSize='$sm'>{` ${unit.caption}`}</Text>}
      </Text>

      <ButtonGroup flex={1}>
        <Button
          $active-bgColor='$secondary500'
          $disabled-bgColor='$secondary500'
          backgroundColor='$secondary500'
          flex={1}
          Icon={Plus}
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
          $active-bgColor='$secondary300'
          $disabled-bgColor='$secondary500'
          backgroundColor='$secondary300'
          flex={1}
          Icon={Edit}
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
    </Card>
  )
}

export default UnitListItem
