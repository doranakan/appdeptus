import { Box } from '@gluestack-ui/themed'
import { type Army } from 'appdeptus/models'
import { MotiView } from 'moti'
import { memo } from 'react'
import { StyleSheet, type FlatListProps } from 'react-native'
import Animated from 'react-native-reanimated'
import Item from './Item'

type UnitListProps = {
  army: Army

  ListHeaderComponent?: FlatListProps<Army>['ListHeaderComponent']
  onScroll?: FlatListProps<Army>['onScroll']
}

const UnitList = ({ army, ListHeaderComponent, onScroll }: UnitListProps) => {
  return (
    <Animated.FlatList
      data={army.units}
      ItemSeparatorComponent={() => <Box h='$4' />}
      keyExtractor={({ id }, index) => `${id}-${index}`}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={() => <Box height='$8' />}
      onScroll={onScroll}
      renderItem={({ item: unit, index }) => (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 200 + 150 * index,
            duration: 400
          }}
        >
          <Item unit={unit} />
        </MotiView>
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

export default memo(UnitList)
