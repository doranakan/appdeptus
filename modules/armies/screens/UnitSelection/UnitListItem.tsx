import { HStack } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
import { type ArmyForm, type CodexUnit } from 'appdeptus/models'
import { router } from 'expo-router'
import { Edit, Plus } from 'lucide-react-native'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { UnitCard } from '../../components'

type UnitListItemProps = {
  count: number
  points: number
  unit: CodexUnit
  unitIndex: number

  codexId?: string
}

const UnitListItem = ({
  count,
  points,
  unit,
  unitIndex,
  codexId
}: UnitListItemProps) => {
  const { append } = useFieldArray<ArmyForm, 'units', string>({
    name: 'units',
    keyName: `${unit.id}-${unitIndex}`
  })

  return (
    <UnitCard
      bg={count ? '$secondary100' : '$secondary50'}
      name={unit.name}
      opacity={count ? 1 : 0.8}
      points={count ? points : unit.tiers[0]?.points ?? 0}
      subtitle={`Selected: ${count}`}
    >
      <HStack
        flex={1}
        gap='$2'
      >
        <Button
          action={'secondary'}
          flex={1}
          Icon={Plus}
          onPress={() => {
            append({
              tier: unit.tiers[0]?.id ?? '',
              unit: unit.id,
              upgrades: [] // TODO: handle unit upgrades
            })
          }}
          text='Add'
        />

        {count ? (
          <Button
            action='negative'
            bg={count ? '$secondary300' : '$secondary200'}
            disabled={!count}
            flex={1}
            Icon={Edit}
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
        ) : undefined}
      </HStack>
    </UnitCard>
  )
}
export default React.memo(UnitListItem)
