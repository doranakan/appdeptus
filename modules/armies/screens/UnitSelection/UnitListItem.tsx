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
      caption={unit.caption}
      name={unit.name}
      opacity={count ? 1 : 0.8}
      points={count ? points : unit.tiers[0]?.points ?? 0}
      subtitle={`${count} / ${unit.limit}`}
    >
      <HStack
        flex={1}
        gap='$2'
      >
        <Button
          action={'secondary'}
          disabled={count >= unit.limit}
          flex={1}
          Icon={Plus}
          onPress={() => {
            append({
              options: [],
              tier: unit.tiers[0]?.id ?? '',
              unit: unit.id
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
