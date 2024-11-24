import { type Army } from 'appdeptus/models'
import React, { memo } from 'react'
import { FlatList } from 'react-native'
import { VStack } from '../ui'
import UnitListItem from '../UnitListItem'

type UnitRosterProps = {
  roster: Army['roster']
  ListHeaderComponent?: () => JSX.Element
}

const UnitRoster = ({
  roster: units,
  ListHeaderComponent
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
    ListHeaderComponent={
      ListHeaderComponent
        ? () => (
            <VStack space='md'>
              <ListHeaderComponent />
              <VStack />
            </VStack>
          )
        : null
    }
    renderItem={({ item }) => <UnitListItem item={item} />}
  />
)

export default memo(UnitRoster)
