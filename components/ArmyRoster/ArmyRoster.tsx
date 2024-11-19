import { type Army } from 'appdeptus/models'
import React, { type ComponentProps, memo } from 'react'
import { FlatList } from 'react-native'
import { VStack } from '../ui'
import UnitListItem from '../UnitListItem'

type UnitRosterProps = {
  units: Army['units']
  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
}

const UnitRoster = ({ units, ListHeaderComponent }: UnitRosterProps) => (
  <FlatList
    data={units}
    showsVerticalScrollIndicator={false}
    ItemSeparatorComponent={() => <VStack className='h-4' />}
    keyExtractor={(unit) => {
      if (unit.type !== 'team') {
        return unit.selectionId
      }
      return unit.id
    }}
    ListFooterComponent={() => <VStack className='h-4' />}
    ListHeaderComponent={ListHeaderComponent}
    renderItem={({ item, index }) => (
      <UnitListItem
        unitOrTeam={item}
        warlord={index === 0}
      />
    )}
  />
)

export default memo(UnitRoster)
