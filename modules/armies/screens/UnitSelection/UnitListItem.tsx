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

  const { getValues, setValue } = useFormContext<ArmyForm>()

  const { append, fields } = useFieldArray<ArmyForm, 'choices', string>({
    name: 'choices',
    keyName: `${unit.id}-${unitIndex}`
  })

  const choices = useMemo(
    () => fields.filter(({ unit: unitId }) => unitId === unit.id),
    [fields, unit.id]
  )

  const count = choices.length

  const points = useMemo(() => {
    let points = 0
    for (const choice of choices) {
      const tier = unit.tiers.find((t) => t.id === choice.tier)
      if (tier) {
        points += tier.points
      }
    }
    return points || unit.tiers[0]?.points
  }, [choices, unit.tiers])

  return (
    <>
      <Box
        backgroundColor={count ? '$info100' : '$backgroundLight0'}
        borderColor={count ? '$info500' : '$backgroundLight0'}
        borderRadius='$md'
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
          $disabled-bgColor='$info300'
          flex={1}
        >
          <Button
            $active-bgColor='$info300'
            backgroundColor='$info500'
            flex={1}
            iconName='plus-square'
            isDisabled={count >= unit.limit}
            onPress={() => {
              append({
                options: [],
                tier: unit.tiers[0]?.id ?? '',
                unit: unit.id
              })
              const { totalPoints } = getValues()
              setValue(
                'totalPoints',
                totalPoints + (unit.tiers[0]?.points ?? 0)
              )
            }}
          />

          <Button
            $active-bgColor='$info300'
            backgroundColor='$info500'
            flex={1}
            iconName='edit'
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
