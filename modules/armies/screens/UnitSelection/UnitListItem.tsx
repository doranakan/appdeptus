import { HStack, Pressable } from '@gluestack-ui/themed'
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
      name={unit.name}
      points={count ? points : unit.tiers[0]?.points ?? 0}
      subtitle={`Selected: ${count}`}
    >
      <HStack
        flex={1}
        gap='$2'
      >
        <Pressable
          flex={1}
          onPress={() => {
            append({
              tier: unit.tiers[0]?.id ?? '',
              unit: unit.id,
              upgrades: [] // TODO: handle unit upgrades
            })
          }}
        >
          <Button
            Icon={Plus}
            text='Add'
          />
        </Pressable>

        {count ? (
          <Pressable
            disabled={!count}
            flex={1}
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
          >
            <Button
              Icon={Edit}
              text='Edit'
            />
          </Pressable>
        ) : undefined}
      </HStack>
    </UnitCard>
  )
}
export default React.memo(UnitListItem)
