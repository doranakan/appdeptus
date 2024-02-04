import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CheckIcon,
  Text
} from '@gluestack-ui/themed'
import { Unit } from 'appdeptus/models'
import React, { useCallback, useMemo } from 'react'

type UnitListHeaderProps = { armyList: Unit['tiers']; codexId: string }

const UnitListHeader = ({ armyList, codexId }: UnitListHeaderProps) => {
  const totalPoints = useMemo(() => {
    let total = 0
    armyList.forEach(({ points }) => (total += points))

    return total
  }, [armyList])

  const createArmyList = useCallback(() => {
    const list = {
      codexId,
      totalPoints,
      entries: armyList
    }
    console.log(list)
  }, [armyList])

  return (
    <Box
      backgroundColor='$white'
      borderBottomColor='$light200'
      borderBottomWidth='$1'
      flexDirection='row'
      p='$4'
    >
      <Box justifyContent='center' flex={2}>
        <Text fontSize='$3xl'>
          <Text fontWeight='$black'>{totalPoints}</Text>
          <Text> total points</Text>
        </Text>
      </Box>
      <Button onPress={createArmyList}>
        <ButtonText>Create list </ButtonText>
        <ButtonIcon as={CheckIcon} />
      </Button>
    </Box>
  )
}

export default UnitListHeader
