import {
  AddIcon,
  Box,
  Button,
  ButtonGroup,
  ButtonIcon,
  EditIcon,
  Text
} from '@gluestack-ui/themed'
import { useBoolean } from 'ahooks'
import { Unit } from 'appdeptus/models'
import React, { useCallback } from 'react'
import UnitConfiguratorModal from '../UnitConfiguratorModal'

type UnitListItemProps = {
  onPressAdd: () => void
  onEditConfigs: (configs: Unit['tiers']) => void
  selectedConfig: Unit['tiers']
  unit: Unit
}

const UnitListItem = ({
  onPressAdd,
  onEditConfigs,
  selectedConfig,
  unit
}: UnitListItemProps) => {
  const count = selectedConfig.length

  let totalSelectedPoints = 0
  selectedConfig.forEach((tier) => (totalSelectedPoints += tier.points))

  const [configuratorVisible, { toggle: toggleConfigurator }] = useBoolean()

  const closeConfigurator = useCallback((configs: Unit['tiers']) => {
    toggleConfigurator()
    onEditConfigs(configs)
  }, [])

  return (
    <>
      <Box
        backgroundColor={count ? '$blue100' : '$white'}
        borderColor={count ? '$blue500' : '$white'}
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

        <ButtonGroup $disabled-bgColor='$blue300' flex={1}>
          <Button
            isDisabled={count >= unit.limit}
            onPress={onPressAdd}
            flex={1}
          >
            <ButtonIcon as={AddIcon} />
          </Button>
          <Button isDisabled={!count} onPress={toggleConfigurator} flex={1}>
            <ButtonIcon as={EditIcon} />
          </Button>
          <Box alignItems='center' flex={1} justifyContent='center'>
            <Text fontWeight={count ? '$black' : '$medium'}>
              {count > 0 ? totalSelectedPoints : unit.tiers[0].points}
            </Text>
          </Box>
        </ButtonGroup>
      </Box>
      <UnitConfiguratorModal
        onPressClose={closeConfigurator}
        configs={selectedConfig}
        unit={unit}
        visible={configuratorVisible}
      />
    </>
  )
}

export default UnitListItem
