import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { Card } from 'appdeptus/components'
import { type ArmyUnit } from 'appdeptus/models'
import pluralize from 'pluralize'
import { memo } from 'react'

type ItemProps = {
  unit: ArmyUnit
}

const Item = ({ unit }: ItemProps): JSX.Element => (
  <Card
    animated
    justifyContent='space-between'
  >
    <HStack
      alignItems='center'
      justifyContent='space-between'
    >
      <VStack>
        <Text bold>{unit.name}</Text>
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
)

export default memo(Item)
