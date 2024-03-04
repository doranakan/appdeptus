import { HStack, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useBoolean } from 'ahooks'
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
      <Pressable
        backgroundColor='$backgroundLight0'
        borderRadius='$lg'
        onPress={toggle}
        p='$4'
      >
        <HStack justifyContent='space-between'>
          <VStack>
            <Text>
              <Text fontWeight='$black'>{unit.name}</Text>
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
