import { HStack, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useBoolean } from 'ahooks'
import { Card } from 'appdeptus/components'
import { type ArmyUnit } from 'appdeptus/models'
import pluralize from 'pluralize'
import ArmyItemModal from './ArmyItemModal'

type ArmyItemProps = {
  unit: ArmyUnit
}

const ArmyItem = ({ unit }: ArmyItemProps): JSX.Element => {
  const [visible, { toggle }] = useBoolean()

  return (
    <>
      <Pressable onPress={toggle}>
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
      <ArmyItemModal
        onPressClose={toggle}
        visible={visible}
        unit={unit}
      />
    </>
  )
}

export default ArmyItem
