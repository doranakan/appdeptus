import { Box, ButtonGroup, Text } from '@gluestack-ui/themed'
import { useBoolean } from 'ahooks'
import { Button } from 'appdeptus/components'
import { type CodexUnit } from 'appdeptus/models'
import React, { useCallback } from 'react'
import UnitConfiguratorModal from '../UnitConfiguratorModal'

type UnitListItemProps = {
  onPressAdd: () => void
  onEditConfigs: (configs: CodexUnit['tiers']) => void
  selectedTiers: CodexUnit['tiers']
  unit: CodexUnit
}

const UnitListItem = ({
  onPressAdd,
  onEditConfigs,
  selectedTiers,
  unit
}: UnitListItemProps) => {
  const count = selectedTiers.length

  let totalSelectedPoints = 0
  selectedTiers.forEach((tier) => (totalSelectedPoints += tier.points))

  const [configuratorVisible, { toggle: toggleConfigurator }] = useBoolean()

  const closeConfigurator = useCallback(
    (tiers: CodexUnit['tiers']) => {
      toggleConfigurator()
      onEditConfigs(tiers)
    },
    [onEditConfigs, toggleConfigurator]
  )

  return (
    <>
      <Box
        backgroundColor={count ? '$info100' : '$backgroundLight0'}
        borderColor={count ? '$info500' : '$backgroundLight0'}
        borderRadius='$md'
        borderWidth='$1'
        gap='$4'
        p='$4'
        shadowOpacity={0}
      >
        <Text>
          <Text fontWeight='$black'>{unit.name}</Text>
          {unit.caption && <Text fontSize='$sm'>{` ${unit.caption}`}</Text>}
        </Text>

        <ButtonGroup
          $disabled-bgColor='$info300'
          flex={1}
        >
          <Button
            $active-bgColor='$info300'
            backgroundColor='$info500'
            flex={1}
            iconName='plus-square'
            isDisabled={count >= unit.limit}
            onPress={onPressAdd}
          />
          <Button
            $active-bgColor='$info300'
            backgroundColor='$info500'
            flex={1}
            iconName='edit'
            isDisabled={!count}
            onPress={toggleConfigurator}
          />
          <Box
            alignItems='center'
            flex={1}
            justifyContent='center'
          >
            <Text fontWeight={count ? '$black' : '$medium'}>
              {count > 0 ? totalSelectedPoints : unit.tiers[0].points}
            </Text>
          </Box>
        </ButtonGroup>
      </Box>
      <UnitConfiguratorModal
        onPressClose={closeConfigurator}
        selectedTiers={selectedTiers}
        unit={unit}
        visible={configuratorVisible}
      />
    </>
  )
}

export default UnitListItem
