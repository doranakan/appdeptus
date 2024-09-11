import { HStack } from 'appdeptus/components/ui/hstack'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type ArmyUnit } from 'appdeptus/models'
import pluralize from 'pluralize'
import { memo } from 'react'

type ItemProps = {
  unit: ArmyUnit
}

const Item = ({ unit }: ItemProps): JSX.Element => (
  <VStack className='bg-backgroundLight-100 rounded-2xl justify-between p-2'>
    <HStack className='items-center justify-between'>
      <VStack>
        <Text bold>{unit.name}</Text>
      </VStack>
      <Text className='font-bold'>
        {unit.tier.points} <Text>points</Text>
      </Text>
    </HStack>
    <Text
      size='xs'
      className='font-bold'
    >
      {`${unit.tier.models} ${pluralize('model', unit.tier.models)}`}
    </Text>
  </VStack>
)

export default memo(Item)
