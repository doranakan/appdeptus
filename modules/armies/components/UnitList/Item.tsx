import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { type ArmyUnit } from 'appdeptus/models'
import pluralize from 'pluralize'
import { memo } from 'react'

type ItemProps = {
  unit: ArmyUnit
}

const Item = ({ unit }: ItemProps): JSX.Element => (
  <VStack
    bg='$backgroundLight100'
    borderRadius='$2xl'
    justifyContent='space-between'
    p='$2'
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
  </VStack>
)

export default memo(Item)
