import { HStack, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useBoolean } from 'ahooks'
import { type ArmyUnit } from 'appdeptus/models'
import React from 'react'
import ArmyItemModal from '../ArmyItemModal'

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
        <HStack>
          <VStack flex={1}>
            <Text>
              <Text fontWeight='$black'>{unit.name}</Text>
            </Text>
            {unit.caption && <Text fontSize='$sm'>{unit.caption}</Text>}
          </VStack>
          <Text fontWeight='bold'>
            {unit.tier.points} <Text>points</Text>
          </Text>
        </HStack>
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
