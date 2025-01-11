import { type GameArmy } from 'appdeptus/models'
import React, { type ComponentProps, memo } from 'react'
import { FlatList } from 'react-native'
import Text from '../Text'
import { VStack } from '../ui'

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
    renderItem={({ item }) => <GameUnitListItem item={item} />}
  />
)

type GameUnitListItemProps = {
  item: GameArmy['roster'][number]
}

const GameUnitListItem = ({ item }: GameUnitListItemProps) => {
  return <Text>{item.id}</Text>
}

export default memo(GameArmyRoster)
