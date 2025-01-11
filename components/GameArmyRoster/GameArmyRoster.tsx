import { type GameArmy } from 'appdeptus/models'
import React, { type ComponentProps, memo } from 'react'
import { FlatList } from 'react-native'
import { VStack } from '../ui'
import UnitListItem from '../UnitListItem'

type GameArmyRosterProps = {
  roster: GameArmy['roster']
  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
}

const GameArmyRoster = ({
  roster: units,
  ListHeaderComponent
}: GameArmyRosterProps) => (
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
    renderItem={({ item }) => <UnitListItem item={item} />}
  />
)

export default memo(GameArmyRoster)
