import { Box } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, StyleSheet } from 'react-native'
import { useGetArmyQuery } from '../../api'
import { ArmyHeader, ArmyItem } from '../../components'

const ArmyScreen = () => {
  const { armyId } = useLocalSearchParams<{ armyId: string }>()

  const { data: army } = useGetArmyQuery(armyId ?? skipToken)

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
      renderItem={({ item: unit }) => <ArmyItem unit={unit} />}
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
