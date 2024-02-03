import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Text
} from '@gluestack-ui/themed'
import { Unit } from 'appdeptus/models'
import React from 'react'

interface UnitListItemProps {
  count: number
  onPressDec: () => void
  onPressInc: () => void
  unit: Unit
}

const UnitListItem = ({
  count,
  onPressDec,
  onPressInc,
  unit
}: UnitListItemProps): JSX.Element => (
  <Box backgroundColor='$white' borderRadius='$md' gap='$4' p='$4'>
    <Text>
      <Text fontWeight='$black'>{unit.name}</Text>
      {unit.caption && <Text fontSize='$sm'>{` ${unit.caption}`}</Text>}
    </Text>

    <ButtonGroup $disabled-bgColor='$blue300' flex={1}>
      <Button isDisabled={!count} onPress={onPressDec} flex={1}>
        <ButtonText>-</ButtonText>
      </Button>
      <Button isDisabled={count >= unit.limit} onPress={onPressInc} flex={1}>
        <ButtonText>+</ButtonText>
      </Button>
      <Box alignItems='center' flex={1} justifyContent='center'>
        <Text fontWeight='$black'>{count}</Text>
      </Box>
    </ButtonGroup>
  </Box>
)

export default UnitListItem
