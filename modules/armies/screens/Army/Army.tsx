import { Box } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { setColorMode } from 'appdeptus/designSystem'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { useGetArmyQuery } from '../../api'
import ArmyHeader from './ArmyHeader'
import ArmyItem from './ArmyItem'

const ArmyScreen = () => {
  const dispatch = useDispatch()

  const { armyId } = useLocalSearchParams<{ armyId: string }>()

  const { data: army } = useGetArmyQuery(armyId ?? skipToken)

  useEffect(() => {
    if (army) {
      dispatch(setColorMode(army.codex.name))
    }
  })

  if (!army) {
    return <Loading />
  }

  return (
    <FlatList
      data={army.units}
      ItemSeparatorComponent={() => <Box h='$4' />}
      keyExtractor={({ id }, index) => `${id}-${index}`}
      ListHeaderComponent={() => <ArmyHeader army={army} />}
      ListFooterComponent={() => <Box height='$8' />}
      renderItem={({ item: unit }) => (
        <ArmyItem
          armyId={army.id}
          unit={unit}
        />
      )}
      style={styles.flatList}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    padding: 16
  }
})

export default ArmyScreen
