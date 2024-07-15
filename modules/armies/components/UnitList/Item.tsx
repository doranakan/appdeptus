import { HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Card } from 'appdeptus/components'
import { type ArmyUnit } from 'appdeptus/models'
import { Link } from 'expo-router'
import pluralize from 'pluralize'
import { memo } from 'react'

type ItemProps = {
  armyId: string
  unit: ArmyUnit
}

const Item = ({ armyId, unit }: ItemProps): JSX.Element => (
  <Link
    href={`./army/${armyId}?unitId=${unit.id}&tierId=${unit.tier.id}`}
    asChild
  >
    <Pressable opacity={0.9}>
      <Card
        animated
        justifyContent='space-between'
      >
        <HStack
          alignItems='center'
          justifyContent='space-between'
        >
          <VStack>
            <Text>
              <Heading>{unit.name}</Heading>
            </Text>
            {unit.caption && <Text size='xs'>{unit.caption}</Text>}
          </VStack>
          <Text fontWeight='bold'>
            {unit.tier.points} <Text>points</Text>
          </Text>
        </HStack>
        <Text
          size='xs'
          fontWeight='bold'
        >
          {`${unit.tier.models} ${pluralize('model', unit.tier.models)}`}
        </Text>
      </Card>
    </Pressable>
  </Link>
)

export default memo(Item)
