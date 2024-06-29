import { Box, HStack, Heading, Text } from '@gluestack-ui/themed'
import { Button, Card } from 'appdeptus/components'
import { type ArmyForm, type CodexUnit } from 'appdeptus/models'
import { router } from 'expo-router'
import { Edit, Plus } from 'lucide-react-native'
import React from 'react'
import { useFieldArray } from 'react-hook-form'

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
    <Card
      gap='$4'
      opacity={count ? 1 : 0.7}
    >
      <HStack justifyContent='space-between'>
        <Text>
          <Heading>{unit.name}</Heading>
          {unit.caption && <Text fontSize='$sm'>{` ${unit.caption}`}</Text>}
        </Text>
        <Box
          alignItems='center'
          justifyContent='center'
        >
          <Text fontWeight={count ? '$bold' : '$normal'}>{points} points</Text>
        </Box>
      </HStack>

      <HStack
        flex={1}
        gap='$2'
      >
        <Button
          action='secondary'
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

        <Button
          action='negative'
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
      </HStack>
    </Card>
  )
}

export default React.memo(UnitListItem)
