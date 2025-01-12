import { type GameArmy } from 'appdeptus/models'
import React, { type ComponentProps, memo } from 'react'
import { FlatList } from 'react-native'
import { Pressable, VStack } from '../ui'
import UnitListItem from '../UnitListItem'

type GameArmyRosterProps = {
  roster: GameArmy['roster']

  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
  onPressItem?: (roster: GameArmy['roster'][number]) => void
}

const GameArmyRoster = ({
  roster,

  ListHeaderComponent,
  onPressItem
}: GameArmyRosterProps) => (
  <>
    <FlatList
      data={roster}
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
          onPress={() => {
            onPressItem?.(item)
          }}
        >
          <UnitListItem item={item} />
        </Pressable>
      )}
    />
  </>
)

export default memo(GameArmyRoster)
