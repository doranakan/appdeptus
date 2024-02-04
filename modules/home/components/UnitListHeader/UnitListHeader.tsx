import { Box, Text } from '@gluestack-ui/themed'
import { Button } from 'appdeptus/components'
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
      backgroundColor='$backgroundLight0'
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
      <Button
        flex={1}
        iconName='clipboard-list'
        isDisabled={!armyList.length}
        onPress={createArmyList}
        text='Create list'
      />
    </Box>
  )
}

export default UnitListHeader
