import { Box, Text, VStack } from '@gluestack-ui/themed'
import { Button, Loading, Modal } from 'appdeptus/components'
import { type CodexUnit, type UnitTier } from 'appdeptus/models'
import { pullAt } from 'lodash'
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, type ListRenderItem } from 'react-native'
import { useGetUnitCompositionsQuery } from '../../api'
import TierSelector from './TierSelector'

type UnitConfiguratorModalProps = {
  onPressClose: (selectedTiers: CodexUnit['tiers']) => void
  selectedTiers: CodexUnit['tiers']
  unit: CodexUnit
  visible: boolean
}

const UnitConfiguratorModal = ({
  onPressClose,
  selectedTiers,
  unit,
  visible
}: UnitConfiguratorModalProps) => {
  const { data: unitCompositions } = useGetUnitCompositionsQuery(
    unit.tiers.map(({ id }) => id)
  )

  const [newTiers, setNewTiers] = useState(selectedTiers)

  const handleClose = useCallback(() => {
    onPressClose(newTiers)
  }, [onPressClose, newTiers])

  const renderItem = useCallback<ListRenderItem<UnitTier>>(
    ({ item: tier, index }) => {
      if (!unitCompositions) {
        return <Loading />
      }

      return (
        <VStack
          backgroundColor='$backgroundLight0'
          borderRadius='$md'
          gap='$2'
          p='$4'
          shadowOpacity={0}
        >
          <Text fontWeight='$black'>{unit.name}</Text>
          <TierSelector
            onTierSelected={(selectedTier) => {
              setNewTiers(() => {
                newTiers[index] = selectedTier

                return [...newTiers]
              })
            }}
            selectedTierIndex={unit.tiers.findIndex(
              (unitTier) => unitTier.id === tier.id
            )}
            unitCompositions={unitCompositions}
            unitTiers={unit.tiers}
          />
          <Button
            $active-bgColor='$red600'
            backgroundColor='$red500'
            borderColor='$red600'
            borderWidth='$1'
            flex={1}
            iconColor='red'
            iconName='trash-alt'
            onPress={() => {
              pullAt(newTiers, [index])

              setNewTiers([...newTiers])

              if (newTiers.length === 0) {
                handleClose()
              }
            }}
            variant='outline'
          />
        </VStack>
      )
    },
    [handleClose, newTiers, unit.name, unit.tiers, unitCompositions]
  )

  return (
    <Modal
      onPressClose={handleClose}
      title='Edit units'
      visible={visible}
    >
      <FlatList
        data={newTiers}
        ItemSeparatorComponent={() => <Box height='$4' />}
        ListFooterComponent={() => <Box height='$8' />}
        keyExtractor={({ id }, index) => `${id}-${index}`}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    padding: 16
  }
})

export default UnitConfiguratorModal
