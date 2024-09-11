import { Box } from '@gluestack-ui/themed'
import { type Army } from 'appdeptus/models'
import { memo } from 'react'
import { FlatList, StyleSheet, type FlatListProps } from 'react-native'
import Item from './Item'

type UnitListProps = {
  army: Army

  ListHeaderComponent?: FlatListProps<Army>['ListHeaderComponent']
  onScroll?: FlatListProps<Army>['onScroll']
}

const UnitList = ({ army, ListHeaderComponent, onScroll }: UnitListProps) => {
  return (
    <FlatList
      data={army.units}
      ItemSeparatorComponent={() => <Box h='$4' />}
      keyExtractor={({ id }, index) => `${id}-${index}`}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={() => <Box height='$8' />}
      onScroll={onScroll}
      renderItem={({ item: unit }) => <Item unit={unit} />}
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

export default memo(UnitList)
