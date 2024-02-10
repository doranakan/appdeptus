import { Box, Text } from '@gluestack-ui/themed'
import { Button, Modal } from 'appdeptus/components'
import { CodexUnit } from 'appdeptus/models'
import { pullAt } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import TierSelector from '../TierSelector'

type UnitConfiguratorModalProps = {
  onPressClose: (configs: CodexUnit['tiers']) => void
  configs: CodexUnit['tiers']
  unit: CodexUnit
  visible: boolean
}

const UnitConfiguratorModal = ({
  onPressClose,
  configs,
  unit,
  visible
}: UnitConfiguratorModalProps) => {
  const [selectedConfigs, setSelectedConfigs] = useState(configs)

  const handleClose = useCallback(
    () => onPressClose(selectedConfigs),
    [selectedConfigs]
  )

  useEffect(() => {
    if (visible) {
      setSelectedConfigs([...configs])
    }
  }, [visible])

  const renderItem = useCallback<ListRenderItem<CodexUnit['tiers'][0]>>(
    ({ item: selectedConfig, index }) => (
      <Box
        backgroundColor='$backgroundLight0'
        borderRadius='$md'
        gap='$4'
        p='$4'
        shadowOpacity={0}
      >
        <Text>{unit.name}</Text>
        <Box
          flexDirection='row'
          gap='$2'
        >
          <Button
            $active-bgColor='$red600'
            backgroundColor='$red500'
            borderColor='$red600'
            borderWidth='$1'
            iconName='trash-alt'
            onPress={() => {
              pullAt(selectedConfigs, [index])

              setSelectedConfigs([...selectedConfigs])

              if (!selectedConfigs.length) {
                handleClose()
              }
            }}
          />
          <TierSelector
            selectedTierIndex={unit.tiers.findIndex(
              (tier) => tier.id === selectedConfig.id
            )}
            onTierSelected={(selectedTier) => {
              setSelectedConfigs(() => {
                selectedConfigs[index] = selectedTier
                return [...selectedConfigs]
              })
            }}
            tiers={unit.tiers}
          />
        </Box>
      </Box>
    ),
    [selectedConfigs.length]
  )

  if (!visible) {
    return undefined
  }

  return (
    <Modal
      onPressClose={handleClose}
      title='Edit units'
      visible={visible}
    >
      <Box
        p='$4'
        flex={1}
      >
        <FlatList
          data={selectedConfigs}
          ItemSeparatorComponent={() => <Box height='$4' />}
          keyExtractor={(id, index) => `${id}-${index}`}
          renderItem={renderItem}
        />
      </Box>
    </Modal>
  )
}

export default UnitConfiguratorModal
