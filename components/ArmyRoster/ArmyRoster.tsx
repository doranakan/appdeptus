import { type Army } from 'appdeptus/models'
import React, { type ComponentProps, memo } from 'react'
import { FlatList } from 'react-native'
import { Pressable, VStack } from '../ui'
import UnitListItem from '../UnitListItem'

type UnitRosterProps = {
  roster: Army['roster']

  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
  onPressItem?: (item: Army['roster'][0]) => void
}

const UnitRoster = ({
  roster: units,
  ListHeaderComponent,
  onPressItem
}: UnitRosterProps) => (
  <FlatList
    data={units}
    showsVerticalScrollIndicator={false}
    ItemSeparatorComponent={() => <VStack className='h-4' />}
    keyExtractor={(unit) => {
      switch (unit.type) {
        case 'embarked':
        case 'team':
          return unit.id
        default:
          return unit.selectionId
      }
    }}
    ListFooterComponent={() => <VStack className='h-4' />}
    ListHeaderComponent={ListHeaderComponent}
    renderItem={({ item }) => (
      <Pressable
        disabled={!onPressItem}
        onPress={() => onPressItem?.(item)}
      >
        <UnitListItem item={item} />
      </Pressable>
    )}
  />
)

export default memo(UnitRoster)
