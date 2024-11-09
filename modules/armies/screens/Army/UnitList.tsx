import { UnitListItem, VStack } from 'appdeptus/components'
import { type Team, type Unit, type Warlord } from 'appdeptus/models'
import React, { memo } from 'react'
import { FlatList } from 'react-native'

type UnitListProps = {
  units: (Unit | Team)[]
  warlord: Warlord
}

const UnitList = ({ units, warlord }: UnitListProps) => (
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
    ListHeaderComponent={() => (
      <>
        <UnitListItem
          unitOrTeam={warlord}
          warlord
        />
        <VStack className='h-4' />
      </>
    )}
    renderItem={({ item }) => <UnitListItem unitOrTeam={item} />}
  />
)

export default memo(UnitList)
